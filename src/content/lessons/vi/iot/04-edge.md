---
id: edge
section: NỀN TẢNG IOT
title: Biên, gateway và đám mây
summary: Xử lý nên diễn ra ở đâu?
description: Xử lý IoT có thể diễn ra trên thiết bị, trên gateway gần đó hoặc trên dịch vụ đám mây.
goal: Đặt việc xử lý theo độ trễ, khả năng kết nối, quyền riêng tư và quy mô.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đặt mỗi tác vụ vào đúng chỗ
formula: THIẾT BỊ (NHANH) → GATEWAY (ĐIỀU PHỐI) → ĐÁM MÂY (QUY MÔ)
takeaways:
  - label: Thiết bị / biên
    text: Phản hồi tại chỗ với độ trễ thấp.
  - label: Gateway
    text: Kết nối các thiết bị, lọc hoặc tổng hợp dữ liệu.
  - label: Đám mây
    text: Lưu lịch sử và phân tích nhiều thiết bị.
widget: placement
widgetTitle: Đặt bước xử lý
widgetDescription: Chọn một yêu cầu và xem tầng xử lý nên bắt đầu.
code:
  lang: python
  source: |-
    if smoke_sensor.detected():
        siren.turn_on()
        cloud.send_event("smoke_detected")
  output: Cảnh báo tại chỗ vẫn hoạt động ngay cả khi mất internet.
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: Hành động nào phải vẫn hoạt động khi mất kết nối internet?
order: 4
---

Thiết bị có thể ra quyết định nhanh tại chỗ khi mất internet. Gateway có thể kết hợp nhiều thiết bị hoặc lọc lưu lượng. Hệ thống đám mây có thể lưu lịch sử và phân tích cả đội thiết bị. Thiết kế lai cân bằng giữa phản hồi tại chỗ và dịch vụ tập trung.
