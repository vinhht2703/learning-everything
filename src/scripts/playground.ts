// Code playground behaviour: language tabs, editable CodeMirror editors (loaded when visible),
// running Python (Pyodide) and JavaScript (Web Worker) in the browser, comparing with the expected output,
// saving edits per lesson, reset and copy.
import { copyText, fmt, toast } from '../lib/dom';
import { onSynced, read, remove, write } from '../lib/storage';
import { runJavaScript, runPython, stopRunning, timeLimitSeconds, type RunResult } from '../lib/runner';

type Editor = { get(): string; set(doc: string): void; focus(): void };
type Bench = {
  root: HTMLElement;
  s: Record<string, string>;
  editors: Map<string, Editor>;
  mounting: Promise<void> | null;
  active: string;
  running: boolean;
};

const benches: Bench[] = [];
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
const storageKey = (b: Bench, codeLang: string) => (b.root.dataset.storageKey ? `code:${b.root.dataset.storageKey}:${codeLang}` : '');
const panel = (b: Bench, codeLang = b.active) => b.root.querySelector<HTMLElement>(`[data-code-panel="${codeLang}"]`)!;
const original = (b: Bench, codeLang = b.active) => panel(b, codeLang).dataset.source!;
const saved = (b: Bench, codeLang: string) => { const key = storageKey(b, codeLang); return key ? read(key) : null; };
const currentCode = (b: Bench, codeLang = b.active) => b.editors.get(codeLang)?.get() ?? saved(b, codeLang) ?? original(b, codeLang);
const $ = <T extends HTMLElement = HTMLElement>(b: Bench, sel: string) => b.root.querySelector<T>(sel)!;

function markEdited(b: Bench, codeLang: string) {
  const edited = currentCode(b, codeLang) !== original(b, codeLang);
  b.root.querySelector(`[data-code-tab="${codeLang}"]`)?.classList.toggle('edited', edited);
}

/** Replace the static highlighted code with CodeMirror editors (lazy: the editor bundle loads on demand). */
function mountEditors(b: Bench) {
  b.mounting ??= import('../lib/editor').then(async ({ mountEditor }) => {
    for (const p of b.root.querySelectorAll<HTMLElement>('[data-code-panel]')) {
      const codeLang = p.dataset.codePanel!;
      const runnable = p.dataset.runnable === 'true';
      const editor = await mountEditor(p.querySelector<HTMLElement>('[data-editor-host]')!, {
        doc: saved(b, codeLang) ?? p.dataset.source!,
        lang: codeLang,
        readOnly: !runnable,
        label: fmt(b.s.editorLabel, { file: p.dataset.file! }),
        onChange: (doc) => {
          const key = storageKey(b, codeLang);
          if (key) { if (doc === p.dataset.source) remove(key); else write(key, doc); }
          markEdited(b, codeLang);
        },
        onRun: () => run(b),
      });
      b.editors.set(codeLang, editor);
      p.classList.add('cm-mounted');
    }
  });
  return b.mounting;
}

function setStatus(b: Bench, text: string, state: 'idle' | 'busy' | 'ok' | 'error') {
  $(b, '[data-status]').textContent = text;
  const icon = $(b, '[data-status-icon]');
  icon.textContent = state === 'busy' ? '…' : state === 'error' ? '!' : '✓';
  icon.dataset.state = state;
}

function showExpected(b: Bench) {
  const p = panel(b);
  $(b, '[data-output-view]').textContent = p.dataset.output!;
  $(b, '[data-output-view]').classList.remove('has-error');
  $<HTMLDetailsElement>(b, '[data-expected]').hidden = true;
  $(b, '[data-compare]').hidden = true;
  setStatus(b, b.s.expectedStatus, 'idle');
}

function selectLang(b: Bench, codeLang: string) {
  if (!b.root.querySelector(`[data-code-panel="${codeLang}"]`) || b.running) return false;
  b.active = codeLang;
  b.root.querySelectorAll<HTMLElement>('[data-code-panel]').forEach((p) => (p.hidden = p.dataset.codePanel !== codeLang));
  b.root.querySelectorAll<HTMLElement>('[data-code-tab]').forEach((tab) => {
    const on = tab.dataset.codeTab === codeLang;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', String(on));
  });
  const p = panel(b);
  $(b, '[data-runtime]').textContent = p.dataset.runtimeLabel!;
  $(b, '[data-console-runtime]').textContent = p.dataset.runtimeLabel!;
  b.root.classList.toggle('read-only', p.dataset.runnable !== 'true');
  showExpected(b);
  return true;
}

