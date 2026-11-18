---
id: eigen
section: CORE OPERATIONS
title: Eigenvectors, eigenvalues & PCA
navTitle: Eigenvectors & PCA
summary: Find important directions
description: Eigenvectors identify directions preserved by a transformation; PCA uses related ideas to find major variation directions.
goal: See an eigenvector keep its direction while its eigenvalue scales its length.
eyebrow: THE BIG IDEA
conceptTitle: Find the directions a transformation preserves
formula: Av = λv   ;   PCA projects data onto directions of greatest variance
takeaways:
  - label: Eigenvector v
    text: A non-zero direction unchanged by A, apart from scaling.
  - label: Eigenvalue λ
    text: The scale factor associated with that direction.
  - label: PCA
    text: A dimensionality-reduction method based on high-variance directions.
widget: eigen
widgetTitle: Test two eigen-directions
widgetDescription: For A = [[2, 1], [1, 2]], choose a direction and compare input with output.
code:
  lang: python
  source: |-
    import numpy as np
    A = np.array([[2.0, 1.0],
                  [1.0, 2.0]])
    values, vectors = np.linalg.eigh(A)
    print(values)
  output: "[1. 3.]"
  description: Eigen decomposition is defined for square matrices. PCA is commonly computed with SVD for numerical stability.
order: 7
---

For a square matrix A, an eigenvector v satisfies Av = λv. The output points along the same line as v; λ tells how much it is scaled (a negative value reverses direction). Principal component analysis finds orthogonal directions that explain as much data variance as possible, often reducing many features to a smaller set.
