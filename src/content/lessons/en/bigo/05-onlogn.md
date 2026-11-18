---
id: onlogn
section: GROWTH PATTERNS
title: Linearithmic time
navTitle: Linearithmic · O(n log n)
summary: Common efficient sorting
description: The input is processed across a logarithmic number of levels.
goal: Efficient comparison sorts split the input, then combine results. Inspect a Python example and its time and space costs.
eyebrow: COMPLEXITY PATTERNS
widget: complexity
widgetData:
  label: O(n log n)
  space: O(n)
  example: Sort a list
  tip: This is a common target for general-purpose sorting.
code:
  file: onlogn.py
  lang: python
  source: |-
    names = ["Lee", "Ari", "Sam", "Jo"]
    print(sorted(names))
  output: "['Ari', 'Jo', 'Lee', 'Sam']"
  description: Sort a list
  variants:
    - lang: javascript
      file: onlogn.js
      source: |-
        const names = ["Lee", "Ari", "Sam", "Jo"];
        console.log([...names].sort());
      output: "[ 'Ari', 'Jo', 'Lee', 'Sam' ]"
    - lang: cpp
      file: onlogn.cpp
      source: |-
        #include <algorithm>
        #include <iostream>
        #include <string>
        #include <vector>
        using namespace std;

        int main() {
            vector<string> names = {"Lee", "Ari", "Sam", "Jo"};
            sort(names.begin(), names.end());  // O(n log n)
            for (const string& name : names) cout << name << " ";
            cout << endl;
        }
      output: Ari Jo Lee Sam
cornellCues:
  - Define O(n log n)
  - How does the work grow?
  - Give a familiar example of O(n log n)
  - What changes as n increases?
  - What is the space cost?
cornellNotes:
  - label: Intuition
    text: Efficient comparison sorts split the input, then combine results.
  - label: Typical example
    text: Sort a list
  - label: Analysis tip
    text: This is a common target for general-purpose sorting.
  - label: Time · Space
    text: O(n log n) · O(n)
cornellApply: Predict what happens to the work if n becomes 10 times larger.
order: 5
---
