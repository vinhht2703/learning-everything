class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, val):
        self.heap.append(val)                 # add at the end ...
        i = len(self.heap) - 1
        while i > 0 and self.heap[(i - 1) // 2] > self.heap[i]:
            p = (i - 1) // 2                  # ... then sift it up
            self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
            i = p

    def pop(self):
        h = self.heap
        h[0], h[-1] = h[-1], h[0]             # move the last item to the root
        smallest = h.pop()
        i = 0
        while True:                           # sift the new root down
            l, r, m = 2 * i + 1, 2 * i + 2, i
            if l < len(h) and h[l] < h[m]: m = l
            if r < len(h) and h[r] < h[m]: m = r
            if m == i: break
            h[i], h[m] = h[m], h[i]
            i = m
        return smallest

heap = MinHeap()
for v in [5, 3, 8, 1, 9, 2]:
    heap.push(v)
print("heap array:", heap.heap)
print("pops:", [heap.pop() for _ in range(6)])