async function run(b: Bench) {
  if (b.running) { stopRunning(); return; }
  const p = panel(b);
  const out = $(b, '[data-output-view]');
  const compare = $(b, '[data-compare]');
  const expected = p.dataset.output!;
  if (p.dataset.runnable !== 'true') {
    // C++: no compiler in the browser; show the output recorded from a real run.
    showExpected(b);
    $(b, '[data-run-message]').textContent = b.s.cppNote;
    return;
  }
  b.running = true;
  b.root.classList.add('is-running');
  $(b, '[data-run-label]').textContent = b.s.stop;
  out.textContent = '';
  out.classList.remove('has-error');
  compare.hidden = true;
  setStatus(b, b.s.running, 'busy');
  const code = currentCode(b);
  let result: RunResult;
  try {
    result = b.active === 'python'
      ? await runPython(code, () => setStatus(b, b.s.loadingPython, 'busy'))
      : await runJavaScript(code);
  } catch (e) {
    result = { ok: false, output: '', error: String(e), ms: 0 };
  }
  b.running = false;
  b.root.classList.remove('is-running');
  $(b, '[data-run-label]').textContent = b.s.run;

  const text = result.output || (result.ok ? b.s.noOutput : '');
  out.textContent = result.timedOut ? fmt(b.s.timeout, { s: timeLimitSeconds }) : [text, result.error].filter(Boolean).join(text ? '\n' : '');
  out.classList.toggle('has-error', !result.ok);
  if (result.timedOut) setStatus(b, fmt(b.s.timeout, { s: timeLimitSeconds }), 'error');
  else if (result.error === 'Stopped.') setStatus(b, b.s.stopped, 'error');
  else setStatus(b, result.ok ? fmt(b.s.finished, { ms: Math.max(1, Math.round(result.ms)) }) : b.s.error, result.ok ? 'ok' : 'error');

  // Compare with the expected output (whitespace-insensitive, so line wrapping differences don't matter).
  const matches = result.ok && normalize(result.output) === normalize(expected);
  compare.hidden = false;
  compare.className = `compare-badge ${matches ? 'match' : 'differs'}`;
  compare.textContent = matches ? b.s.match : b.s.differs;
  const details = $<HTMLDetailsElement>(b, '[data-expected]');
  details.hidden = matches;
  $(b, '[data-expected-text]').textContent = expected;
}

function init(root: HTMLElement) {
  const b: Bench = { root, s: JSON.parse(root.dataset.strings || '{}'), editors: new Map(), mounting: null, active: '', running: false };
  benches.push(b);
  b.active = root.querySelector<HTMLElement>('[data-code-panel]')!.dataset.codePanel!;
  selectLang(b, read('codeLang') ?? b.active) || selectLang(b, b.active);
  root.querySelectorAll<HTMLElement>('[data-code-panel]').forEach((p) => markEdited(b, p.dataset.codePanel!));

  // Code edited on another device: update the editor (unless the learner is typing in it) and the edited dot.
  if (root.dataset.storageKey) onSynced(`code:${root.dataset.storageKey}:*`, (changed) => {
    for (const key of changed) {
      const codeLang = key.slice(key.lastIndexOf(':') + 1);
      const p = root.querySelector<HTMLElement>(`[data-code-panel="${codeLang}"]`);
      const editor = b.editors.get(codeLang);
      if (!p) continue;
      if (editor && !p.contains(document.activeElement)) editor.set(saved(b, codeLang) ?? original(b, codeLang));
      markEdited(b, codeLang);
    }
    if (!b.editors.size && [...root.querySelectorAll<HTMLElement>('[data-code-panel]')].some((p) => saved(b, p.dataset.codePanel!) !== null)) void mountEditors(b);
  });

  // Mount editors when the playground is (nearly) visible, immediately if there are saved edits,
  // or as soon as the learner clicks into the static code.
  const hasEdits = [...root.querySelectorAll<HTMLElement>('[data-code-panel]')].some((p) => saved(b, p.dataset.codePanel!) !== null);
  if (hasEdits || !('IntersectionObserver' in window)) mountEditors(b);
  else {
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); mountEditors(b); } }, { rootMargin: '300px' });
    io.observe(root);
  }
  root.querySelectorAll<HTMLElement>('[data-static-code]').forEach((el) => el.addEventListener('click', () => mountEditors(b).then(() => b.editors.get(b.active)?.focus())));

  root.querySelectorAll<HTMLButtonElement>('[data-code-tab]').forEach((tab) => tab.addEventListener('click', () => {
    const codeLang = tab.dataset.codeTab!;
    write('codeLang', codeLang);
    benches.forEach((x) => selectLang(x, codeLang));
  }));
  $(b, '[data-run]').addEventListener('click', () => run(b));
  $(b, '[data-reset-code]').addEventListener('click', async () => {
    if (b.running) return;
    await mountEditors(b);
    const key = storageKey(b, b.active);
    if (key) remove(key);
    b.editors.get(b.active)?.set(original(b));
    markEdited(b, b.active);
    showExpected(b);
    toast(b.s.resetDone);
  });
  const copyBtn = $<HTMLButtonElement>(b, '[data-copy]');
  copyBtn.addEventListener('click', async () => {
    const ok = await copyText(currentCode(b));
    toast(ok ? b.s.copyOk : b.s.copyFail);
    if (!ok) return;
    const label = copyBtn.querySelector<HTMLElement>('[data-copy-label]')!;
    const originalLabel = label.dataset.original ?? label.textContent!;
    label.dataset.original = originalLabel;
    copyBtn.classList.add('copied');
    label.textContent = b.s.copied;
    clearTimeout(Number(copyBtn.dataset.timer));
    copyBtn.dataset.timer = String(window.setTimeout(() => { copyBtn.classList.remove('copied'); label.textContent = originalLabel; }, 1600));
  });
}

document.querySelectorAll<HTMLElement>('[data-code-example]').forEach(init);
