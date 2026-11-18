import { fmt } from './dom';
/** Update the illustrative temperature chart inside `root`. */
export function updateSensorChart(root: HTMLElement, temp: number, threshold: number) {
  const chart = root.querySelector<HTMLElement>('[data-chart]');
  if (!chart) return;
  const y = (v: number) => 150 - (v - 10) * 3.3;
  const vals = [20, 21, 21, 23, 22, 25, 24, temp];
  chart.querySelector('[data-trend]')!.setAttribute('points', vals.map((v, i) => `${65 + i * 72},${y(v)}`).join(' '));
  const line = chart.querySelector('[data-threshold-line]')!;
  line.setAttribute('y1', String(y(threshold)));
  line.setAttribute('y2', String(y(threshold)));
  chart.querySelector('[data-dot]')!.setAttribute('cy', String(y(temp)));
  chart.querySelector('[data-chart-current]')!.textContent = fmt(chart.dataset.current!, { t: temp });
  chart.querySelector('[data-chart-threshold]')!.textContent = fmt(chart.dataset.threshold!, { t: threshold });
}
