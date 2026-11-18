// Helpers for the heap widgets: draw an array as a complete binary tree + array cells.
import { fromLevels, inorder, renderTree, type TNode } from './tree';

/** Render `arr` as a tree in `svg` and as indexed cells in `cells`. `cls(i)` gives a state class per index. */
export function drawHeap(svg: SVGElement, cells: HTMLElement, arr: number[], cls: (i: number) => string = () => '') {
  const tree = fromLevels(arr);
  // fromLevels creates nodes level by level, so level-order position = array index
  const order: TNode[] = [];
  const queue = tree ? [tree] : [];
  while (queue.length) { const n = queue.shift()!; order.push(n); if (n.left) queue.push(n.left); if (n.right) queue.push(n.right); }
  const indexOf = new Map(order.map((n, i) => [n.id, i]));
  renderTree(svg, tree, (n) => `${cls(indexOf.get(n.id)!)} heap-node`, (n) => String(n.key));
  svg.querySelectorAll<SVGGElement>('[data-node]').forEach((g) => (g.dataset.index = String(indexOf.get(Number(g.dataset.node)))));
  cells.innerHTML = arr.map((v, i) => `<div class="ds-cell ${cls(i)}" data-index="${i}"><small>${i}</small><strong>${v}</strong></div>`).join('') || '<div class="ds-empty">[ ]</div>';
  return inorder(tree).length;
}

export const parentOf = (i: number) => Math.floor((i - 1) / 2);
