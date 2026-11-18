---
id: search-array
order: 14
section: BINARY SEARCH
title: Binary search in an array
summary: Halve a sorted array each step
duration: 16 min
description: In a sorted array you can find a value by checking the middle and throwing away the half that cannot contain it.
goal: Implement binary search with low/high pointers and avoid off-by-one mistakes.
eyebrow: THE BIG IDEA
conceptTitle: Halve the search space every time
formula: n → n/2 → n/4 → … → 1   ⇒   about log₂ n steps
takeaways:
  - label: Sorted input
    text: Binary search only works on ordered data.
  - label: low / mid / high
    text: The window that can still contain the answer.
  - label: O(log n)
    text: About 20 checks for a million items.
widget: binary-search
widgetTitle: Find a value step by step
widgetDescription: Faded cells have been ruled out. Compare the binary-search count with a linear scan.
code:
  file: binary_search.py
  lang: python
  source: |-
    def binary_search(arr, target):
        low, high = 0, len(arr) - 1
        while low <= high:
            mid = (low + high) // 2
            if arr[mid] < target:
                low = mid + 1           # target is in the right half
            elif arr[mid] > target:
                high = mid - 1          # target is in the left half
            else:
                return mid
        return -1

    nums = [1, 3, 5, 7, 9, 11, 13]
    print(binary_search(nums, 9), binary_search(nums, 4))
  output: 4 -1
  description: Iterative binary search returning the index or -1.
  variants:
    - lang: javascript
      file: binary_search.js
      source: |-
        function binarySearch(arr, target) {
          let low = 0, high = arr.length - 1;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] < target) low = mid + 1;        // right half
            else if (arr[mid] > target) high = mid - 1;  // left half
            else return mid;
          }
          return -1;
        }

        const nums = [1, 3, 5, 7, 9, 11, 13];
        console.log(binarySearch(nums, 9), binarySearch(nums, 4));
      output: 4 -1
    - lang: cpp
      file: binary_search.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        int binarySearch(const vector<int>& arr, int target) {
            int low = 0, high = arr.size() - 1;
            while (low <= high) {
                int mid = low + (high - low) / 2;   // avoids overflow on huge arrays
                if (arr[mid] < target) low = mid + 1;
                else if (arr[mid] > target) high = mid - 1;
                else return mid;
            }
            return -1;
        }

        int main() {
            vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
            cout << binarySearch(nums, 9) << " " << binarySearch(nums, 4) << endl;
        }
      output: 4 -1
complexity:
  - op: Search a sorted array
    time: O(log n)
    space: O(1)
videos:
  - title: Binary search in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=fDKIpRe8GW4
  - title: What is binary search
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=j5uXyPJ0Pew
practice:
  - title: Binary Search
    url: https://leetcode.com/problems/binary-search/
    difficulty: easy
  - title: Search a 2D Matrix
    url: https://leetcode.com/problems/search-a-2d-matrix/
    difficulty: medium
reflectionPrompt: What goes wrong if you run binary search on an unsorted array?
---

Keep two pointers, `low` and `high`, around the part of the array that could still hold the target. Look at the middle element. If it is smaller than the target, everything to its left is too small, so move `low` past it. If it is bigger, move `high` before it. Stop when you find the target or when `low` passes `high`.

Each check halves the range, so even a million items need only about 20 checks: O(log n). The array **must be sorted**. Most bugs come from the loop condition (`low <= high`) and from forgetting the `+ 1` / `- 1` when moving the pointers.
