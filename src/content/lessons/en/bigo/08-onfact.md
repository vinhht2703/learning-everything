---
id: onfact
section: GROWTH PATTERNS
title: Factorial time
navTitle: Factorial · O(n!)
summary: Try every possible ordering
description: The algorithm may try every possible ordering of the input.
goal: Generating every route through n stops creates n! permutations. Inspect a Python example and its time and space costs.
eyebrow: COMPLEXITY PATTERNS
widget: complexity
widgetData:
  label: O(n!)
  space: O(n · n!)
  example: Generate all orderings
  tip: Useful only for very small inputs unless the search can be pruned.
code:
  file: onfact.py
  lang: python
  source: |-
    from itertools import permutations
    routes = list(permutations(["A", "B", "C"]))
    print(len(routes))
  output: "6"
  description: Generate all orderings
  variants:
    - lang: javascript
      file: onfact.js
      source: |-
        function permutations(items) {
          if (items.length <= 1) return [items];
          const result = [];
          items.forEach((item, i) => {
            const rest = [...items.slice(0, i), ...items.slice(i + 1)];
            for (const p of permutations(rest)) result.push([item, ...p]);
          });
          return result;
        }

        const routes = permutations(["A", "B", "C"]);
        console.log(routes.length);
      output: "6"
    - lang: cpp
      file: onfact.cpp
      source: |-
        #include <algorithm>
        #include <iostream>
        #include <string>
        #include <vector>
        using namespace std;

        int main() {
            vector<string> stops = {"A", "B", "C"};  // must start sorted
            int routes = 0;
            do {
                routes++;
            } while (next_permutation(stops.begin(), stops.end()));
            cout << routes << endl;
        }
      output: "6"
cornellCues:
  - Define O(n!)
  - How does the work grow?
  - Give a familiar example of O(n!)
  - What changes as n increases?
  - What is the space cost?
cornellNotes:
  - label: Intuition
    text: Generating every route through n stops creates n! permutations.
  - label: Typical example
    text: Generate all orderings
  - label: Analysis tip
    text: Useful only for very small inputs unless the search can be pruned.
  - label: Time · Space
    text: O(n!) · O(n · n!)
cornellApply: Predict what happens to the work if n becomes 10 times larger.
order: 8
---
