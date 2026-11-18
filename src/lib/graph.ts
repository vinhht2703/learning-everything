// Draw a small graph (nodes on a circle) into an <svg viewBox="0 0 320 240">.
export type Edge = [string, string];

export function drawGraph(svg: SVGElement, nodes: string[], edges: Edge[], opts: { directed?: boolean; cls?: (n: string) => string; label?: (n: string) => string } = {}) {
  const W = 320, H = 240, R = 88, cx = W / 2, cy = H / 2 + 4;
  const pos = new Map(nodes.map((n, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
    return [n, { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }];
  }));
  const r = 17;
  const marker = opts.directed ? '<defs><marker id="g-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="g-arrow"/></marker></defs>' : '';
  const lines = edges.map(([a, b]) => {
    const p = pos.get(a), q = pos.get(b);
    if (!p || !q) return '';
    const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy) || 1;
    const x1 = p.x + (dx / len) * r, y1 = p.y + (dy / len) * r, x2 = q.x - (dx / len) * (r + 2), y2 = q.y - (dy / len) * (r + 2);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ds-edge"${opts.directed ? ' marker-end="url(#g-arrow)"' : ''}/>`;
  }).join('');
  const circles = nodes.map((n) => {
    const p = pos.get(n)!;
    return `<g class="ds-tnode ${opts.cls?.(n) ?? ''}" data-gnode="${n}"><circle cx="${p.x}" cy="${p.y}" r="${r}"/><text x="${p.x}" y="${p.y + 4}" text-anchor="middle">${opts.label?.(n) ?? n}</text></g>`;
  }).join('');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = marker + lines + circles;
}
