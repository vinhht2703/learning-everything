// Site-wide behavior: theme, language, mobile menu, search, progress, reflections, code examples.
import { $, $$, escapeHtml, toast } from '../lib/dom';
import { getProgress, markComplete, read, readJSON, write, writeJSON } from '../lib/storage';
import './course-order';

const root = document.documentElement;

/* ---------- theme ---------- */
// The inline script in BaseLayout sets data-theme before paint (saved choice, else the OS setting).
const themeToggle = document.querySelector<HTMLButtonElement>('#themeToggle');
function applyTheme(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-checked', String(theme === 'dark'));
    themeToggle.title = theme === 'dark' ? themeToggle.dataset.toLight! : themeToggle.dataset.toDark!;
  }
}
applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.classList.add('theme-anim');
  write('theme', next);
  applyTheme(next);
  window.setTimeout(() => root.classList.remove('theme-anim'), 350);
});
// Keep following the OS setting while the learner has not chosen a theme.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!read('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

/* ---------- language menu ---------- */
write('lang', root.lang);
const langMenu = document.querySelector<HTMLElement>('[data-lang-menu]');
if (langMenu) {
  const trigger = langMenu.querySelector<HTMLButtonElement>('.lang-trigger')!;
  const list = langMenu.querySelector<HTMLElement>('.lang-list')!;
  const options = [...list.querySelectorAll<HTMLAnchorElement>('[data-lang-option]')];
  const setOpen = (open: boolean, focusIndex?: number) => {
    list.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    langMenu.classList.toggle('open', open);
    if (open && focusIndex !== undefined) options[focusIndex]?.focus();
  };
  const current = () => Math.max(0, options.findIndex((o) => o.getAttribute('aria-checked') === 'true'));
  trigger.addEventListener('click', () => setOpen(list.hidden, list.hidden ? current() : undefined));
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setOpen(true, current()); }
  });
  list.addEventListener('keydown', (e) => {
    const i = options.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); options[(i + 1) % options.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); options[(i - 1 + options.length) % options.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); options[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); options[options.length - 1].focus(); }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); if (e.key === 'Escape') trigger.focus(); }
  });
  options.forEach((o) => o.addEventListener('click', (e) => {
    write('lang', o.dataset.langOption!);
    if (o.getAttribute('aria-checked') === 'true') { e.preventDefault(); setOpen(false); trigger.focus(); return; }
    o.href = `${o.href.split('#')[0]}${location.hash}`;   // keep the position on the page
  }));
  document.addEventListener('click', (e) => { if (!langMenu.contains(e.target as Node)) setOpen(false); });
}

/* ---------- mobile lesson menu ---------- */
const menuToggle = document.querySelector<HTMLButtonElement>('#menuToggle');
const sidebar = document.querySelector<HTMLElement>('#lessonSidebar');
function toggleMenu(open: boolean) {
  if (!sidebar || !menuToggle) return;
  sidebar.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? menuToggle.dataset.close! : menuToggle.dataset.open!);
}
menuToggle?.addEventListener('click', () => toggleMenu(!sidebar?.classList.contains('open')));
document.querySelector('#closeMenu')?.addEventListener('click', () => toggleMenu(false));

/* ---------- sidebar course switcher: remember open/closed ---------- */
const pathSwitcher = document.querySelector<HTMLDetailsElement>('[data-path-switcher]');
if (pathSwitcher) {
  pathSwitcher.open = read('sidebar:paths') === 'open';
  pathSwitcher.addEventListener('toggle', () => write('sidebar:paths', pathSwitcher.open ? 'open' : 'closed'));
}

/* ---------- search ---------- */
type SearchItem = { title: string; summary: string; course: string; url: string };
const searchInput = document.querySelector<HTMLInputElement>('#siteSearch');
const searchResults = document.querySelector<HTMLElement>('#searchResults');
let searchIndex: SearchItem[] | null = null;
async function loadIndex() {
  if (searchIndex || !searchInput) return searchIndex;
  try { searchIndex = await (await fetch(searchInput.dataset.index!)).json(); } catch { searchIndex = []; }
  return searchIndex;
}
async function runSearch() {
  if (!searchInput || !searchResults) return;
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.hidden = true; return; }
  const items = ((await loadIndex()) || []).filter((i) => `${i.title} ${i.summary} ${i.course}`.toLowerCase().includes(q)).slice(0, 8);
  searchResults.innerHTML = items.length
    ? items.map((i) => `<a role="option" href="${i.url}"><strong>${escapeHtml(i.title)}</strong><small>${escapeHtml(i.course)} · ${escapeHtml(i.summary)}</small></a>`).join('')
    : `<p>${escapeHtml(searchInput.dataset.empty!)}</p>`;
  searchResults.hidden = false;
}
searchInput?.addEventListener('focus', loadIndex);
searchInput?.addEventListener('input', runSearch);
searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { searchInput.value = ''; if (searchResults) searchResults.hidden = true; }
  if (e.key === 'Enter') searchResults?.querySelector<HTMLAnchorElement>('a')?.click();
});
document.addEventListener('click', (e) => {
  if (searchResults && !(e.target as Element).closest('.search-wrap')) searchResults.hidden = true;
});

