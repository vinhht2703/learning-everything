function siftDown(arr, i, n) {
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2;
    let smallest = i;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest === i) return;
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    i = smallest;
  }
}

function heapify(arr) {
  // leaves are already heaps: start at the last parent and walk back to the root
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) siftDown(arr, i, arr.length);
  return arr;
}

console.log(heapify([9, 5, 7, 2, 4, 1, 8]).join(" "));
