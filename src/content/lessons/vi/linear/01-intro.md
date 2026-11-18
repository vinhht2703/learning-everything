---
id: intro
section: NỀN TẢNG
title: Đại số tuyến tính trong AI
summary: Vì sao mô hình dùng vectơ và ma trận
description: Đại số tuyến tính là ngôn ngữ AI dùng để biểu diễn dữ liệu và áp dụng các phép biến đổi đã học.
goal: Liên hệ một tác vụ AI thực tế với vectơ, ma trận và các phép biến đổi dữ liệu lặp lại.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Từ dữ liệu thô đến các con số cho mô hình
formula: dữ liệu → vectơ x → biến đổi ma trận Wx + b → dự đoán
takeaways:
  - label: Vectơ
    text: Danh sách có thứ tự gồm các số mô tả một ví dụ.
  - label: Ma trận
    text: Lưới số hình chữ nhật dùng để biến đổi vectơ.
  - label: Tham số mô hình
    text: Trọng số và độ lệch được học từ ví dụ.
widget: shapes
widgetTitle: Chọn cách biểu diễn
widgetDescription: Xem các loại dữ liệu đầu vào AI khác nhau được biểu diễn thành vectơ với kích thước cụ thể.
code:
  lang: python
  source: |-
    import numpy as np

    # [hours studied, practice tests, sleep]
    x = np.array([5.0, 3.0, 7.5])
    print(x.shape)
  output: (3,)
  description: Vectơ đặc trưng chỉ là một mảng số một chiều; độ dài của nó là số lượng đặc trưng.
order: 1
---

Mô hình không thể trực tiếp xử lý “ảnh một con mèo” hay “khách hàng có thể rời đi”. Ta mã hóa các thuộc tính hữu ích thành số. Một hàng giá trị điểm ảnh, vectơ nhúng của câu hoặc danh sách đặc trưng khách hàng trở thành vectơ. Mô hình áp dụng các ma trận đã học lên những vectơ này qua từng lớp.
