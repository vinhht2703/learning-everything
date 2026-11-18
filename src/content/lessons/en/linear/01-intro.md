---
id: intro
section: FOUNDATIONS
title: Linear algebra in AI
summary: Why models use vectors & matrices
description: Linear algebra is the language AI uses to represent data and apply learned transformations.
goal: Connect a real AI task to vectors, matrices, and the repeated transformation of data.
eyebrow: THE BIG IDEA
conceptTitle: From raw data to model-ready numbers
formula: data → vector x → matrix transform Wx + b → prediction
takeaways:
  - label: Vector
    text: An ordered list of numbers describing one example.
  - label: Matrix
    text: A rectangular grid of numbers that transforms vectors.
  - label: Model parameters
    text: Weights and biases learned from examples.
widget: shapes
widgetTitle: Choose a representation
widgetDescription: See how a different kind of AI input becomes a vector with a shape.
code:
  lang: python
  source: |-
    import numpy as np

    # [hours studied, practice tests, sleep]
    x = np.array([5.0, 3.0, 7.5])
    print(x.shape)
  output: (3,)
  description: A feature vector is just a one-dimensional numeric array; its length is the number of features.
order: 1
---

A model cannot directly process “a photo of a cat” or “a customer who may leave.” We encode useful properties as numbers. A row of pixel values, a sentence embedding, or a customer feature list becomes a vector. A model applies learned matrices to those vectors, layer by layer.
