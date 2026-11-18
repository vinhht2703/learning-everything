---
id: rules
section: THỰC HÀNH VÀ TRA CỨU
title: Bảng tra cứu độ phức tạp
navTitle: Quy tắc và bảng ghi nhớ
summary: So sánh các thao tác phổ biến
description: So sánh các mẫu tăng trưởng thời gian và bộ nhớ phổ biến.
goal: Dùng bộ lọc và tìm kiếm để tìm một mẫu, ví dụ điển hình và chi phí bộ nhớ.
eyebrow: TRA CỨU NHANH
widget: rules
widgetTitle: Các dạng độ phức tạp phổ biến
widgetDescription: Tìm trong bảng hoặc lọc theo độ phức tạp thời gian và bộ nhớ.
widgetData:
  rules:
    - label: O(1)
      growth: Hằng số
      example: Truy cập theo chỉ số mảng, tra cứu bảng băm
      time: true
      space: Thường là O(1)
    - label: O(log n)
      growth: Logarit
      example: Tìm kiếm nhị phân trong danh sách đã sắp xếp
      time: true
      space: Thường là O(1)
    - label: O(n)
      growth: Tuyến tính
      example: Duyệt danh sách, tìm giá trị lớn nhất
      time: true
      space: Từ O(1) đến O(n)
    - label: O(n log n)
      growth: Tuyến tính-logarit
      example: Sắp xếp trộn, sắp xếp so sánh
      time: true
      space: Thường là O(n)
    - label: O(n²)
      growth: Bậc hai
      example: So sánh mọi cặp, sắp xếp nổi bọt
      time: true
      space: Có thể là O(1)
    - label: O(2ⁿ)
      growth: Hàm mũ
      example: Fibonacci đệ quy đơn giản, tìm kiếm tập con
      time: true
      space: Thường là O(n) ngăn xếp
    - label: O(n!)
      growth: Giai thừa
      example: Sinh mọi hoán vị
      time: true
      space: Có thể là O(n · n!)
    - label: O(n)
      growth: Bộ nhớ tuyến tính
      example: Sao chép danh sách đầu vào
      time: false
      space: O(n)
    - label: O(n²)
      growth: Bộ nhớ bậc hai
      example: Cấp phát ma trận n × n
      time: false
      space: O(n²)
takeaways:
  - label: Bỏ hệ số hằng
    text: O(3n) → O(n)
  - label: Giữ số hạng tăng nhanh nhất
    text: O(n² + n) → O(n²)
  - label: Kết hợp các bước
    text: Các bước tuần tự thì cộng; vòng lặp lồng nhau thì nhân.
cornellCues:
  - Hằng số ảnh hưởng đến Big O như thế nào?
  - Làm sao rút gọn tổng các số hạng tăng trưởng?
  - Khi nào các vòng lặp nhân với nhau?
  - Bộ nhớ phụ khác thời gian như thế nào?
  - Các ví dụ về mẫu phổ biến là gì?
cornellNotes:
  - label: Hằng số
    text: "Bỏ hệ số hằng: O(3n) trở thành O(n)."
  - label: Số hạng chi phối
    text: "Giữ số hạng tăng nhanh nhất: O(n² + n) trở thành O(n²)."
  - label: Vòng lặp
    text: Các bước tuần tự thì cộng; vòng lặp lồng nhau thì nhân.
  - label: Bộ nhớ
    text: "Xét bộ nhớ riêng: danh sách sao chép dùng thêm O(n) bộ nhớ; một số lượng biến cố định là O(1)."
cornellApply: Rút gọn 5n² + 3n + 20 và giải thích số hạng nào chi phối.
order: 10
---

Đếm phần việc chi phối: một vòng lặp qua n phần tử thường là O(n); các vòng lặp lồng nhau qua n phần tử thường nhân thành O(n²); các đoạn tuần tự thì cộng lại, rồi rút gọn bằng cách giữ số hạng tăng nhanh nhất.
