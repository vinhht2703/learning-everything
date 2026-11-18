---
id: vectors
section: FOUNDATIONS
title: Scalars & vectors
summary: Represent features as coordinates
description: Scalars hold one value; vectors hold ordered values such as the features for one model input.
goal: Read vector coordinates, describe their dimensions, and see how changing a feature moves the point.
eyebrow: THE BIG IDEA
conceptTitle: A vector is a point and a direction
formula: x = [x₁, x₂, …, xₙ]   ·   ||x||₂ = √(x₁² + x₂² + … + xₙ²)
takeaways:
  - label: Order matters
    text: Keep a consistent feature order between training and prediction.
  - label: Dimension
    text: A vector with n entries lives in n-dimensional space.
  - label: Magnitude
    text: The norm measures vector length; it can help compare scale.
widget: vector
widgetTitle: Move a two-feature example
widgetDescription: Change the two feature values and watch the vector endpoint move.
code:
  lang: python
  source: |-
    import numpy as np
    x = np.array([3.0, 2.0])
    length = np.linalg.norm(x)
    print(x.shape, round(length, 2))
  output: (2,) 3.61
  description: NumPy stores vectors as arrays and provides common operations such as shape and norm.
order: 2
---

A scalar is a single number. A vector is an ordered list, so [5, 3, 7.5] is different from [3, 5, 7.5]. In machine learning, each position has a defined meaning: feature 1 might be study hours, feature 2 practice tests, feature 3 sleep. The vector dimension must match the model’s expected input.
