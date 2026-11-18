class MinHeap {
  constructor() { this.heap = []; }

  push(val) {
    const h = this.heap;
    h.push(val);                               // add at the end ...
    let i = h.length - 1;
    while (i > 0 && h[Math.floor((i - 1) / 2)] > h[i]) {
      const p = Math.floor((i - 1) / 2);       // ... then sift it up
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }
  }

  pop() {
    const h = this.heap;
    [h[0], h[h.length - 1]] = [h[h.length - 1], h[0]];   // last item to the root
    const smallest = h.pop();
    let i = 0;
    while (true) {                             // sift the new root down
      const l = 2 * i + 1, r = 2 * i + 2;
      let m = i;
      if (l < h.length && h[l] < h[m]) m = l;
      if (r < h.length && h[r] < h[m]) m = r;
      if (m === i) break;
      [h[i], h[m]] = [h[m], h[i]];
      i = m;
    }
    return smallest;
  }
}

const heap = new MinHeap();
for (const v of [5, 3, 8, 1, 9, 2]) heap.push(v);
console.log("heap array:", heap.heap);
console.log("pops:", Array.from({ length: 6 }, () => heap.pop()));
