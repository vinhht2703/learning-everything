---
id: matrices
section: CORE OPERATIONS
title: Matrices & linear layers
summary: Transform many features at once
description: A matrix applies a collection of weighted sums, mapping an input vector to a new representation.
goal: Read matrix dimensions and see how each row creates one output feature.
eyebrow: THE BIG IDEA
conceptTitle: One matrix, many dot products
formula: W ∈ ℝᵐˣⁿ, x ∈ ℝⁿ  ⇒  Wx ∈ ℝᵐ   ;   y = Wx + b
takeaways:
  - label: Rows
    text: One weighted combination per output feature.
  - label: Shape rule
    text: The matrix columns must match the input vector length.
  - label: Dense layer
    text: A learned matrix and bias transform one representation into another.
widget: transform
widgetTitle: Transform a vector with a 2 × 2 matrix
widgetDescription: Change the four matrix entries and see how the input vector is transformed.
code:
  lang: python
  source: |-
    import numpy as np
    W = np.array([[2.0, 1.0],
                  [0.0, 1.0]])
    x = np.array([1.0, 2.0])
    y = W @ x
    print(y)
  output: "[4. 2.]"
  description: A matrix-vector multiplication applies a learned linear transformation to the input.
order: 4
---

Each row of a weight matrix contains the weights for one output. Multiplying W by x computes a dot product for every row at once. If W has shape (m, n), it maps an n-feature input to an m-feature output. A neural network’s dense layer uses exactly this pattern, followed by a bias and often an activation function.
