---
id: merge-sort
order: 11
section: SORTING
title: Merge sort
summary: Divide, sort halves, merge
duration: 22 min
description: Merge sort splits the array in half, sorts each half recursively, then merges the two sorted halves.
goal: Explain divide and conquer and why merge sort is always O(n log n).
eyebrow: THE BIG IDEA
conceptTitle: Divide and conquer
formula: log₂ n levels × O(n) merge work per level = O(n log n)
takeaways:
  - label: Divide
    text: Split until each piece has one item.
  - label: Merge
    text: Combine two sorted lists in O(n) with two pointers.
  - label: Guaranteed O(n log n)
    text: No bad inputs, but needs O(n) extra space.
widget: sort-merge
widgetTitle: Watch halves merge
widgetDescription: Faded bars are outside the current range. Green ranges have been merged.
code:
  file: merge_sort.py
  lang: python
  source: |-
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        return merge(left, right)

    def merge(left, right):
        out, i, j = [], 0, 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:      # <= keeps the sort stable
                out.append(left[i]); i += 1
            else:
                out.append(right[j]); j += 1
        return out + left[i:] + right[j:]

    print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
  output: "[3, 9, 10, 27, 38, 43, 82]"
  description: Recursive merge sort that returns a new sorted list.
  variants:
    - lang: javascript
      file: merge_sort.js
      source: |-
        function mergeSort(arr) {
          if (arr.length <= 1) return arr;
          const mid = Math.floor(arr.length / 2);
          return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
        }

        function merge(left, right) {
          const out = [];
          let i = 0, j = 0;
          while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) out.push(left[i++]);   // <= keeps it stable
            else out.push(right[j++]);
          }
          return [...out, ...left.slice(i), ...right.slice(j)];
        }

        console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]).join(" "));
      output: 3 9 10 27 38 43 82
    - lang: cpp
      file: merge_sort.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        vector<int> merge(const vector<int>& left, const vector<int>& right) {
            vector<int> out;
            size_t i = 0, j = 0;
            while (i < left.size() && j < right.size()) {
                if (left[i] <= right[j]) out.push_back(left[i++]);  // <= keeps it stable
                else out.push_back(right[j++]);
            }
            while (i < left.size()) out.push_back(left[i++]);
            while (j < right.size()) out.push_back(right[j++]);
            return out;
        }

        vector<int> mergeSort(const vector<int>& arr) {
            if (arr.size() <= 1) return arr;
            size_t mid = arr.size() / 2;
            vector<int> left(arr.begin(), arr.begin() + mid), right(arr.begin() + mid, arr.end());
            return merge(mergeSort(left), mergeSort(right));
        }

        int main() {
            for (int x : mergeSort({38, 27, 43, 3, 9, 82, 10})) cout << x << " ";
            cout << endl;
        }
      output: 3 9 10 27 38 43 82
complexity:
  - op: All cases
    time: O(n log n)
    space: O(n)
videos:
  - title: Merge sort in 3 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=4VqmGXwpLqc
  - title: Merge sort algorithm
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=TzeBrDU-JaY
practice:
  - title: Merge Sorted Array
    url: https://leetcode.com/problems/merge-sorted-array/
    difficulty: easy
  - title: Sort an Array
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Merge k Sorted Lists
    url: https://leetcode.com/problems/merge-k-sorted-lists/
    difficulty: hard
reflectionPrompt: Where else could "split in half, solve, combine" help you?
---

An array of one element is already sorted, so that is the base case. Otherwise split it into two halves, sort each half with the same function, and **merge**: look at the front of both halves, take the smaller item, repeat.

Halving n repeatedly gives about log₂ n levels, and each level merges all n items once, so merge sort is O(n log n) in every case. The price is O(n) extra memory for the merged arrays. It is stable, which is why many standard libraries use merge sort (or its cousin Timsort).
