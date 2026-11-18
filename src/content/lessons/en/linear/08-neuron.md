---
id: neuron
section: CONNECT TO AI
title: Build a tiny AI neuron
summary: Inputs → weighted sum → output
description: A neuron combines input features with learned weights, adds a bias, then applies an activation.
goal: Adjust inputs and weights to see how a simple ReLU neuron produces an output.
eyebrow: THE BIG IDEA
conceptTitle: The linear algebra inside one neuron
formula: z = w · x + b   ;   ReLU(z) = max(0, z)
takeaways:
  - label: Forward pass
    text: Inputs flow through weights and biases to produce outputs.
  - label: Activation
    text: Adds non-linearity so stacked layers can model richer patterns.
  - label: Training
    text: Optimization adjusts parameters to reduce prediction error.
widget: neuron
widgetTitle: Tune a two-input ReLU neuron
widgetDescription: Adjust inputs, weights, and bias. Follow the weighted sum through ReLU.
code:
  lang: python
  source: |-
    import numpy as np
    x = np.array([2.0, 1.0])
    w = np.array([0.5, -0.2])
    b = 0.1
    z = w @ x + b
    y = max(0, z)
    print(z, y)
  output: 0.9 0.9
  description: "This scalar neuron is the smallest dense layer: one output, two input features, and a ReLU activation."
order: 8
---

A dense neural layer computes z = Wx + b. An activation such as ReLU then applies a non-linear function element by element: ReLU(z) = max(0, z). Without a non-linear activation, stacking linear transformations would still be equivalent to one linear transformation. A network repeats this pattern across layers and learns its weights from data.
