---
id: multiply
section: PHÉP TOÁN CỐT LÕI
title: Nhân ma trận và phép hợp
navTitle: Phép nhân ma trận
summary: Kết hợp phép biến đổi
description: Phép nhân ma trận kết hợp các phép biến đổi và thứ tự rất quan trọng.
goal: Theo dõi kích thước tương thích và hiểu vì sao áp dụng A rồi B thường khác B rồi A.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Nối các lớp bằng cách khớp kích thước
formula: (m × k) @ (k × n) → (m × n)   ;   A(Bx) = (AB)x
takeaways:
  - label: Kích thước bên trong
    text: Phải khớp thì phép nhân mới xác định.
  - label: Kích thước bên ngoài
    text: Trở thành kích thước của kết quả.
  - label: Thứ tự rất quan trọng
    text: Phép biến đổi ngoài cùng bên phải tác động lên x trước.
widget: compose
widgetTitle: So sánh hai thứ tự biến đổi
widgetDescription: Các ma trận được chọn co giãn khác nhau; đổi thứ tự sẽ làm thay đổi kết quả.
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
  description: Toán tử @ kết hợp các ma trận. Dấu ngoặc làm rõ thứ tự áp dụng.
order: 5
---

Với A @ B, hai kích thước bên trong phải khớp. Nếu A có kích thước (m, k) và B là (k, n), kết quả là (m, n). Phép nhân ma trận có tính kết hợp nhưng thường không giao hoán: A @ B thường khác B @ A. Trong mạng nơ-ron, mỗi lớp ánh xạ một biểu diễn sang biểu diễn kế tiếp nên kích thước phải tương thích.
