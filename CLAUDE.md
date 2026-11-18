# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project vision

**Learning Everything** is a personal, interactive learning website. One app hosts many "learning paths", and a path can be about *any* subject: tech, math, personal growth, communication, finance, and so on. *"Learning paths can cover any topic."*

Core ideas behind the project:
- **Learn by doing.** Every lesson pairs a short explanation with something hands-on, such as an editable code playground that runs Python and JavaScript in the browser, sliders, simulators, quizzes, checklists or timers.
- **Short, structured lessons.** Each lesson has a title, a description, an "In this lesson" goal, a core concept (often with a formula line), takeaways, an interactive activity, and a code or practice link.
- **Theory → practice → project.** Courses move from foundations to core principles and end with a challenge or mini project.
- **Reflection and review.** "Make it yours" reflection boxes save notes locally. Every course has a printable **Cornell Notes packet** for handwritten review on paper.
- **Bilingual: English (default) and Vietnamese.** All UI and lesson text exists in both. Vietnamese is the user's native language.
- **Polished, product-like UI** with a light/dark theme, responsive layout down to phone width, accessible labels and progress tracking.

## Courses

| Key | Course | Lessons | Template | Interactive pieces |
|---|---|---|---|---|
| `oop` | Object-Oriented Programming (Python) | 8 | `code` | Editable code playground (Python / JavaScript runnable, C++ read-only), key ideas |
| `bigo` | Big O & Algorithms | 11 | `interactive` | Growth chart, 7 complexity cases with code, step simulator, cheat-sheet table, quiz |
| `dsa` | Data Structures & Algorithms | 35 (complete: Getting started, Arrays, Linked lists, Recursion, Sorting, Binary search, Trees, Backtracking, Heaps, Hashing, Graphs, DP, Bits, LRU-cache project) | `visual` | Memory grid, array/list/stack/queue editors, call stack, Fibonacci tree, sort stepper (insertion/merge/quick/bucket), binary search, guess-the-number, tree anatomy, BST search/edit, DFS/BFS players, BST map, tree maze, heap views, hash buckets, graph representations, grid DFS/BFS, graph BFS, DP tables, bit playground, LRU simulator. Each lesson has a complexity table, verified review videos and LeetCode practice links. |
| `linear` | Linear Algebra for AI | 8 | `concept` | Shape picker, vector/matrix/eigen SVG plots, dot-product and neuron sliders, elimination steps |
| `iot` | Internet of Things | 8 | `concept` | System map, sensor chart, network/placement choices, MQTT topic builder, security checklist |
| `fiveam` | The 5 AM Club (Personal growth) | 11 | `concept` | Routine sliders, four-areas check-in, habit tracker, tactic cards, Daily 5, focus timer, recovery/weekly/learning/plan forms. Summarizes Robin Sharma's frameworks and keeps the source links. |

Planned subjects mentioned in the UI include communication, time management and personal finance.

**DSA** follows the topic order of NeetCode's "Algorithms and Data Structures for Beginners"; the content, code and widgets are our own.

## Stack and constraints

- **Astro 5.18.2, purely static** (`output: 'static'`, no adapter, no API routes). `npm run build` writes plain HTML/CSS/JS to `dist/`, which can be hosted on any static host (GitHub Pages, Netlify, Cloudflare Pages). If it's deployed under a subpath, set `base` in `astro.config.mjs`. All links go through `href()`, so they respect it.
- **No backend, no database, no accounts.** All user state lives in `localStorage`.
- **Vanilla TypeScript for interactivity** (CodeMirror is the only UI library, for the code editor), in Astro component `<script>` tags. Don't add a UI framework (React/Svelte/Vue) unless a widget clearly needs one and the user agrees.
- **Node:** the user's machine runs Node 20.10. Astro 6+/7 need Node ≥ 22, so the dependencies are pinned to exact versions that work on Node 20 (`astro@5.18.2`, `@astrojs/check@0.9.4`, `@astrojs/language-server@2.15.4`, `typescript@5.7.3`). Upgrade Astro only after the user upgrades Node.

### Commands
- `npm run dev`: dev server at http://localhost:4321 (`/` redirects to `/en/` or `/vi/`)
- `npm run build`: static build to `dist/`
- `npm run preview`: serve the build
- `npm run check`: type-check `.astro` and `.ts` files (keep this at 0 errors)

## Structure

