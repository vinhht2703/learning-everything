---
id: matrices
section: PHÉP TOÁN CỐT LÕI
title: Ma trận và lớp tuyến tính
summary: Biến đổi nhiều đặc trưng cùng lúc
description: Ma trận áp dụng nhiều tổng có trọng số để ánh xạ vectơ đầu vào sang biểu diễn mới.
goal: Đọc kích thước ma trận và xem mỗi hàng tạo ra một đặc trưng đầu ra.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Một ma trận, nhiều tích vô hướng
formula: W ∈ ℝᵐˣⁿ, x ∈ ℝⁿ  ⇒  Wx ∈ ℝᵐ   ;   y = Wx + b
takeaways:
  - label: Các hàng
    text: Một tổ hợp có trọng số cho mỗi đặc trưng đầu ra.
  - label: Quy tắc kích thước
    text: Số cột của ma trận phải khớp với độ dài vectơ đầu vào.
  - label: Lớp dense
    text: Ma trận và độ lệch đã học biến đổi biểu diễn này thành biểu diễn khác.
widget: transform
widgetTitle: Biến đổi vectơ bằng ma trận 2 × 2
widgetDescription: Thay đổi bốn phần tử ma trận và xem vectơ đầu vào được biến đổi ra sao.
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
  description: Phép nhân ma trận-vectơ áp dụng phép biến đổi tuyến tính đã học lên đầu vào.
order: 4
---

Mỗi hàng của ma trận trọng số chứa trọng số cho một đầu ra. Nhân W với x tính tích vô hướng cho mọi hàng cùng lúc. Nếu W có kích thước (m, n), nó ánh xạ đầu vào n đặc trưng thành đầu ra m đặc trưng. Lớp dense trong mạng nơ-ron dùng đúng mẫu này, sau đó cộng độ lệch và thường áp dụng hàm kích hoạt.
