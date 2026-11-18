---
id: quiz
section: PRACTICE & REFERENCE
title: Code complexity quiz
navTitle: Code quiz
summary: Estimate time and space
description: Estimate time and space complexity from short code samples.
goal: Choose the growth rate that best describes each example.
eyebrow: CHECK YOUR UNDERSTANDING
widget: quiz
widgetTitle: Read the code. Estimate the growth.
widgetDescription: Focus on how the operation count changes as n increases.
widgetData:
  questions:
    - topic: ARRAY SCAN
      question: What is the time complexity of this function?
      code: |-
        for item in values:
            if item == target:
                return True
      options:
        - O(1)
        - O(log n)
        - O(n)
        - O(n²)
      answer: 2
      explanation: In the worst case it checks every item once, so the work grows linearly with n.
    - topic: BINARY SEARCH
      question: A sorted list is halved after every comparison. What is the time complexity?
      code: |-
        while low <= high:
            mid = (low + high) // 2
            # keep one half
      options:
        - O(1)
        - O(log n)
        - O(n)
        - O(n log n)
      answer: 1
      explanation: Repeatedly halving the remaining input takes about log₂(n) steps.
    - topic: NESTED LOOPS
      question: How does this pair of loops scale?
      code: |-
        for left in values:
            for right in values:
                compare(left, right)
      options:
        - O(log n)
        - O(n)
        - O(n²)
        - O(2ⁿ)
      answer: 2
      explanation: "Each of n outer iterations runs n inner iterations: n × n = n²."
    - topic: AUXILIARY SPACE
      question: What extra space does copying n items require?
      code: |-
        copy = []
        for item in values:
            copy.append(item)
      options:
        - O(1)
        - O(log n)
        - O(n)
        - O(n²)
      answer: 2
      explanation: The new list stores one additional item for each input item, so extra memory grows as O(n).
    - topic: RECURSION
      question: This function explores two recursive branches at each level. What is its time complexity?
      code: |-
        def solve(n):
            if n <= 1: return 1
            return solve(n - 1) + solve(n - 1)
      options:
        - O(n)
        - O(n²)
        - O(2ⁿ)
        - O(n!)
      answer: 2
      explanation: The number of calls roughly doubles with each additional level, producing exponential growth.
    - topic: SORTING
      question: A merge sort splits a list, sorts both halves, then merges them. What is its typical time complexity?
      code: |-
        sort(left_half)
        sort(right_half)
        merge(left_half, right_half)
      options:
        - O(log n)
        - O(n)
        - O(n log n)
        - O(n²)
      answer: 2
      explanation: There are about log n levels of splitting, with O(n) work to merge at each level.
    - topic: SIMPLIFICATION
      question: What is the simplified Big O for 4n² + 7n + 12?
      code: |-
        # Keep the fastest-growing term
        4*n**2 + 7*n + 12
      options:
        - O(1)
        - O(n)
        - O(n²)
        - O(n³)
      answer: 2
      explanation: Big O drops constant factors and lower-order terms, leaving O(n²).
    - topic: PERMUTATIONS
      question: An algorithm tries every ordering of n distinct items. What is the number of orderings?
      code: |-
        for order in permutations(items):
            check(order)
      options:
        - O(n)
        - O(n²)
        - O(2ⁿ)
        - O(n!)
      answer: 3
      explanation: There are n! distinct permutations of n items, so enumerating them has factorial growth.
cornellCues:
  - How do you find the dominant operation?
  - When is a scan O(n)?
  - What makes binary search logarithmic?
  - How do you analyze nested loops?
  - How do recursion branches affect growth?
  - Why drop lower-order terms?
cornellNotes:
  - label: "ARRAY SCAN: O(n)"
    text: In the worst case it checks every item once, so the work grows linearly with n.
  - label: "BINARY SEARCH: O(log n)"
    text: Repeatedly halving the remaining input takes about log₂(n) steps.
  - label: "NESTED LOOPS: O(n²)"
    text: "Each of n outer iterations runs n inner iterations: n × n = n²."
  - label: "AUXILIARY SPACE: O(n)"
    text: The new list stores one additional item for each input item, so extra memory grows as O(n).
  - label: "RECURSION: O(2ⁿ)"
    text: The number of calls roughly doubles with each additional level, producing exponential growth.
  - label: "SORTING: O(n log n)"
    text: There are about log n levels of splitting, with O(n) work to merge at each level.
  - label: "SIMPLIFICATION: O(n²)"
    text: Big O drops constant factors and lower-order terms, leaving O(n²).
  - label: "PERMUTATIONS: O(n!)"
    text: There are n! distinct permutations of n items, so enumerating them has factorial growth.
cornellApply: Choose one answer you found difficult and write the reasoning in your own words.
order: 11
---

How to analyze: identify repeated work, determine how often it runs as n changes, then simplify to the fastest-growing term. Consider extra memory separately.
