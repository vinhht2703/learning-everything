// CodeMirror 6 editor for the code playground (loaded on demand).
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Prec, type Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';

// Language grammars are split into their own chunks and loaded only when needed.
const languages: Record<string, () => Promise<Extension>> = {
  python: () => import('@codemirror/lang-python').then((m) => m.python()),
  javascript: () => import('@codemirror/lang-javascript').then((m) => m.javascript()),
  cpp: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
};

const playgroundTheme = EditorView.theme({
  '&': { backgroundColor: '#0e1727', fontSize: '11px', height: '100%' },
  '.cm-scroller': { fontFamily: "'DM Mono', monospace", lineHeight: '1.75' },
  '.cm-gutters': { backgroundColor: '#0e1727', color: '#53617a', border: 'none' },
  '.cm-activeLineGutter, .cm-activeLine': { backgroundColor: '#16233a' },
  '.cm-content': { padding: '13px 0' },
  '&.cm-focused': { outline: 'none' },
}, { dark: true });

export async function mountEditor(host: HTMLElement, opts: { doc: string; lang: string; readOnly: boolean; label: string; onChange: (doc: string) => void; onRun: () => void }) {
  const language = (await languages[opts.lang]?.()) ?? [];
  const view = new EditorView({
    parent: host,
    state: EditorState.create({
      doc: opts.doc,
      extensions: [
        basicSetup,
        // Prec.highest: the default keymap binds Mod-Enter to "insert blank line"
        Prec.highest(keymap.of([{ key: 'Mod-Enter', run: () => { opts.onRun(); return true; } }])),
        keymap.of([indentWithTab]),
        EditorState.tabSize.of(opts.lang === 'python' ? 4 : 2),
        language,
        oneDark,
        playgroundTheme,
        EditorState.readOnly.of(opts.readOnly),
        EditorView.editable.of(!opts.readOnly),
        EditorView.contentAttributes.of({ 'aria-label': opts.label }),
        EditorView.updateListener.of((u) => { if (u.docChanged) opts.onChange(u.state.doc.toString()); }),
      ],
    }),
  });
  return {
    get: () => view.state.doc.toString(),
    set: (doc: string) => view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: doc } }),
    focus: () => view.focus(),
  };
}
