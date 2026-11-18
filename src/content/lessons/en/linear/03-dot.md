---
id: dot
section: FOUNDATIONS
title: Dot product & weights
summary: Combine signals into a score
description: A dot product multiplies corresponding values and adds them, producing a weighted score.
goal: Calculate a weighted sum and understand how a simple model combines input features.
eyebrow: THE BIG IDEA
conceptTitle: A weighted score from many signals
formula: w · x = w₁x₁ + w₂x₂ + … + wₙxₙ   ;   score = w · x + b
takeaways:
  - label: Feature xᵢ
    text: One numeric input, such as number of practice tests.
  - label: Weight wᵢ
    text: How strongly the model uses that feature.
  - label: Bias b
    text: A learned offset added to every weighted score.
widget: dot
widgetTitle: Explore a weighted prediction score
widgetDescription: Adjust the features and learned weights. The live score is their dot product plus a bias.
code:
  lang: python
  source: |-
    import numpy as np
    x = np.array([5.0, 3.0])
    w = np.array([0.4, 1.2])
    b = -1.0
    score = w @ x + b
    print(score)
  output: "4.6"
  description: The @ operator computes a dot product for one-dimensional NumPy arrays.
order: 3
---

A linear model gives each feature a weight. Multiply each feature by its weight, then add the products. A large positive weight increases the score when its feature is high; a negative weight decreases it. A bias shifts the score. This weighted sum is the core calculation inside a linear model and a neuron.
