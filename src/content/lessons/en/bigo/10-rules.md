---
id: rules
section: PRACTICE & REFERENCE
title: Complexity reference
navTitle: Rules & cheat sheet
summary: Compare common operations
description: Compare common time and space growth patterns.
goal: Use the filter and search to find a pattern, typical example, and memory cost.
eyebrow: QUICK REFERENCE
widget: rules
widgetTitle: Common complexity patterns
widgetDescription: Search the table or filter by time and space complexity.
widgetData:
  rules:
    - label: O(1)
      growth: Constant
      example: Array index lookup, hash-map lookup
      time: true
      space: Often O(1)
    - label: O(log n)
      growth: Logarithmic
      example: Binary search in a sorted list
      time: true
      space: Often O(1)
    - label: O(n)
      growth: Linear
      example: Scan a list, find a maximum
      time: true
      space: O(1) to O(n)
    - label: O(n log n)
      growth: Linearithmic
      example: Merge sort, comparison sorting
      time: true
      space: Often O(n)
    - label: O(n²)
      growth: Quadratic
      example: Compare every pair, bubble sort
      time: true
      space: Can be O(1)
    - label: O(2ⁿ)
      growth: Exponential
      example: Naive Fibonacci, subset search
      time: true
      space: Often O(n) stack
    - label: O(n!)
      growth: Factorial
      example: Generate every permutation
      time: true
      space: Can be O(n · n!)
    - label: O(n)
      growth: Linear memory
      example: Copy an input list
      time: false
      space: O(n)
    - label: O(n²)
      growth: Quadratic memory
      example: Allocate an n × n matrix
      time: false
      space: O(n²)
takeaways:
  - label: Drop constant factors
    text: O(3n) → O(n)
  - label: Keep the fastest-growing term
    text: O(n² + n) → O(n²)
  - label: Combine steps
    text: Sequential steps add; nested loops multiply.
cornellCues:
  - How do constants affect Big O?
  - How do you simplify a sum of growth terms?
  - When do loops multiply?
  - How does auxiliary space differ from time?
  - What are examples of common patterns?
cornellNotes:
  - label: Constants
    text: "Drop constant factors: O(3n) becomes O(n)."
  - label: Dominant term
    text: "Keep the fastest-growing term: O(n² + n) becomes O(n²)."
  - label: Loops
    text: Sequential steps add; nested loops multiply.
  - label: Space
    text: "Check space separately: a copied list uses O(n) extra space; a fixed number of variables is O(1)."
cornellApply: Simplify 5n² + 3n + 20 and explain which term dominates.
order: 10
---

Count the dominant work: one loop over n items is often O(n); nested loops over n items often multiply to O(n²); sequential sections add, then simplify by keeping the fastest-growing term.