/* ---------- progress ---------- */
// Elements with data-progress-course show progress for that course; data-total gives the lesson count.
function renderProgress() {
  for (const el of $$<HTMLElement>(document, '[data-progress-course]')) {
    const course = el.dataset.progressCourse!;
    const total = Number(el.dataset.total) || 1;
    const done = getProgress(course);
    const count = done.length;
    const percent = Math.round((Math.min(count, total) / total) * 100);
    el.querySelectorAll('[data-progress-count]').forEach((n) => (n.textContent = String(count)));
    el.querySelectorAll('[data-progress-percent]').forEach((n) => (n.textContent = `${percent}%`));
    el.querySelectorAll<HTMLElement>('[data-progress-fill]').forEach((n) => (n.style.width = `${percent}%`));
    el.querySelectorAll<HTMLElement>('[data-progress-text]').forEach((n) => (n.textContent = n.dataset.progressText!.replace('{percent}', String(percent))));
  }
  for (const link of $$<HTMLElement>(document, '[data-lesson-link]')) {
    const [course, lesson] = link.dataset.lessonLink!.split('/');
    const state = link.querySelector<HTMLElement>('.lesson-state');
    if (!state || link.classList.contains('active')) continue;
    const done = getProgress(course).includes(lesson);
    state.classList.toggle('done', done);
    state.textContent = done ? '✓' : state.dataset.number!;
  }
}
renderProgress();
document.querySelector<HTMLButtonElement>('[data-complete]')?.addEventListener('click', (e) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const [course, lesson] = btn.dataset.complete!.split('/');
  markComplete(course, lesson);
  renderProgress();
  toast(btn.dataset.toast!);
});

/* ---------- bookmarks ---------- */
const getBookmarks = () => readJSON<string[]>('bookmarks', []);
function renderBookmarkMarks() {
  const list = getBookmarks();
  for (const link of $$<HTMLElement>(document, '[data-lesson-link]')) link.classList.toggle('bookmarked', list.includes(link.dataset.lessonLink!));
}
for (const btn of $$<HTMLButtonElement>(document, '[data-bookmark]')) {
  const key = btn.dataset.bookmark!;
  const label = btn.querySelector<HTMLElement>('[data-bookmark-label]');
  const sync = () => {
    const on = getBookmarks().includes(key);
    btn.classList.toggle('saved', on);
    btn.setAttribute('aria-pressed', String(on));
    if (label) label.textContent = on ? btn.dataset.labelOn! : btn.dataset.labelOff!;
  };
  sync();
  btn.addEventListener('click', () => {
    const list = getBookmarks();
    const on = list.includes(key);
    writeJSON('bookmarks', on ? list.filter((k) => k !== key) : [...list, key]);
    sync();
    renderBookmarkMarks();
    toast(on ? btn.dataset.off! : btn.dataset.on!);
  });
}
renderBookmarkMarks();

/* Catalog: list bookmarked lessons, using the static search index for titles and URLs. */
const bookmarkList = document.querySelector<HTMLElement>('[data-bookmark-list]');
if (bookmarkList) {
  const keys = getBookmarks();
  const empty = bookmarkList.querySelector<HTMLElement>('[data-bookmark-empty]')!;
  if (keys.length) {
    fetch(bookmarkList.dataset.index!).then((r) => r.json()).then((items: (SearchItem & { key: string })[]) => {
      const found = keys.map((k) => items.find((i) => i.key === k)).filter(Boolean) as (SearchItem & { key: string })[];
      if (!found.length) return;
      empty.hidden = true;
      const ul = bookmarkList.querySelector<HTMLElement>('ul')!;
      ul.innerHTML = found.map((i) => `<li><a href="${i.url}"><span class="bm-star" aria-hidden="true">★</span><span><strong>${escapeHtml(i.title)}</strong><small>${escapeHtml(i.course)}</small></span></a><button type="button" class="bm-remove" data-key="${escapeHtml(i.key)}" aria-label="${escapeHtml(bookmarkList.dataset.remove!)}: ${escapeHtml(i.title)}">×</button></li>`).join('');
      ul.querySelectorAll<HTMLButtonElement>('.bm-remove').forEach((b) => b.addEventListener('click', () => {
        writeJSON('bookmarks', getBookmarks().filter((k) => k !== b.dataset.key));
        b.closest('li')!.remove();
        if (!ul.children.length) empty.hidden = false;
      }));
    }).catch(() => {});
  }
}

/* ---------- reflections ---------- */
for (const box of $$<HTMLElement>(document, '[data-reflection]')) {
  const key = `note:${box.dataset.reflection}`;
  const area = $<HTMLTextAreaElement>(box, 'textarea');
  const status = $(box, '[data-saved]');
  area.value = read(key) || '';
  area.addEventListener('input', () => write(key, area.value));
  $(box, 'button').addEventListener('click', () => { write(key, area.value); status.textContent = status.dataset.saved!; });
}

/* ---------- print ---------- */
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
