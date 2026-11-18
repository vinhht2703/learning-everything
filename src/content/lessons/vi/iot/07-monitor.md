---
id: monitor
section: XÂY DỰNG VÀ BẢO MẬT
title: Giám sát phòng thông minh
summary: Mô phỏng dữ liệu đo từ cảm biến
description: Một bảng điều khiển tốt bổ sung ngữ cảnh cho dữ liệu cảm biến và làm nổi bật các tình trạng cần chú ý.
goal: Diễn giải dữ liệu đo với đơn vị, dấu thời gian, danh tính thiết bị và ngưỡng.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Biến giá trị đo thành tín hiệu dễ hiểu
formula: GIÁ TRỊ + ĐƠN VỊ + THỜI GIAN + THIẾT BỊ → NGỮ CẢNH
takeaways:
  - label: Dữ liệu đo từ xa
    text: Quan sát có dấu thời gian từ một thiết bị.
  - label: Lấy mẫu
    text: Chọn tần suất phù hợp với mục đích sử dụng.
  - label: Cảnh báo
    text: Thông báo cho người dùng khi có thể cần hành động.
widget: monitor
widgetTitle: Mô phỏng cảm biến phòng
widgetDescription: Kéo thanh nhiệt độ để cập nhật trạng thái và dữ liệu gửi đi.
code:
  lang: python
  source: 'payload = {"device": "room-01", "temperature_c": 24.8}'
  output: room-01 · 24.8 °C · comfortable
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: Giá trị đo và cảnh báo nào sẽ giúp ai đó ra quyết định?
order: 7
---

Dữ liệu đo từ xa là một quan sát hoặc trạng thái thiết bị có dấu thời gian. Hãy kèm đơn vị và danh tính thiết bị. Tần suất lấy mẫu ảnh hưởng đến độ phản hồi, điện năng và băng thông. Bảng điều khiển nên hiển thị rõ trạng thái bình thường và chỉ cảnh báo khi tình trạng cần chú ý.
