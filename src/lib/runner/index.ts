// Page-side API for running code. Each run gets a time limit; a stuck worker is terminated and replaced.
export type RunResult = { ok: boolean; output: string; error?: string; ms: number; timedOut?: boolean };

const TIME_LIMIT_MS = 5000;
const PY_FIRST_LOAD_LIMIT_MS = 90000;

let jsWorker: Worker | null = null;
let pyWorker: Worker | null = null;
let pyLoaded = false;
let cancelCurrent: (() => void) | null = null;

const newJsWorker = () => new Worker(new URL('./js.worker.ts', import.meta.url), { type: 'module' });
const newPyWorker = () => new Worker(new URL('./py.worker.ts', import.meta.url), { type: 'module' });

function runIn(worker: Worker, message: unknown, limit: number, onKill: () => void): Promise<RunResult> {
  return new Promise((resolve) => {
    const finish = (r: RunResult) => { clearTimeout(timer); worker.removeEventListener('message', onMessage); cancelCurrent = null; resolve(r); };
    const onMessage = (e: MessageEvent) => { if (e.data.type === 'loaded' || e.data.type === 'load-error') return; finish(e.data); };
    const timer = window.setTimeout(() => { worker.terminate(); onKill(); finish({ ok: false, output: '', ms: limit, timedOut: true }); }, limit);
    cancelCurrent = () => { worker.terminate(); onKill(); finish({ ok: false, output: '', ms: 0, error: 'Stopped.' }); };
    worker.addEventListener('message', onMessage);
    worker.postMessage(message);
  });
}

export function runJavaScript(code: string) {
  jsWorker ??= newJsWorker();
  return runIn(jsWorker, { code }, TIME_LIMIT_MS, () => { jsWorker = null; });
}

/** `onLoading` is called when the Python runtime still has to be downloaded. */
export function runPython(code: string, onLoading?: () => void) {
  if (!pyWorker) { pyWorker = newPyWorker(); pyLoaded = false; }
  if (!pyLoaded) onLoading?.();
  const limit = pyLoaded ? TIME_LIMIT_MS : PY_FIRST_LOAD_LIMIT_MS;
  return runIn(pyWorker, { type: 'run', code }, limit, () => { pyWorker = null; pyLoaded = false; }).then((r) => {
    if (!r.timedOut && !(r.error ?? '').startsWith('Could not load Python')) pyLoaded = true;
    return r;
  });
}

export const stopRunning = () => cancelCurrent?.();
export const isPythonLoaded = () => pyLoaded;
export const timeLimitSeconds = TIME_LIMIT_MS / 1000;
