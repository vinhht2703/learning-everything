---
id: connectivity
section: NỀN TẢNG IOT
title: Lựa chọn kết nối
summary: Wi-Fi, BLE, di động, LoRaWAN
description: Chọn mạng dựa trên phạm vi, điện năng, tốc độ dữ liệu, vùng phủ sóng và chi phí.
goal: Ghép một kết nối không dây với một tình huống thiết bị.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Không có kết nối không dây nào tốt nhất cho mọi trường hợp
formula: PHẠM VI · ĐIỆN NĂNG · TỐC ĐỘ DỮ LIỆU · VÙNG PHỦ · CHI PHÍ
takeaways:
  - label: Wi-Fi
    text: Phù hợp khi cần băng thông và có sẵn nguồn điện.
  - label: BLE
    text: Phù hợp cho kết nối gần, tiêu thụ điện thấp.
  - label: Di động / LoRaWAN
    text: Cân nhắc vùng phủ sóng, kích thước dữ liệu và chi phí vận hành.
widget: network
widgetTitle: Chọn kết nối cho thiết bị
widgetDescription: Chọn một tình huống và so sánh kết nối hợp lý.
code:
  lang: python
  source: |-
    device = "battery soil sensor"
    link = "LoRaWAN"
    print(device, "uses", link)
  output: battery soil sensor uses LoRaWAN
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: "Điều gì quan trọng nhất với thiết bị của bạn: thời lượng pin, vùng phủ sóng, tốc độ hay chi phí?"
order: 3
---

Wi-Fi cho băng thông cao khi có nguồn điện và hạ tầng tại chỗ. Bluetooth Low Energy phù hợp với thiết bị gần, tiêu thụ điện thấp. Mạng di động phủ sóng diện rộng nhưng có phí dịch vụ. LoRaWAN gửi các tin nhắn nhỏ qua khoảng cách xa với tốc độ dữ liệu thấp. Gateway có thể làm cầu nối giữa các công nghệ.
