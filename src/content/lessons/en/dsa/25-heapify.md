---
id: heapify
order: 25
section: HEAP / PRIORITY QUEUE
title: Heapify
summary: Build a heap in O(n)
duration: 15 min
description: Heapify turns any array into a heap in linear time by sifting down every parent, from the last one back to the root.
goal: Build a heap bottom-up and understand why it beats n separate pushes.
eyebrow: THE BIG IDEA
conceptTitle: Fix small heaps first, then join them
formula: "for i = n//2 − 1 down to 0: sift_down(i)  → O(n)"
takeaways:
  - label: Leaves are free
    text: Half the array needs no work at all.
  - label: Bottom-up
    text: Sift down parents from the last one to the root.
  - label: O(n)
    text: Cheaper than n pushes at O(n log n).
widget: heapify
widgetTitle: Build a heap step by step
widgetDescription: Green subtrees are finished heaps. Try a new array and count the swaps.
code:
  file: heapify.py
  lang: python
  source: |-
    def sift_down(arr, i, n):
        while True:
            l, r, smallest = 2 * i + 1, 2 * i + 2, i
            if l < n and arr[l] < arr[smallest]: smallest = l
            if r < n and arr[r] < arr[smallest]: smallest = r
            if smallest == i:
                return
            arr[i], arr[smallest] = arr[smallest], arr[i]
            i = smallest

    def heapify(arr):
        # leaves are already heaps: start at the last parent and walk back to the root
        for i in range(len(arr) // 2 - 1, -1, -1):
            sift_down(arr, i, len(arr))
        return arr

    print(heapify([9, 5, 7, 2, 4, 1, 8]))

    import heapq                     # Python's built-in min-heap does the same
    nums = [9, 5, 7, 2, 4, 1, 8]
    heapq.heapify(nums)
    print(nums, heapq.heappop(nums))
  output: |-
    [1, 2, 7, 5, 4, 9, 8]
    [2, 4, 7, 5, 8, 9] 1
  description: Bottom-up heapify, then the same with the standard library.
  variants:
    - lang: javascript
      file: heapify.js
      source: |-
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
      output: 1 2 7 5 4 9 8
    - lang: cpp
      file: heapify.cpp
      source: |-
        #include <algorithm>
        #include <functional>
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        void siftDown(vector<int>& arr, int i, int n) {
            while (true) {
                int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
                if (l < n && arr[l] < arr[smallest]) smallest = l;
                if (r < n && arr[r] < arr[smallest]) smallest = r;
                if (smallest == i) return;
                swap(arr[i], arr[smallest]);
                i = smallest;
            }
        }

        void heapify(vector<int>& arr) {
            // leaves are already heaps: start at the last parent and walk back to the root
            for (int i = arr.size() / 2 - 1; i >= 0; i--) siftDown(arr, i, arr.size());
        }

        int main() {
            vector<int> arr = {9, 5, 7, 2, 4, 1, 8};
            heapify(arr);
            for (int v : arr) cout << v << " ";
            cout << endl;

            vector<int> nums = {9, 5, 7, 2, 4, 1, 8};
            make_heap(nums.begin(), nums.end(), greater<int>());   // the standard library equivalent
            cout << "min: " << nums.front() << endl;
        }
      output: |-
        1 2 7 5 4 9 8 
        min: 1
complexity:
  - op: Heapify n items
    time: O(n)
    space: O(1)
  - op: n separate pushes
    time: O(n log n)
    space: O(1)
videos:
  - title: 2.6.3 Heap - Heap Sort - Heapify - Priority Queues
    channel: Abdul Bari
    url: https://www.youtube.com/watch?v=HqPJF2L5h9U
  - title: Heap sort in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=2DmK_H7IdTo
practice:
  - title: Sort an Array (try heap sort)
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Kth Largest Element in an Array
    url: https://leetcode.com/problems/kth-largest-element-in-an-array/
    difficulty: medium
reflectionPrompt: Why does heapify start from the middle of the array instead of the end?
---

The second half of the array are leaves, and a single leaf is already a heap. So start at the last parent, index `n // 2 − 1`, sift it down, and move left toward the root. When you reach a node, both of its subtrees are already valid heaps, so one sift-down is enough to make the whole subtree valid.

Pushing n items one by one costs O(n log n). Heapify is **O(n)**: most nodes sit near the bottom, where sifting down is only one or two steps, and the few nodes near the top that travel far are rare. This is how `heapq.heapify` works, and it is the first phase of heap sort.
