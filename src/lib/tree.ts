// Binary tree helpers shared by the tree visualizers: build, BST insert/remove, layout, SVG render.
export type TNode = { id: number; key: number | string; value?: string | number; left: TNode | null; right: TNode | null };

let nextId = 1;
export const node = (key: number | string, value?: string | number): TNode => ({ id: nextId++, key, value, left: null, right: null });

/** Build a tree from level-order values (null = no node), like LeetCode's [1,2,3,null,4]. */
export function fromLevels(values: (number | null)[]): TNode | null {
  if (!values.length || values[0] === null) return null;
  const root = node(values[0]);
  const queue: TNode[] = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const cur = queue.shift()!;
    for (const side of ['left', 'right'] as const) {
      const v = values[i++];
      if (v !== null && v !== undefined) { cur[side] = node(v); queue.push(cur[side]!); }
    }
  }
  return root;
}

const less = (a: number | string, b: number | string) => (typeof a === 'string' || typeof b === 'string' ? String(a).localeCompare(String(b)) < 0 : a < b);

/** Insert into a BST. Returns the new root and the ids visited on the way down. */
export function bstInsert(root: TNode | null, key: number | string, value?: string | number) {
  const path: number[] = [];
  let updated = false;
  const ins = (n: TNode | null): TNode => {
    if (!n) { const created = node(key, value); path.push(created.id); return created; }
    path.push(n.id);
    if (less(key, n.key)) n.left = ins(n.left);
    else if (less(n.key, key)) n.right = ins(n.right);
    else { n.value = value; updated = true; }
    return n;
  };
  return { root: ins(root), path, updated };
}

/** Search a BST. Returns the ids visited and whether the key was found. */
export function bstSearch(root: TNode | null, key: number | string) {
  const path: number[] = [];
  let n = root;
  while (n) {
    path.push(n.id);
    if (n.key === key) return { path, found: true };
    n = less(key, n.key) ? n.left : n.right;
  }
  return { path, found: false };
}

export type RemoveCase = 'missing' | 'leaf' | 'one' | 'two';
/** Remove from a BST (2 children: copy the in-order successor). */
export function bstRemove(root: TNode | null, key: number | string): { root: TNode | null; kase: RemoveCase; successor?: number | string } {
  let kase: RemoveCase = 'missing';
  let successor: number | string | undefined;
  const rm = (n: TNode | null, k: number | string, top: boolean): TNode | null => {
    if (!n) return null;
    if (less(k, n.key)) { n.left = rm(n.left, k, top); return n; }
    if (less(n.key, k)) { n.right = rm(n.right, k, top); return n; }
    if (top) kase = !n.left && !n.right ? 'leaf' : !n.left || !n.right ? 'one' : 'two';
    if (!n.left) return n.right;
    if (!n.right) return n.left;
    let s = n.right;
    while (s.left) s = s.left;
    if (top) successor = s.key;
    n.key = s.key; n.value = s.value;
    n.right = rm(n.right, s.key, false);
    return n;
  };
  const newRoot = rm(root, key, true);
  return { root: newRoot, kase, successor };
}

export function inorder(root: TNode | null, out: TNode[] = []): TNode[] {
  if (root) { inorder(root.left, out); out.push(root); inorder(root.right, out); }
  return out;
}
export function preorder(root: TNode | null, out: TNode[] = []): TNode[] {
  if (root) { out.push(root); preorder(root.left, out); preorder(root.right, out); }
  return out;
}
export function postorder(root: TNode | null, out: TNode[] = []): TNode[] {
  if (root) { postorder(root.left, out); postorder(root.right, out); out.push(root); }
  return out;
}
export const height = (n: TNode | null): number => (n ? 1 + Math.max(height(n.left), height(n.right)) : 0);

/** Render the tree into an <svg viewBox="0 0 680 H">. `cls` adds a state class per node. */
export function renderTree(svg: SVGElement, root: TNode | null, cls: (n: TNode) => string = () => '', label: (n: TNode) => string = (n) => String(n.key)) {
  const nodes = inorder(root);
  if (!root) { svg.innerHTML = ''; return; }
  const W = 680, levels = height(root);
  const H = Math.max(140, 30 + levels * 58);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const pos = new Map<number, { x: number; y: number }>();
  const depthOf = new Map<number, number>();
  const walk = (n: TNode | null, d: number) => { if (n) { depthOf.set(n.id, d); walk(n.left, d + 1); walk(n.right, d + 1); } };
  walk(root, 0);
  nodes.forEach((n, i) => pos.set(n.id, { x: ((i + 1) * W) / (nodes.length + 1), y: 26 + (depthOf.get(n.id) ?? 0) * 56 }));
  const r = nodes.length > 12 ? 15 : 18;
  let edges = '', circles = '';
  const draw = (n: TNode | null) => {
    if (!n) return;
    const p = pos.get(n.id)!;
    for (const c of [n.left, n.right]) if (c) { const q = pos.get(c.id)!; edges += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" class="ds-edge"/>`; }
    const text = label(n);
    circles += `<g class="ds-tnode ${cls(n)}" data-node="${n.id}"><circle cx="${p.x}" cy="${p.y}" r="${Math.max(r, text.length > 3 ? 24 : r)}"/><text x="${p.x}" y="${p.y + 4}" text-anchor="middle">${text}</text></g>`;
    draw(n.left); draw(n.right);
  };
  draw(root);
  svg.innerHTML = edges + circles;
}
