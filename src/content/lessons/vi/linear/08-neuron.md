---
id: neuron
section: KẾT NỐI VỚI AI
title: Tạo nơ-ron AI đơn giản
summary: Đầu vào → tổng có trọng số → đầu ra
description: Nơ-ron kết hợp đặc trưng đầu vào với trọng số đã học, cộng độ lệch rồi áp dụng hàm kích hoạt.
goal: Điều chỉnh đầu vào và trọng số để xem nơ-ron ReLU đơn giản tạo ra đầu ra thế nào.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đại số tuyến tính bên trong một nơ-ron
formula: z = w · x + b   ;   ReLU(z) = max(0, z)
takeaways:
  - label: Lan truyền xuôi
    text: Đầu vào đi qua trọng số và độ lệch để tạo đầu ra.
  - label: Hàm kích hoạt
    text: Bổ sung tính phi tuyến để các lớp xếp chồng mô hình hóa mẫu phong phú hơn.
  - label: Huấn luyện
    text: Quá trình tối ưu điều chỉnh tham số để giảm sai số dự đoán.
widget: neuron
widgetTitle: Điều chỉnh nơ-ron ReLU hai đầu vào
widgetDescription: Điều chỉnh đầu vào, trọng số và độ lệch. Theo dõi tổng có trọng số qua ReLU.
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
  description: "Nơ-ron vô hướng này là lớp dense nhỏ nhất: một đầu ra, hai đặc trưng đầu vào và hàm kích hoạt ReLU."
order: 8
---

Một lớp nơ-ron dense tính z = Wx + b. Hàm kích hoạt như ReLU sau đó áp dụng hàm phi tuyến lên từng phần tử: ReLU(z) = max(0, z). Không có hàm kích hoạt phi tuyến, việc xếp chồng các phép biến đổi tuyến tính vẫn tương đương với một phép biến đổi tuyến tính. Mạng lặp lại mẫu này qua các lớp và học trọng số từ dữ liệu.
