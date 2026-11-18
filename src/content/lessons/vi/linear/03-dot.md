---
id: dot
section: NỀN TẢNG
title: Tích vô hướng và trọng số
summary: Kết hợp tín hiệu thành điểm số
description: Tích vô hướng nhân các giá trị tương ứng rồi cộng lại để tạo điểm số có trọng số.
goal: Tính tổng có trọng số và hiểu mô hình đơn giản kết hợp các đặc trưng đầu vào như thế nào.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Điểm có trọng số từ nhiều tín hiệu
formula: w · x = w₁x₁ + w₂x₂ + … + wₙxₙ   ;   score = w · x + b
takeaways:
  - label: Đặc trưng xᵢ
    text: Một đầu vào dạng số, chẳng hạn số bài kiểm tra đã luyện.
  - label: Trọng số wᵢ
    text: Mức độ mô hình sử dụng đặc trưng đó.
  - label: Độ lệch b
    text: Độ lệch đã học được cộng vào mỗi điểm có trọng số.
widget: dot
widgetTitle: Khám phá điểm dự đoán có trọng số
widgetDescription: Điều chỉnh đặc trưng và trọng số đã học. Điểm số trực tiếp là tích vô hướng cộng độ lệch.
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
  description: Toán tử @ tính tích vô hướng cho các mảng NumPy một chiều.
order: 3
---

Mô hình tuyến tính gán một trọng số cho mỗi đặc trưng. Nhân từng đặc trưng với trọng số tương ứng rồi cộng các tích. Trọng số dương lớn làm tăng điểm khi đặc trưng cao; trọng số âm làm giảm điểm. Độ lệch dịch chuyển điểm số. Tổng có trọng số này là phép tính cốt lõi của mô hình tuyến tính và nơ-ron.
