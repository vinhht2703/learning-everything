---
id: heap-push-pop
order: 24
section: HEAP / HÀNG ĐỢI ƯU TIÊN
title: Thêm và lấy ra trong heap
summary: Nổi lên, chìm xuống
duration: 18 phút
description: Thêm đặt giá trị vào cuối rồi cho nó nổi lên; lấy ra bỏ gốc, chuyển giá trị cuối lên đỉnh rồi cho nó chìm xuống.
goal: Lần theo việc nổi lên và chìm xuống, và giải thích vì sao cả hai đều O(log n).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Chỉ sửa một đường, không sửa cả cây
formula: "thêm: nối cuối → nổi lên · lấy: cuối → gốc → chìm xuống"
takeaways:
  - label: Nổi lên
    text: "Sau khi thêm: hoán đổi với cha khi còn nhỏ hơn."
  - label: Chìm xuống
    text: "Sau khi lấy: hoán đổi với con nhỏ hơn khi còn lớn hơn."
  - label: O(log n)
    text: Chỉ đụng tới một đường từ gốc đến lá.
widget: heap-push-pop
widgetTitle: Thêm và lấy ra trên heap nhỏ nhất
widgetDescription: "Xem từng phép so sánh và hoán đổi. Lấy ra liên tục: các giá trị ra theo thứ tự tăng dần."
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
  description: Một heap nhỏ nhất với thêm (nổi lên) và lấy ra (chìm xuống).
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
  - op: Thêm
    time: O(log n)
    space: O(1)
  - op: Lấy nhỏ nhất
    time: O(log n)
    space: O(1)
  - op: Heap sort (n lần lấy)
    time: O(n log n)
    space: O(1)
videos:
  - title: Heap sort in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=2DmK_H7IdTo
  - title: 2.6.3 Heap - Heap Sort - Heapify - Priority Queues
    channel: Abdul Bari
    url: https://www.youtube.com/watch?v=HqPJF2L5h9U
    note: bài giảng đầy đủ
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
reflectionPrompt: Vì sao khi chìm xuống ta hoán đổi với con nhỏ hơn, không bao giờ với con lớn hơn?
---

**Thêm:** nối giá trị vào cuối mảng (chỗ trống kế tiếp ở tầng dưới cùng). Nó có thể nhỏ hơn cha, nên hoán đổi lên trên chừng nào còn đúng như vậy. **Lấy ra:** đáp án là `heap[0]`. Chuyển phần tử cuối lên gốc, thu nhỏ mảng, rồi hoán đổi phần tử đó xuống với con *nhỏ hơn* cho đến khi cả hai con đều lớn hơn.

Mỗi lần hoán đổi đi một tầng, và cây đầy đủ n nút có khoảng log₂ n tầng, nên thêm và lấy ra đều O(log n). Python có sẵn `heapq`, Java có `PriorityQueue`, C++ có `std::priority_queue`. Lấy ra hết sẽ cho các giá trị theo thứ tự tăng dần: đó là **sắp xếp vun đống (heap sort)**, O(n log n).
