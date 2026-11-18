---
id: ologn
section: GROWTH PATTERNS
title: Logarithmic time
navTitle: Logarithmic · O(log n)
summary: Repeatedly halve the search
description: Each step removes a large part of the remaining search space.
goal: Binary search halves a sorted list after every comparison. Inspect a Python example and its time and space costs.
eyebrow: COMPLEXITY PATTERNS
widget: complexity
widgetData:
  label: O(log n)
  space: O(1)
  example: Binary search in a sorted list
  tip: The input should be ordered or otherwise structured to allow each reduction.
code:
  file: ologn.py
  lang: python
  source: |-
    def binary_search(values, target):
        low, high = 0, len(values) - 1
        while low <= high:
            mid = (low + high) // 2
            if values[mid] == target:
                return mid
            if values[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1

    print(binary_search([2, 4, 6, 8, 10], 8))
  output: "3"
  description: Binary search in a sorted list
  variants:
    - lang: javascript
      file: ologn.js
      source: |-
        function binarySearch(values, target) {
          let low = 0, high = values.length - 1;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (values[mid] === target) return mid;
            if (values[mid] < target) low = mid + 1;
            else high = mid - 1;
          }
          return -1;
        }

        console.log(binarySearch([2, 4, 6, 8, 10], 8));
      output: "3"
    - lang: cpp
      file: ologn.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        int binarySearch(const vector<int>& values, int target) {
            int low = 0, high = values.size() - 1;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (values[mid] == target) return mid;
                if (values[mid] < target) low = mid + 1;
                else high = mid - 1;
            }
            return -1;
        }

        int main() {
            cout << binarySearch({2, 4, 6, 8, 10}, 8) << endl;
        }
      output: "3"
cornellCues:
  - Define O(log n)
  - How does the work grow?
  - Give a familiar example of O(log n)
  - What changes as n increases?
  - What is the space cost?
cornellNotes:
  - label: Intuition
    text: Binary search halves a sorted list after every comparison.
  - label: Typical example
    text: Binary search in a sorted list
  - label: Analysis tip
    text: The input should be ordered or otherwise structured to allow each reduction.
  - label: Time · Space
    text: O(log n) · O(1)
cornellApply: Predict what happens to the work if n becomes 10 times larger.
order: 3
---
