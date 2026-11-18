---
id: quick-sort
order: 12
section: SORTING
title: Quick sort
summary: Partition around a pivot
duration: 17 min
description: Quick sort picks a pivot, moves smaller items to its left and larger ones to its right, then sorts each side.
goal: Partition an array around a pivot and explain why the worst case is O(n²).
eyebrow: THE BIG IDEA
conceptTitle: Put one item in its final place, then recurse
formula: "[ < pivot ] pivot [ ≥ pivot ]"
takeaways:
  - label: Pivot
    text: After partitioning it sits in its final position.
  - label: In place
    text: Only swaps; no extra arrays (O(log n) stack).
  - label: Not stable
    text: Equal items may change order.
widget: sort-quick
widgetTitle: Partition around the pivot
widgetDescription: The orange bar is the pivot. Each pivot turns green once it reaches its final place.
code:
  file: quick_sort.py
  lang: python
  source: |-
    def quick_sort(arr, lo, hi):
        if lo >= hi:
            return
        pivot = arr[hi]                 # last element as pivot
        left = lo
        for i in range(lo, hi):
            if arr[i] < pivot:          # move smaller items to the left side
                arr[left], arr[i] = arr[i], arr[left]
                left += 1
        arr[left], arr[hi] = arr[hi], arr[left]   # pivot to its final spot
        quick_sort(arr, lo, left - 1)
        quick_sort(arr, left + 1, hi)

    nums = [6, 2, 4, 1, 3, 5]
    quick_sort(nums, 0, len(nums) - 1)
    print(nums)
  output: "[1, 2, 3, 4, 5, 6]"
  description: In-place quick sort with the last element as pivot.
  variants:
    - lang: javascript
      file: quick_sort.js
      source: |-
        function quickSort(arr, lo, hi) {
          if (lo >= hi) return;
          const pivot = arr[hi];               // last element as pivot
          let left = lo;
          for (let i = lo; i < hi; i++) {
            if (arr[i] < pivot) {              // move smaller items to the left side
              [arr[left], arr[i]] = [arr[i], arr[left]];
              left++;
            }
          }
          [arr[left], arr[hi]] = [arr[hi], arr[left]];   // pivot to its final spot
          quickSort(arr, lo, left - 1);
          quickSort(arr, left + 1, hi);
        }

        const nums = [6, 2, 4, 1, 3, 5];
        quickSort(nums, 0, nums.length - 1);
        console.log(nums);
      output: "[ 1, 2, 3, 4, 5, 6 ]"
    - lang: cpp
      file: quick_sort.cpp
      source: |-
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        void quickSort(vector<int>& arr, int lo, int hi) {
            if (lo >= hi) return;
            int pivot = arr[hi];                // last element as pivot
            int left = lo;
            for (int i = lo; i < hi; i++) {
                if (arr[i] < pivot) swap(arr[left++], arr[i]);  // smaller items go left
            }
            swap(arr[left], arr[hi]);           // pivot to its final spot
            quickSort(arr, lo, left - 1);
            quickSort(arr, left + 1, hi);
        }

        int main() {
            vector<int> nums = {6, 2, 4, 1, 3, 5};
            quickSort(nums, 0, nums.size() - 1);
            for (int x : nums) cout << x << " ";
            cout << endl;
        }
      output: 1 2 3 4 5 6
complexity:
  - op: Average
    time: O(n log n)
    space: O(log n)
  - op: Worst (bad pivots)
    time: O(n²)
    space: O(n)
videos:
  - title: Quick sort in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=Hoixgm4-P4M
  - title: Quicksort algorithm
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=COk73cpQbFQ
practice:
  - title: Sort an Array
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Kth Largest Element in an Array
    url: https://leetcode.com/problems/kth-largest-element-in-an-array/
    difficulty: medium
reflectionPrompt: What input makes a last-element pivot perform worst, and how would you avoid it?
---

Choose a **pivot** (here, the last element). Walk through the range and swap every smaller item to the left side. Finally swap the pivot right after them: it is now exactly where it belongs in the sorted array. Recurse on the left part and the right part.

When pivots split the array roughly in half, quick sort runs in O(n log n) and sorts in place, which makes it very fast in practice. If the pivot is always the smallest or largest item (for example, already sorted input with a last-element pivot), each step only removes one item and the time becomes O(n²). Picking a random pivot makes that very unlikely.
