---
id: sandbox
section: THỰC HÀNH VÀ TRA CỨU
title: Mô phỏng từng bước
navTitle: Mô phỏng từng bước
summary: Quan sát thuật toán hoạt động
description: Quan sát cách các thuật toán khác nhau kiểm tra dữ liệu.
goal: Thay đổi kích thước đầu vào, sau đó chạy từng bước để thấy khối lượng công việc tích lũy ra sao.
eyebrow: MÔ PHỎNG TỪNG BƯỚC
widget: simulator
widgetTitle: Quan sát khối lượng công việc tăng
widgetDescription: Chọn thuật toán rồi lần lượt xem các phép toán nó thực hiện.
cornellCues:
  - Một bước đại diện cho điều gì?
  - Tìm kiếm nhị phân giảm khối lượng công việc như thế nào?
  - Vì sao một lần duyệt là O(n)?
  - Vì sao vòng lặp lồng nhau thường cho O(n²)?
  - Điều gì gây ra tăng trưởng hàm mũ?
cornellNotes:
  - label: Tìm kiếm nhị phân · O(log n)
    text: so sánh phần tử ở giữa, rồi loại bỏ một nửa khoảng đã sắp xếp còn lại.
  - label: Duyệt tuyến tính · O(n)
    text: kiểm tra từng phần tử một; trường hợp xấu nhất phải kiểm tra mọi phần tử.
  - label: So sánh từng cặp · O(n²)
    text: vòng lặp lồng nhau so sánh các tổ hợp phần tử; công việc theo cặp có thể tăng theo bậc hai.
  - label: Tìm kiếm phân nhánh · O(2ⁿ)
    text: mỗi tầng có thể tạo hai lựa chọn, nhân số trạng thái có thể có.
cornellApply: Bạn sẽ chọn thuật toán nào cho một danh sách lớn đã sắp xếp, và vì sao?
order: 9
---

Chạy từng bước các thao tác của thuật toán và quan sát số phần tử hoặc trạng thái được kiểm tra tích lũy ra sao. Mỗi ô hoặc nút được tô sáng đại diện cho một thao tác/trạng thái mô phỏng. Lượt chạy hiển thị là minh họa để học, không phải phép đo hiệu năng.
