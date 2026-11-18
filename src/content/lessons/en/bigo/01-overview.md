---
id: overview
section: GETTING STARTED
title: Big O notation
navTitle: Big O overview
summary: Read growth as input scales
description: Understand how algorithm cost grows as your input gets larger.
goal: Compare common growth rates and see why input size matters more than machine speed.
eyebrow: GROWTH AT A GLANCE
widget: growth
widgetTitle: What happens as n grows?
widgetDescription: Choose an input size. The curves show how the number of operations can scale.
takeaways:
  - label: TIME COMPLEXITY
    text: How the number of steps grows as input grows.
  - label: SPACE COMPLEXITY
    text: How extra memory use grows with input size.
  - label: BIG O
    text: A useful upper-bound view of that growth trend.
cornellCues:
  - What does n represent?
  - What does time complexity measure?
  - What does space complexity measure?
  - Why focus on growth as n becomes large?
  - What does Big O simplify?
cornellNotes:
  - label: O(1) · Constant
    text: Array index lookup, hash-map lookup
  - label: O(log n) · Logarithmic
    text: Binary search in a sorted list
  - label: O(n) · Linear
    text: Scan a list, find a maximum
  - label: O(n log n) · Linearithmic
    text: Merge sort, comparison sorting
  - label: O(n²) · Quadratic
    text: Compare every pair, bubble sort
  - label: O(2ⁿ) · Exponential
    text: Naive Fibonacci, subset search
  - label: O(n!) · Factorial
    text: Generate every permutation
cornellApply: Which operation in a program might become the bottleneck as its input grows?
order: 1
---

Big O describes how resource use grows as input size n grows; it abstracts away machine speed and constant factors.

When n gets large, slower-growing curves remain more practical. The chart compares the relative trends; its values are illustrative rather than exact timings.