```
astro.config.mjs              static output; i18n locales en/vi with prefixed routes
src/
  content.config.ts           Zod schemas for the `courses` and `lessons` collections
  content/
    courses/<key>.yaml        course metadata; every user-visible field is { en, vi }
    lessons/<lang>/<course>/<NN>-<id>.md
                              one file per lesson per language: frontmatter = structured fields, body = concept text
  i18n/
    en.json, vi.json          flat UI string dictionaries keyed by id (e.g. "lesson.complete", "w.dot.score")
    utils.ts                  t(lang, key, vars), strings(lang, prefix), loc(lang, {en,vi}), href(...), langs
  lib/
    content.ts                getCourses(), getLessons(lang, course) (falls back to English per lesson)
    storage.ts                safe localStorage helpers (prefix "le:"), progress helpers
    dom.ts                    $, $$, fmt, escapeHtml, eachWidget(name, init), toast
    plot.ts, iot.ts, tree.ts  shared helpers for widgets (tree.ts: build/insert/remove/traverse/render binary trees)
  layouts/BaseLayout.astro    <head>, early theme script, topbar (language, theme, search), toast, app script
  components/                 CourseShell (banner + sidebar), LessonTopline, LearningGoal, CodeWorkbench, Reflection, LessonNav,
                              ComplexityTable, StudyResources (videos + practice; rendered by every template when present)
  templates/                  CodeLesson / ConceptLesson / InteractiveLesson / VisualLesson, chosen by the course's `template`
                              (VisualLesson: concept → visualizer → code playground → complexity → videos + practice → reflection)
  widgets/
    index.ts                  registry: frontmatter `widget:` / `figure:` name → component
    Range.astro, types.ts     shared slider + WidgetProps
    linear/ iot/ fiveam/ bigo/ dsa/   one component per interactive activity (markup + <script>); dsa widgets use the .ds-* classes in site.css
  scripts/app.ts              site-wide behavior: theme, language switch, mobile menu, search, progress, bookmarks, reflections, print (the code playground lives in scripts/playground.ts)
  styles/legacy.css           original design (ported from the old styles.css; dark theme = html[data-theme="dark"] body …)
  styles/site.css             additions: link-buttons, catalog, overview, search, Shiki blocks, dark-mode gaps
  pages/
    index.astro               redirect to saved/browser language
    404.astro
    [lang]/index.astro        course catalog
    [lang]/search.json.ts     static search index (fetched by the header search)
    [lang]/[course]/index.astro       course outline
    [lang]/[course]/[lesson].astro    lesson page
    [lang]/[course]/notes.astro       printable Cornell Notes packet
public/favicon.svg
```

### Lesson frontmatter

```yaml
id: dot                 # stable slug: URL segment and localStorage key; same in en and vi
order: 3
section: FOUNDATIONS    # sidebar group heading
title: Dot product & weights
navTitle: …             # optional shorter sidebar title
summary: Combine signals into a score      # sidebar subtitle
duration: 6 min         # optional
description: …
goal: …                 # "In this lesson"
eyebrow: THE BIG IDEA   # small label above the concept / widget title
conceptTitle: …
formula: "w · x = …"    # optional
takeaways: [{ label, text }]
figure: iot-architecture                     # optional static figure (widgets/index.ts → figures)
widget: dot                                  # interactive component (widgets/index.ts → widgets)
widgetTitle: …
widgetDescription: …
widgetData: …                                # free-form data for the widget (quiz questions, tactics, rules…)
code: { file, lang, source, output, description,     # optional; output is precomputed, nothing executes
        variants: [{ lang: javascript|cpp, file, source, output }] }   # same example in other languages → editor tabs
reflectionPrompt: …                          # optional "Make it yours" box
complexity: [{ op, time, space }]           # optional Big O table
videos: [{ title, channel, url, note? }]     # optional "Watch & review" (YouTube thumbnails shown automatically)
practice: [{ title, url, difficulty: easy|medium|hard, platform? }]   # optional practice problems
cornellCues / cornellNotes / cornellApply    # optional overrides for the Cornell packet
```
Body markdown is the concept text. It's also used as "Core idea" in the Cornell packet.

## Conventions

