---
id: eigen
section: PHÉP TOÁN CỐT LÕI
title: Vectơ riêng, trị riêng và PCA
navTitle: Vectơ riêng và PCA
summary: Tìm các hướng quan trọng
description: Vectơ riêng xác định các hướng được phép biến đổi giữ nguyên; PCA dùng ý tưởng tương tự để tìm các hướng biến thiên chính.
goal: Quan sát vectơ riêng giữ nguyên hướng trong khi giá trị riêng co giãn độ dài của nó.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Tìm các hướng được phép biến đổi giữ nguyên
formula: Av = λv   ;   PCA chiếu dữ liệu lên các hướng có phương sai lớn nhất
takeaways:
  - label: Vectơ riêng v
    text: Hướng khác không được A giữ nguyên, ngoại trừ hệ số co giãn.
  - label: Giá trị riêng λ
    text: Hệ số co giãn tương ứng với hướng đó.
  - label: PCA
    text: Phương pháp giảm số chiều dựa trên các hướng có phương sai cao.
widget: eigen
widgetTitle: Thử hai hướng riêng
widgetDescription: Với A = [[2, 1], [1, 2]], chọn hướng rồi so sánh đầu vào và đầu ra.
code:
  lang: python
  source: |-
    import numpy as np
    A = np.array([[2.0, 1.0],
                  [1.0, 2.0]])
    values, vectors = np.linalg.eigh(A)
    print(values)
  output: "[1. 3.]"
  description: Phân rã riêng được định nghĩa cho ma trận vuông. PCA thường được tính bằng SVD để ổn định số tốt hơn.
order: 7
---

Với ma trận vuông A, vectơ riêng v thỏa Av = λv. Đầu ra nằm trên cùng đường thẳng với v; λ cho biết mức co giãn (giá trị âm đảo hướng). Phân tích thành phần chính tìm các hướng trực giao giải thích nhiều biến thiên dữ liệu nhất, thường giúp giảm nhiều đặc trưng xuống một tập nhỏ hơn.
