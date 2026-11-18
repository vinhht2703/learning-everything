---
id: sensors
section: NỀN TẢNG IOT
title: Cảm biến và bộ chấp hành
summary: Đo, quyết định, hành động
description: Cảm biến đo các điều kiện vật lý; bộ chấp hành biến lệnh thành thay đổi vật lý.
goal: Phân biệt đầu vào với đầu ra và tạo một quy tắc ngưỡng.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đo, quyết định, hành động
formula: CẢM BIẾN → QUY TẮC → BỘ CHẤP HÀNH
takeaways:
  - label: Cảm biến
    text: Đo một đại lượng vật lý.
  - label: Bộ chấp hành
    text: Thực hiện một hành động như mở cửa thông gió.
  - label: Quy tắc điều khiển
    text: Ánh xạ giá trị đo thành hành động trong giới hạn an toàn.
widget: threshold
widgetTitle: Tinh chỉnh quạt nhà kính
widgetDescription: Điều chỉnh nhiệt độ và ngưỡng bật quạt.
code:
  lang: python
  source: |-
    temperature_c = 29.4
    fan_on = temperature_c >= 28.0
    print("fan on" if fan_on else "fan off")
  output: fan on
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: Bạn sẽ kết hợp cảm biến và bộ chấp hành nào trong một thiết bị hữu ích?
order: 2
---

Cảm biến nhiệt độ cung cấp đầu vào. Phần mềm so sánh giá trị với ngưỡng và có thể bật rơ-le quạt. Cảm biến thực tế có thể bị nhiễu hoặc hỏng, vì vậy hãy dùng giới hạn an toàn, hiệu chuẩn và chế độ điều khiển thủ công khi phù hợp.