- **A new course is mostly content.** Add `content/courses/<key>.yaml` (pick a `template` and `variant`), plus lesson `.md` files under `lessons/en/<key>/` and `lessons/vi/<key>/`. Add any new widget components and register them in `widgets/index.ts`. Pages, sidebar, progress, search and the Cornell packet are generated. Never add per-course `if` chains.
- **New widget:** create `src/widgets/<course>/<Name>.astro`. The root element gets `data-widget="<unique-name>"` and, if its script needs text, `data-strings={JSON.stringify(strings(lang, 'w.<name>.'))}`. The script uses `eachWidget('<unique-name>', (root, s) => …)`. Use `data-*` hooks inside the root, not global ids. Register it in `widgets/index.ts`.
- **i18n by key, never by English text.** Every UI string goes in **both** `src/i18n/en.json` and `src/i18n/vi.json`. Placeholders use `{name}` (filled by `t()` or `fmt()`). Lesson text lives in the per-language `.md` files. When adding or editing a lesson, update the `vi` file too. A missing `vi` file falls back to English.
- **What stays English in Vietnamese files:** code, real program output, and pure math formulas. Descriptive outputs and word-based formulas are translated.
- **localStorage keys** (always via `lib/storage.ts`, prefix `le:`): `theme`, `lang`, `progress:<course>` (array of lesson ids), `note:<course>:<lesson>` (reflection), `code:<course>/<lesson>:<lang>` (edited playground code), `courseOrder` (learner's course order, applied to the catalog and sidebar by `scripts/course-order.ts`; the default order is `order` in each course YAML), `bookmarks` (array of "course/lesson"; shown as ★ in the sidebar and in "Your bookmarks" on the catalog), `codeLang` (playground language), `sidebar:paths` (course switcher open/closed), `widget:<course>:<name>` (widget state).
- **Language switcher:** a custom dropdown in `BaseLayout` (globe button + menu). Each option is a real link to the same page in the other language (`href(code, path)`), so it works without JavaScript; `app.ts` adds open/close, arrow keys, Escape and outside-click. Adding a language = add it to `languages` in `i18n/utils.ts`, the astro i18n `locales`, a `<lang>.json` dictionary and lesson files.
- **Theme:** `data-theme="light|dark"` on `<html>`, set before first paint by the inline script in `BaseLayout` (saved choice, otherwise the OS `prefers-color-scheme`, followed live until the learner picks). The header control is a sun/moon `role="switch"`. New dark styles go in `site.css` as `html[data-theme="dark"] body …`.
- **External links must be verified, never guessed.** Before adding a YouTube video, check it exists and get its real title and channel from `https://www.youtube.com/oembed?url=<url-encoded watch URL>&format=json`. Check LeetCode problems with a POST to `https://leetcode.com/graphql` (`question(titleSlug)`); only free (non-premium) problems. Video and problem titles stay in their original language in both `en` and `vi` files.
- **Playground code lives in `tools/code/<course>/<lesson-id>.{py,js,cpp}`.** Edit those files, then run `npm run sync-code` (runs every example and writes source + real output into both `en` and `vi` lesson files). `npm run check-code` verifies nothing is stale. Never hand-edit `code.source` / `code.output` in lesson files.
- **Code outputs must come from actually running the code**, never from memory: `python3 -I x.py`, `node x.js`, `clang++ -std=c++17 -Wall -Wextra x.cpp && ./a.out` (must compile without warnings).
- **Code playground languages:** lessons using the `code`, `interactive` (Big O cases) or `visual` templates show Python + JavaScript + C++ tabs via `code.variants`. Keep all three versions equivalent (same data, same algorithm); output formatting may differ by language. The selected language is remembered (`codeLang`) and applies to every playground. Linear Algebra and IoT code cards stay Python-only (NumPy / device APIs).
- **Code playground runs real code in the browser** (`components/CodeWorkbench.astro` + `scripts/playground.ts`): CodeMirror 6 editor (lazy-loaded when the playground scrolls into view; one grammar chunk per language), **JavaScript** runs in a Web Worker (`lib/runner/js.worker.ts`, console captured with a Node-style `inspect`), **Python** runs in **Pyodide 0.29.5** loaded from cdn.jsdelivr.net inside a worker (`lib/runner/py.worker.ts`; ~10 MB on first run, then cached). Each run has a 5 s limit (the worker is terminated and recreated). **C++ is read-only**: Run shows the recorded clang++ output. After a run the output is compared (whitespace-insensitive) with `code.output` / the variant's `output` and a match/differs badge is shown, so **the stored outputs must stay exactly what the code prints**. Learner edits are saved per lesson and language (`code:<course>/<lesson>:<lang>`); Reset restores the original. Pyodide is the one external runtime dependency; keep its version pinned in `py.worker.ts`.
- **Code blocks** use Astro's `<Code>` (Shiki, `github-dark`; `github-light` in the Cornell print view).
- **Accessibility:** real links for navigation, `aria-live` on dynamic readouts, labeled controls, `aria-pressed`/`aria-expanded` on toggles.
- **Responsive:** keep the legacy breakpoints (1100/1000/900/760/650/600/560/520px), with no horizontal scroll at 375px. Headless Chrome can't go below a 500px window, so test phone width with a 375px iframe.
- Keep `legacy.css` as the design source; put changes and additions in `site.css` rather than rewriting the minified legacy file.

## Migration status (2026-11-18)

- All five courses were migrated from the old vanilla site (root `index.html`, `script.js`, `styles.css`) with their content, widgets and Cornell packets. Missing Vietnamese was filled in, so `vi` now covers all lessons and UI strings.
- Bugs fixed during the migration: the matrix-composition widget showed the wrong result for "A, then B"; the IoT flow lesson rendered an empty chart; the habit tracker referenced a missing element; the Big O breadcrumb and IoT output had no styles; several components had no dark-mode styles.
- The legacy root files (`index.html`, `script.js`, `styles.css`) were removed on 2026-11-18 at the user's request. The Astro site in `src/` is now the only source.

## Working preferences

- Static site only. Don't propose a backend, database or server rendering.
- Content should be accurate, practical and beginner-friendly. Use Python for code examples. Cite sources for book- or framework-based content.
- Run `npm run check` and `npm run build` after changes. For UI changes, check the built pages in both languages and both themes.
