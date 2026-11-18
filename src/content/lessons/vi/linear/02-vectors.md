---
id: vectors
section: NỀN TẢNG
title: Vô hướng và vectơ
summary: Biểu diễn đặc trưng bằng tọa độ
description: Vô hướng chứa một giá trị; vectơ chứa các giá trị có thứ tự như đặc trưng đầu vào của mô hình.
goal: Đọc tọa độ vectơ, mô tả số chiều và quan sát đặc trưng làm điểm di chuyển ra sao.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Vectơ biểu diễn điểm và hướng
formula: x = [x₁, x₂, …, xₙ]   ·   ||x||₂ = √(x₁² + x₂² + … + xₙ²)
takeaways:
  - label: Thứ tự rất quan trọng
    text: Giữ thứ tự đặc trưng nhất quán giữa lúc huấn luyện và dự đoán.
  - label: Số chiều
    text: Vectơ có n phần tử nằm trong không gian n chiều.
  - label: Độ lớn
    text: Chuẩn đo độ dài vectơ và có thể giúp so sánh quy mô.
widget: vector
widgetTitle: Di chuyển ví dụ có hai đặc trưng
widgetDescription: Thay đổi hai đặc trưng và quan sát đầu mút vectơ di chuyển.
code:
  lang: python
  source: |-
    import numpy as np
    x = np.array([3.0, 2.0])
    length = np.linalg.norm(x)
    print(x.shape, round(length, 2))
  output: (2,) 3.61
  description: NumPy lưu vectơ dưới dạng mảng và cung cấp các phép toán như kích thước và chuẩn.
order: 2
---

Vô hướng là một số đơn lẻ. Vectơ là danh sách có thứ tự, vì vậy [5, 3, 7.5] khác với [3, 5, 7.5]. Trong học máy, mỗi vị trí có ý nghĩa xác định: đặc trưng 1 có thể là giờ học, đặc trưng 2 là số bài kiểm tra, đặc trưng 3 là thời lượng ngủ. Số chiều của vectơ phải khớp với đầu vào mà mô hình yêu cầu.
