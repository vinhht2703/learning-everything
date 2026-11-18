// Runs learner Python with Pyodide (CPython compiled to WebAssembly), loaded from the jsDelivr CDN on first use.
const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.29.5/full/';
type Pyodide = {
  setStdout(o: { batched: (s: string) => void }): void;
  setStderr(o: { batched: (s: string) => void }): void;
  runPythonAsync(code: string, opts?: { globals?: unknown }): Promise<unknown>;
  globals: { get(name: string): (() => { set(k: string, v: unknown): void; destroy(): void }) };
};
let ready: Promise<Pyodide> | null = null;
const load = () => {
  ready ??= (async () => {
    const mod = await import(/* @vite-ignore */ `${PYODIDE}pyodide.mjs`);
    return (await mod.loadPyodide({ indexURL: PYODIDE })) as Pyodide;
  })();
  return ready;
};

/** Keep only the part of the traceback that points at the learner's code. */
function cleanTraceback(message: string) {
  const lines = message.split('\n');
  const first = lines.findIndex((l) => l.includes('File "<exec>"'));
  return first > 0 ? ['Traceback (most recent call last):', ...lines.slice(first)].join('\n').trimEnd() : message.trimEnd();
}

self.onmessage = async (event: MessageEvent<{ type: 'load' } | { type: 'run'; code: string }>) => {
  if (event.data.type === 'load') {
    try { await load(); self.postMessage({ type: 'loaded' }); } catch (e) { self.postMessage({ type: 'load-error', error: String(e) }); }
    return;
  }
  let py: Pyodide;
  try { py = await load(); } catch (e) { self.postMessage({ type: 'result', ok: false, output: '', error: `Could not load Python: ${e}`, ms: 0 }); return; }
  const out: string[] = [];
  py.setStdout({ batched: (s) => out.push(s) });
  py.setStderr({ batched: (s) => out.push(s) });
  const globals = py.globals.get('dict')();
  globals.set('__name__', '__main__');
  const start = performance.now();
  try {
    await py.runPythonAsync(event.data.code, { globals });
    self.postMessage({ type: 'result', ok: true, output: out.join('\n'), ms: performance.now() - start });
  } catch (err) {
    self.postMessage({ type: 'result', ok: false, output: out.join('\n'), error: cleanTraceback(String((err as Error)?.message ?? err)), ms: performance.now() - start });
  } finally {
    globals.destroy();
  }
};
