---
id: insertion-sort
order: 10
section: SORTING
title: Insertion sort
summary: Grow a sorted prefix one item at a time
duration: 19 min
description: Insertion sort builds the sorted result one item at a time, sliding each new item left until it fits.
goal: Trace insertion sort by hand and explain why it is fast on nearly sorted data.
eyebrow: THE BIG IDEA
conceptTitle: Like sorting playing cards in your hand
formula: "worst: 1 + 2 + … + (n − 1) = n(n − 1)/2 → O(n²)"
takeaways:
  - label: Sorted prefix
    text: Everything left of the current item is already in order.
  - label: Stable
    text: Equal values never jump over each other.
  - label: Best on nearly sorted data
    text: Few swaps needed, close to O(n).
widget: sort-insertion
widgetTitle: Step through insertion sort
widgetDescription: Green bars are sorted. Watch each new bar slide left. Try Shuffle for new data.
code:
  file: insertion_sort.py
  lang: python
  source: |-
    def insertion_sort(arr):
        for i in range(1, len(arr)):
            j = i - 1
            # swap the new item left until it is in place
            while j >= 0 and arr[j + 1] < arr[j]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                j -= 1
        return arr

    print(insertion_sort([5, 2, 4, 1, 3]))
  output: "[1, 2, 3, 4, 5]"
  description: Swap the new item left until it is in place.
  variants:
    - lang: javascript
      file: insertion_sort.js
      source: |-
        function insertionSort(arr) {
          for (let i = 1; i < arr.length; i++) {
            let j = i - 1;
            // swap the new item left until it is in place
            while (j >= 0 && arr[j + 1] < arr[j]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              j--;
            }
          }
          return arr;
        }

        console.log(insertionSort([5, 2, 4, 1, 3]));
      output: "[ 1, 2, 3, 4, 5 ]"
    - lang: cpp
      file: insertion_sort.cpp
      source: |-
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        void insertionSort(vector<int>& arr) {
            for (int i = 1; i < (int)arr.size(); i++) {
                int j = i - 1;
                // swap the new item left until it is in place
                while (j >= 0 && arr[j + 1] < arr[j]) {
                    swap(arr[j], arr[j + 1]);
                    j--;
                }
            }
        }

        int main() {
            vector<int> arr = {5, 2, 4, 1, 3};
            insertionSort(arr);
            for (int x : arr) cout << x << " ";
            cout << endl;
        }
      output: 1 2 3 4 5
complexity:
  - op: Worst / average
    time: O(n²)
    space: O(1)
  - op: Best (already sorted)
    time: O(n)
    space: O(1)
videos:
  - title: Insertion sort in 2 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=JU767SDMDvA
  - title: Insertion sort algorithm
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=i-SKeOcBwko
practice:
  - title: Sort an Array
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Insertion Sort List
    url: https://leetcode.com/problems/insertion-sort-list/
    difficulty: medium
reflectionPrompt: Why does insertion sort do almost no work on an already sorted list?
---

The left part of the array is always sorted. Each round takes the next item and swaps it left while it is smaller than its neighbour. When it stops, the sorted part is one item longer.

In the worst case (reverse order) every item travels all the way left, so the work is O(n²). But if the data is already almost sorted, each item moves only a step or two and the run is close to O(n). Insertion sort is **stable** (equal items keep their order) and sorts **in place** with O(1) extra memory.
