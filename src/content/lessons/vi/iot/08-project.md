---
id: project
section: XÂY DỰNG VÀ BẢO MẬT
title: "Dự án nhỏ: nhà kính thông minh"
summary: Thiết kế một hệ thống hoàn chỉnh
description: Thiết kế bộ giám sát đo các điều kiện và điều khiển quạt nhà kính một cách an toàn.
goal: Xác định cảm biến, cách truyền thông, bảo mật và cách xử lý khi có sự cố.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Thiết kế hệ thống trước khi đi dây
formula: NHU CẦU → CẢM BIẾN → QUYẾT ĐỊNH → MẠNG → HÀNH ĐỘNG
takeaways:
  - label: Xác định nhu cầu
    text: Nêu ai được hưởng lợi và dữ liệu hỗ trợ quyết định nào.
  - label: Lên kế hoạch cho sự cố
    text: Mô tả cách hệ thống hoạt động khi một bộ phận ngừng hoạt động.
  - label: Nguyên mẫu
    text: Thử một cảm biến và một hành động an toàn trước khi mở rộng.
widget: project
widgetTitle: Cấu hình nguyên mẫu của bạn
widgetDescription: Chọn kết nối để xem trước bản phác thảo hệ thống.
code:
  lang: python
  source: |-
    if soil_moisture < 35:
        irrigation_valve.open_for(seconds=5)
        publish("greenhouse/irrigation", "started")
  output: Tưới ngắn một lần · đã ghi lại sự kiện
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: Bài thử nguyên mẫu an toàn đầu tiên của bạn là gì, và làm sao biết nó thành công?
order: 8
---

Bắt đầu từ nhu cầu người dùng: giữ cây trồng trong môi trường phù hợp và phát hiện vấn đề sớm. Đo nhiệt độ và độ ẩm đất, điều khiển quạt tại chỗ và gửi số đo lên bảng điều khiển. Hãy có chế độ điều khiển thủ công và cách xử lý rõ ràng khi cảm biến, mạng hoặc bộ chấp hành gặp sự cố.
