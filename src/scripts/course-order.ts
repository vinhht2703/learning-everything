// Learner-defined course order (localStorage le:courseOrder = array of course keys).
// Applied to every [data-course-list] (catalog grids, sidebar pickers); the catalog adds a reorder mode
// with drag-and-drop and ←/→ buttons (keyboard and touch friendly).
import { $$, fmt, toast } from '../lib/dom';
import { readJSON, remove, writeJSON } from '../lib/storage';

const KEY = 'courseOrder';
const getOrder = () => readJSON<string[]>(KEY, []);

/** Sort the children of every course list by the saved order; unknown courses keep their default position at the end. */
export function applyCourseOrder() {
  const order = getOrder();
  for (const list of $$<HTMLElement>(document, '[data-course-list]')) {
    const items = [...list.querySelectorAll<HTMLElement>(':scope > [data-course-key]')];
    if (!list.dataset.defaultOrder) list.dataset.defaultOrder = items.map((i) => i.dataset.courseKey).join(',');
    const defaults = list.dataset.defaultOrder.split(',');
    const rank = (k: string) => { const i = order.indexOf(k); return i === -1 ? order.length + defaults.indexOf(k) : i; };
    items.sort((a, b) => rank(a.dataset.courseKey!) - rank(b.dataset.courseKey!)).forEach((el) => list.append(el));
  }
}

function saveFromDom() {
  // Global order = catalog lists in page order (tech group, then personal group).
  const keys = $$<HTMLElement>(document, '[data-course-list] > [data-course-key]').map((el) => el.dataset.courseKey!);
  writeJSON(KEY, keys);
}

function initReorderMode() {
  const bar = document.querySelector<HTMLElement>('[data-reorder-bar]');
  if (!bar) return;
  const toggle = bar.querySelector<HTMLButtonElement>('[data-reorder-toggle]')!;
  const resetBtn = bar.querySelector<HTMLButtonElement>('[data-reorder-reset]')!;
  const hint = bar.querySelector<HTMLElement>('[data-reorder-hint]')!;
  const label = toggle.querySelector<HTMLElement>('[data-reorder-label]')!;
  const cards = () => $$<HTMLAnchorElement>(document, '.catalog-grid > [data-course-key]');
  let editing = false;
  let dragged: HTMLElement | null = null;

  const refreshButtons = () => {
    for (const list of $$<HTMLElement>(document, '.catalog-grid[data-course-list]')) {
      const items = [...list.children] as HTMLElement[];
      items.forEach((card, i) => {
        card.querySelector<HTMLButtonElement>('[data-move="-1"]')!.disabled = i === 0;
        card.querySelector<HTMLButtonElement>('[data-move="1"]')!.disabled = i === items.length - 1;
      });
    }
  };
  const move = (card: HTMLElement, dir: number) => {
    const sibling = (dir < 0 ? card.previousElementSibling : card.nextElementSibling) as HTMLElement | null;
    if (!sibling) return;
    if (dir < 0) sibling.before(card); else sibling.after(card);
    saveFromDom();
    refreshButtons();
    card.querySelector<HTMLButtonElement>(`[data-move="${dir}"]`)?.focus();
  };
  const preventNav = (e: Event) => { if (editing) e.preventDefault(); };

  // Add the move controls once; they are only visible in reorder mode.
  for (const card of cards()) {
    const name = card.querySelector('strong')?.textContent ?? card.dataset.courseKey!;
    const controls = document.createElement('span');
    controls.className = 'reorder-controls';
    controls.innerHTML = `<span class="drag-handle" aria-hidden="true">⠿</span><button type="button" data-move="-1" aria-label="${fmt(bar.dataset.earlier!, { course: name })}">←</button><button type="button" data-move="1" aria-label="${fmt(bar.dataset.later!, { course: name })}">→</button>`;
    card.prepend(controls);
    controls.querySelectorAll<HTMLButtonElement>('[data-move]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); move(card, Number(b.dataset.move)); }));
    card.addEventListener('click', preventNav);
    card.addEventListener('dragstart', (e) => {
      if (!editing) { e.preventDefault(); return; }
      dragged = card;
      card.classList.add('dragging');
      e.dataTransfer?.setData('text/plain', card.dataset.courseKey!);
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => { card.classList.remove('dragging'); dragged = null; saveFromDom(); refreshButtons(); });
    card.addEventListener('dragover', (e) => {
      if (!editing || !dragged || dragged === card || dragged.parentElement !== card.parentElement) return;
      e.preventDefault();
      const r = card.getBoundingClientRect();
      const after = e.clientX > r.left + r.width / 2 || e.clientY > r.bottom - 10;
      if (after) card.after(dragged); else card.before(dragged);
    });
  }

  const setEditing = (on: boolean) => {
    editing = on;
    document.body.classList.toggle('reordering', on);
    toggle.setAttribute('aria-pressed', String(on));
    label.textContent = on ? toggle.dataset.labelOn! : toggle.dataset.labelOff!;
    resetBtn.hidden = !on;
    hint.hidden = !on;
    cards().forEach((c) => { c.draggable = on; c.setAttribute('aria-disabled', String(on)); });
    refreshButtons();
    if (!on && getOrder().length) toast(bar.dataset.saved!);
  };
  toggle.addEventListener('click', () => setEditing(!editing));
  resetBtn.addEventListener('click', () => {
    remove(KEY);
    for (const list of $$<HTMLElement>(document, '[data-course-list]')) {
      const defaults = (list.dataset.defaultOrder ?? '').split(',');
      [...list.children].sort((a, b) => defaults.indexOf((a as HTMLElement).dataset.courseKey!) - defaults.indexOf((b as HTMLElement).dataset.courseKey!)).forEach((el) => list.append(el));
    }
    refreshButtons();
    toast(bar.dataset.reset!);
  });
}

applyCourseOrder();
initReorderMode();
