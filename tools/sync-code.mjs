#!/usr/bin/env node
// Keep code-playground examples honest.
//
//   node tools/sync-code.mjs            run every example and write source + real output into the lesson files
//   node tools/sync-code.mjs --check    run every example and report lessons whose stored source/output is out of date
//   node tools/sync-code.mjs dsa        limit to one course (or course/lesson, e.g. dsa/heapify)
//
// Source of truth: tools/code/<course>/<lesson-id>.{py,js,cpp}
// Python runs with `python3 -I`, JavaScript with `node`, C++ is compiled with
// `clang++ -std=c++17 -Wall -Wextra` (warnings fail the run) and executed.
// Updates `code.source` / `code.output` (Python) and `code.variants` (JavaScript, C++) in
// src/content/lessons/{en,vi}/<course>/*.md, keeping each file's `file` names and descriptions.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CODE = path.join(ROOT, 'tools/code');
const LESSONS = path.join(ROOT, 'src/content/lessons');
const BIN = fs.mkdtempSync(path.join(os.tmpdir(), 'le-code-'));
const LANGS = [
  { lang: 'python', ext: 'py' },
  { lang: 'javascript', ext: 'js' },
  { lang: 'cpp', ext: 'cpp' },
];

const args = process.argv.slice(2);
const check = args.includes('--check');
const filter = args.find((a) => !a.startsWith('--'));

function run(file, ext, label) {
  if (ext === 'py') return execFileSync('python3', ['-I', file], { timeout: 20000 }).toString();
  if (ext === 'js') return execFileSync('node', [file], { timeout: 20000 }).toString();
  const exe = path.join(BIN, label.replace(/\W/g, '_'));
  const c = spawnSync('clang++', ['-std=c++17', '-Wall', '-Wextra', '-O1', file, '-o', exe]);
  if (c.status !== 0 || c.stderr.length) throw new Error(`clang++ ${c.status !== 0 ? 'failed' : 'warned'}:\n${c.stderr}`);
  return execFileSync(exe, { timeout: 20000 }).toString();
}

function splitFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('no frontmatter');
  return { fm: YAML.parse(m[1]), body: m[2] };
}

let failures = 0, updated = 0, stale = 0, checked = 0;
for (const course of fs.readdirSync(CODE)) {
  if (filter && !filter.startsWith(course)) continue;
  const ids = [...new Set(fs.readdirSync(path.join(CODE, course)).map((f) => f.replace(/\.[^.]+$/, '')))];
  for (const id of ids) {
    if (filter?.includes('/') && filter !== `${course}/${id}`) continue;
    // 1. run every language that exists for this lesson
    const results = {};
    for (const { lang, ext } of LANGS) {
      const file = path.join(CODE, course, `${id}.${ext}`);
      if (!fs.existsSync(file)) continue;
      try {
        results[lang] = { source: fs.readFileSync(file, 'utf8').trimEnd(), output: run(file, ext, `${course}-${id}`).trimEnd() };
      } catch (e) {
        failures++;
        console.error(`FAIL ${course}/${id}.${ext}\n${String(e.message).slice(0, 800)}`);
      }
    }
    if (!results.python) { if (!failures) console.error(`SKIP ${course}/${id}: no runnable .py`); continue; }
    checked++;
    // 2. write into every language version of the lesson
    for (const ui of fs.readdirSync(LESSONS)) {
      const dir = path.join(LESSONS, ui, course);
      if (!fs.existsSync(dir)) continue;
      const mdFile = fs.readdirSync(dir).find((f) => f.replace(/^\d+-/, '').replace(/\.md$/, '') === id);
      if (!mdFile) { console.error(`MISSING lesson file for ${ui}/${course}/${id}`); failures++; continue; }
      const full = path.join(dir, mdFile);
      const text = fs.readFileSync(full, 'utf8');
      const { fm, body } = splitFrontmatter(text);
      const code = fm.code ?? {};
      const stem = (code.file ?? `${id}.py`).replace(/\.py$/, '');
      const oldVariants = Object.fromEntries((code.variants ?? []).map((v) => [v.lang, v]));
      const next = {
        file: code.file ?? `${id}.py`,
        lang: 'python',
        source: results.python.source,
        output: results.python.output,
        ...(code.description ? { description: code.description } : {}),
        variants: LANGS.filter(({ lang }) => lang !== 'python' && results[lang]).map(({ lang, ext }) => ({
          lang,
          file: oldVariants[lang]?.file ?? `${stem}.${ext}`,
          source: results[lang].source,
          output: results[lang].output,
        })),
      };
      if (JSON.stringify(next) === JSON.stringify({ ...code, lang: 'python', variants: code.variants ?? [] })) continue;
      if (check) { stale++; console.log(`STALE ${ui}/${course}/${mdFile}`); continue; }
      fm.code = next;
      fs.writeFileSync(full, `---\n${YAML.stringify(fm, { lineWidth: 0 })}---\n${body.startsWith('\n') || !body ? body : `\n${body}`}`);
      updated++;
    }
  }
}
fs.rmSync(BIN, { recursive: true, force: true });
console.log(`${checked} examples ran · ${check ? `${stale} stale lesson files` : `${updated} lesson files updated`} · ${failures} failures`);
process.exit(failures || (check && stale) ? 1 : 0);
