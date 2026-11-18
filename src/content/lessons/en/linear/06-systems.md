---
id: systems
section: CORE OPERATIONS
title: Systems & least squares
summary: Solve and fit with data
description: Linear systems describe constraints; least squares finds parameters that best fit noisy data.
goal: Interpret a small system of equations and connect line fitting to minimizing prediction errors.
eyebrow: THE BIG IDEA
conceptTitle: Solve constraints or fit the closest line
formula: "Ax = b   ;   least squares: minimize ||Xw − y||₂²"
takeaways:
  - label: Exact system
    text: Solve all equations simultaneously when an exact solution exists.
  - label: Residual
    text: Observed value minus predicted value.
  - label: Least squares
    text: Choose parameters that minimize total squared residual error.
widget: system
widgetTitle: Solve a tiny system step by step
widgetDescription: Follow elimination for 2x + y = 5 and x − y = 1.
code:
  lang: python
  source: |-
    import numpy as np
    X = np.array([[1, 1],
                  [1, 2],
                  [1, 3]])
    y = np.array([2, 3, 5])
    w, *_ = np.linalg.lstsq(X, y, rcond=None)
    print(np.round(w, 2))
  output: "[0.33 1.5 ]"
  description: For a real overdetermined dataset, least squares estimates the best-fitting parameters.
order: 6
---

A system Ax = b asks for values that satisfy several linear equations at once. Some systems have one exact solution, many solutions, or none. Real data is noisy, so a line may not pass through every point. Least squares chooses parameters that minimize the sum of squared residuals, the vertical differences between observations and predictions.
