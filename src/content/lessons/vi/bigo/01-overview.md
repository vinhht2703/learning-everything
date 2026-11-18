---
id: overview
section: BẮT ĐẦU
title: Ký hiệu Big O
navTitle: Tổng quan Big O
summary: Đọc mức tăng khi dữ liệu mở rộng
description: Hiểu chi phí thuật toán tăng thế nào khi đầu vào lớn dần.
goal: So sánh các tốc độ tăng trưởng phổ biến và tìm hiểu vì sao kích thước đầu vào quan trọng hơn tốc độ máy.
eyebrow: TỔNG QUAN MỨC TĂNG TRƯỞNG
widget: growth
widgetTitle: Điều gì xảy ra khi n tăng?
widgetDescription: Chọn kích thước đầu vào. Các đường cong cho thấy số phép toán có thể tăng như thế nào.
takeaways:
  - label: ĐỘ PHỨC TẠP THỜI GIAN
    text: Số bước tăng như thế nào khi đầu vào tăng.
  - label: ĐỘ PHỨC TẠP BỘ NHỚ
    text: Bộ nhớ bổ sung tăng như thế nào theo kích thước đầu vào.
  - label: BIG O
    text: Cách nhìn cận trên hữu ích về xu hướng tăng trưởng đó.
cornellCues:
  - n đại diện cho điều gì?
  - Độ phức tạp thời gian đo điều gì?
  - Độ phức tạp không gian đo điều gì?
  - Vì sao tập trung vào tốc độ tăng khi n lớn?
  - Big O đơn giản hóa điều gì?
cornellNotes:
  - label: O(1) · Hằng số
    text: Truy cập theo chỉ số mảng, tra cứu bảng băm
  - label: O(log n) · Logarit
    text: Tìm kiếm nhị phân trong danh sách đã sắp xếp
  - label: O(n) · Tuyến tính
    text: Duyệt danh sách, tìm giá trị lớn nhất
  - label: O(n log n) · Tuyến tính-logarit
    text: Sắp xếp trộn, sắp xếp so sánh
  - label: O(n²) · Bậc hai
    text: So sánh mọi cặp, sắp xếp nổi bọt
  - label: O(2ⁿ) · Hàm mũ
    text: Fibonacci đệ quy đơn giản, tìm kiếm tập con
  - label: O(n!) · Giai thừa
    text: Sinh mọi hoán vị
cornellApply: Thao tác nào trong chương trình có thể trở thành nút thắt khi đầu vào tăng?
order: 1
---

Big O mô tả mức sử dụng tài nguyên tăng như thế nào khi kích thước đầu vào n tăng; nó bỏ qua tốc độ máy và các hệ số hằng.

Khi n lớn, các đường tăng chậm hơn vẫn thực tế hơn. Biểu đồ so sánh xu hướng tương đối; các giá trị chỉ mang tính minh họa, không phải thời gian đo chính xác.
