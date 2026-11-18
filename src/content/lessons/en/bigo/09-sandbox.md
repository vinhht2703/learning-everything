---
id: sandbox
section: PRACTICE & REFERENCE
title: Step-by-step simulator
navTitle: Step simulator
summary: Watch algorithms work
description: Watch how different algorithms inspect data.
goal: Change the input size, then step through the operations to see how the work accumulates.
eyebrow: STEP-BY-STEP SIMULATION
widget: simulator
widgetTitle: Watch the work grow
widgetDescription: Pick an algorithm and step through the operations it performs.
cornellCues:
  - What does one step represent?
  - How does binary search reduce work?
  - Why is a single scan O(n)?
  - Why do nested loops often produce O(n²)?
  - What causes exponential growth?
cornellNotes:
  - label: Binary search · O(log n)
    text: compare the middle item, then discard half the remaining sorted range.
  - label: Linear scan · O(n)
    text: inspect items one at a time; the worst case checks every item.
  - label: Pairwise comparisons · O(n²)
    text: nested loops compare combinations of items; pairwise work can rise quadratically.
  - label: Branching search · O(2ⁿ)
    text: each level can create two choices, multiplying possible states.
cornellApply: Which algorithm would you choose for a large sorted list, and why?
order: 9
---

Step through algorithm operations and observe how inspected elements or states accumulate. Each highlighted cell or node represents a simulated operation/state. The displayed run is a learning visualization, not a benchmark.
