// SVG vector plot used by the linear-algebra widgets.
export function plotVector(svg: SVGSVGElement, vector: number[], color: string, label: string, second: number[] | null = null) {
  const origin = { x: 220, y: 190 }, scale = 26;
  const end = { x: origin.x + vector[0] * scale, y: origin.y - vector[1] * scale };
  const other = second ? { x: origin.x + second[0] * scale, y: origin.y - second[1] * scale } : null;
  const id = `arrow-${Math.random().toString(36).slice(2, 8)}`;
  svg.innerHTML = `<defs><marker id="${id}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="${color}"/></marker></defs><path d="M35 190 H405 M220 275 V25" stroke="#d6deea" stroke-width="1.5"/><path d="M220 190 L${end.x} ${end.y}" stroke="${color}" stroke-width="4" marker-end="url(#${id})"/><circle cx="${end.x}" cy="${end.y}" r="5" fill="${color}"/><text x="${end.x + 8}" y="${end.y - 8}" fill="${color}" font-size="13">${label}</text>${other ? `<path d="M220 190 L${other.x} ${other.y}" stroke="#8d9bb0" stroke-width="3" stroke-dasharray="6 5"/><circle cx="${other.x}" cy="${other.y}" r="4" fill="#8d9bb0"/>` : ''}<text x="392" y="180" fill="#8996a9" font-size="12">x</text><text x="230" y="34" fill="#8996a9" font-size="12">y</text>`;
}

/** Wire every range input in `root`: update its [data-out] label, then call `onChange`. Returns a reader by key. */
export function bindRanges(root: HTMLElement, onChange: () => void) {
  const inputs = [...root.querySelectorAll<HTMLInputElement>('input[type="range"][data-k]')];
  const val = (k: string) => Number(root.querySelector<HTMLInputElement>(`input[data-k="${k}"]`)?.value ?? 0);
  for (const input of inputs) {
    input.addEventListener('input', () => {
      const out = root.querySelector(`[data-out="${input.dataset.k}"]`);
      if (out) out.textContent = Number(input.value).toFixed(1).replace(/\.0$/, '');
      onChange();
    });
  }
  return val;
}
