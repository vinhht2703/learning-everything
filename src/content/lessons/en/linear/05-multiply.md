---
id: multiply
section: CORE OPERATIONS
title: Matrix multiplication & composition
navTitle: Matrix multiplication
summary: Compose transformations
description: Matrix multiplication combines transformations, and the order matters.
goal: Track compatible shapes and understand why applying A then B is generally different from B then A.
eyebrow: THE BIG IDEA
conceptTitle: Chain layers by matching shapes
formula: (m × k) @ (k × n) → (m × n)   ;   A(Bx) = (AB)x
takeaways:
  - label: Inner dimensions
    text: Must match for multiplication to be defined.
  - label: Outer dimensions
    text: Become the result shape.
  - label: Order matters
    text: The rightmost transformation acts on x first.
widget: compose
widgetTitle: Compare two transformation orders
widgetDescription: The selected matrices use different scaling; switching the order changes the result.
code:
  lang: python
  source: |-
    import numpy as np
    A = np.array([[2, 0],
                  [0, 1]])
    B = np.array([[1, 1],
                  [0, 1]])
    x = np.array([1, 2])
    print(A @ (B @ x))
  output: "[6 2]"
  description: The @ operator composes matrices. Parentheses make the order of application clear.
order: 5
---

For A @ B, the inside dimensions must match. If A is (m, k) and B is (k, n), the result is (m, n). Matrix multiplication is associative but generally not commutative: A @ B is usually not B @ A. In a neural network, each layer maps one representation to the next, so dimensions must line up.
