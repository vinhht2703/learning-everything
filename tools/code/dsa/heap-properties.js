// A min-heap stored in a plain array (index 0 is the root).
const heap = [1, 3, 2, 7, 4, 5, 6];

const parent = (i) => Math.floor((i - 1) / 2);
const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;

// every parent must be <= its children
const isMinHeap = (arr) => arr.every((v, i) => i === 0 || arr[parent(i)] <= v);

console.log("root (minimum):", heap[0]);
console.log("children of index 1:", heap[left(1)], heap[right(1)]);
console.log("parent of index 5:", heap[parent(5)]);
console.log("valid min-heap:", isMinHeap(heap), isMinHeap([3, 1, 2]));
