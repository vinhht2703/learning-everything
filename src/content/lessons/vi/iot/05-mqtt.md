---
id: mqtt
section: XÂY DỰNG VÀ BẢO MẬT
title: Nhắn tin MQTT
summary: Chủ đề, xuất bản, đăng ký
description: MQTT dùng mô hình xuất bản/đăng ký để chuyển các tin nhắn IoT nhỏ qua một broker.
goal: Tạo một chủ đề và giải thích cách bên xuất bản và bên đăng ký giao tiếp.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Xuất bản một lần; client quan tâm sẽ đăng ký
formula: BÊN XUẤT BẢN → CHỦ ĐỀ → BROKER → BÊN ĐĂNG KÝ
takeaways:
  - label: Bên xuất bản
    text: Gửi tin nhắn đến một chủ đề.
  - label: Broker
    text: Chuyển tin nhắn đến các client quan tâm.
  - label: Bên đăng ký
    text: Lắng nghe một hoặc nhiều mẫu chủ đề.
widget: topic
widgetTitle: Tạo một chủ đề MQTT
widgetDescription: Chọn phòng và loại giá trị đo để xem trước chủ đề.
code:
  lang: python
  source: client.publish("home/kitchen/temperature", "23.6")
  output: home/kitchen/temperature · 23.6
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: Thiết bị nào xuất bản tin nhắn này, và dịch vụ nào đăng ký?
order: 5
---

Thiết bị xuất bản lên một chủ đề như home/kitchen/temperature. Broker chuyển tin nhắn đến các bên đăng ký. Thiết bị không cần kết nối trực tiếp với từng bên nhận. Hãy chọn chủ đề rõ ràng, nội dung hữu ích và thiết lập gửi phù hợp.
