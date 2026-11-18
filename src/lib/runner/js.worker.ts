// Runs learner JavaScript off the main thread. console.* is captured; the page can terminate this worker on timeout.
import { inspect } from './inspect';

self.onmessage = async (event: MessageEvent<{ code: string }>) => {
  const lines: string[] = [];
  const format = (args: unknown[]) => args.map((a) => inspect(a)).join(' ');
  const capture = (...args: unknown[]) => lines.push(format(args));
  const fakeConsole = { log: capture, info: capture, debug: capture, warn: capture, error: capture, table: capture };
  const start = performance.now();
  try {
    // eslint-disable-next-line no-new-func
    const run = new Function('console', `"use strict";\n${event.data.code}`);
    await run(fakeConsole);
    self.postMessage({ ok: true, output: lines.join('\n'), ms: performance.now() - start });
  } catch (err) {
    const e = err as Error;
    self.postMessage({ ok: false, output: lines.join('\n'), error: `${e?.name ?? 'Error'}: ${e?.message ?? String(err)}`, ms: performance.now() - start });
  }
};
