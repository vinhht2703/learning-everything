---
id: heap-push-pop
order: 24
section: HEAP / PRIORITY QUEUE
title: Heap push and pop
summary: Sift up, sift down
duration: 18 min
description: Push adds a value at the end and sifts it up; pop removes the root, moves the last value to the top and sifts it down.
goal: Trace sift-up and sift-down and explain why both are O(log n).
eyebrow: THE BIG IDEA
conceptTitle: Repair one path, not the whole tree
formula: "push: append → sift up · pop: last → root → sift down"
takeaways:
  - label: Sift up
    text: "After push: swap with the parent while smaller."
  - label: Sift down
    text: "After pop: swap with the smaller child while bigger."
  - label: O(log n)
    text: Only one root-to-leaf path is touched.
widget: heap-push-pop
widgetTitle: Push and pop on a min-heap
widgetDescription: "Watch each comparison and swap. Pop repeatedly: the values come out sorted."
code:
  file: min_heap.py
  lang: python
  source: |-
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
  output: |-
    heap array: [1, 3, 2, 5, 9, 8]
    pops: [1, 2, 3, 5, 8, 9]
  description: A min-heap with push (sift up) and pop (sift down).
  variants:
    - lang: javascript
      file: min_heap.js
      source: |-
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
      output: |-
        heap array: [ 1, 3, 2, 5, 9, 8 ]
        pops: [ 1, 2, 3, 5, 8, 9 ]
    - lang: cpp
      file: min_heap.cpp
      source: |-
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        class MinHeap {
        public:
            vector<int> heap;

            void push(int val) {
                heap.push_back(val);                          // add at the end ...
                int i = heap.size() - 1;
                while (i > 0 && heap[(i - 1) / 2] > heap[i]) {
                    swap(heap[i], heap[(i - 1) / 2]);         // ... then sift it up
                    i = (i - 1) / 2;
                }
            }

            int pop() {
                swap(heap.front(), heap.back());              // last item to the root
                int smallest = heap.back();
                heap.pop_back();
                int i = 0, n = heap.size();
                while (true) {                                // sift the new root down
                    int l = 2 * i + 1, r = 2 * i + 2, m = i;
                    if (l < n && heap[l] < heap[m]) m = l;
                    if (r < n && heap[r] < heap[m]) m = r;
                    if (m == i) break;
                    swap(heap[i], heap[m]);
                    i = m;
                }
                return smallest;
            }
        };

        int main() {
            MinHeap heap;
            for (int v : {5, 3, 8, 1, 9, 2}) heap.push(v);
            cout << "heap array: ";
            for (int v : heap.heap) cout << v << " ";
            cout << endl << "pops: ";
            for (int k = 0; k < 6; k++) cout << heap.pop() << " ";
            cout << endl;
        }
      output: |-
        heap array: 1 3 2 5 9 8 
        pops: 1 2 3 5 8 9
complexity:
  - op: Push
    time: O(log n)
    space: O(1)
  - op: Pop min
    time: O(log n)
    space: O(1)
  - op: Heap sort (n pops)
    time: O(n log n)
    space: O(1)
videos:
  - title: Heap sort in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=2DmK_H7IdTo
  - title: 2.6.3 Heap - Heap Sort - Heapify - Priority Queues
    channel: Abdul Bari
    url: https://www.youtube.com/watch?v=HqPJF2L5h9U
    note: full lecture
practice:
  - title: Last Stone Weight
    url: https://leetcode.com/problems/last-stone-weight/
    difficulty: easy
  - title: K Closest Points to Origin
    url: https://leetcode.com/problems/k-closest-points-to-origin/
    difficulty: medium
  - title: Kth Largest Element in an Array
    url: https://leetcode.com/problems/kth-largest-element-in-an-array/
    difficulty: medium
reflectionPrompt: Why is sifting down done with the smaller child and never the larger one?
---

**Push:** append the value to the end of the array (the next free spot in the bottom level). It may be smaller than its parent, so swap it upward while that is true. **Pop:** the answer is `heap[0]`. Move the last element into the root, shrink the array, then swap that element down with its *smaller* child until both children are bigger.

Each swap moves one level, and a complete tree of n nodes has about log₂ n levels, so push and pop are O(log n). Python ships this as `heapq`, Java as `PriorityQueue`, C++ as `std::priority_queue`. Popping everything gives the values in sorted order: that is **heap sort**, O(n log n).
