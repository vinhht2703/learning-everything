---
id: security
section: XÂY DỰNG VÀ BẢO MẬT
title: Thiết kế thiết bị an toàn
summary: Danh tính, cập nhật, quyền tối thiểu
description: Thiết bị kết nối cần được bảo vệ từ lúc cài đặt, qua các lần cập nhật đến khi ngừng sử dụng.
goal: Xác định các biện pháp kiểm soát cơ bản cho một nguyên mẫu IoT.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Bảo mật thuộc về toàn bộ vòng đời
formula: DANH TÍNH · MÃ HÓA · QUYỀN TỐI THIỂU · CẬP NHẬT
takeaways:
  - label: Danh tính riêng
    text: Tránh dùng chung thông tin đăng nhập cho cả đội thiết bị.
  - label: Truyền tải được bảo vệ
    text: Mã hóa kết nối và xác minh danh tính máy chủ.
  - label: Vòng đời
    text: Lên kế hoạch cài đặt, cập nhật, ứng phó và ngừng sử dụng.
widget: security
widgetTitle: Xem lại danh sách kiểm tra thiết bị
widgetDescription: Chọn các biện pháp bảo vệ bạn yêu cầu trước khi triển khai.
code:
  lang: python
  source: |-
    client.connect(tls=True, certificate=device_cert)
    client.publish(topic, payload, qos=1)
  output: Kết nối được mã hóa · danh tính riêng cho thiết bị
  description: Đọc ví dụ nhỏ này, sau đó thay đổi đầu vào hoặc ngưỡng để dự đoán thiết bị sẽ làm gì.
reflectionPrompt: Bạn sẽ kiểm tra biện pháp bảo vệ nào trước khi kết nối thiết bị vào mạng thật?
order: 6
---

Cấp cho mỗi thiết bị thông tin đăng nhập riêng, mã hóa kết nối, loại bỏ mật khẩu mặc định dùng chung và chỉ cấp quyền cần thiết. Xác thực bản cập nhật có chữ ký, bảo vệ bí mật, lên kế hoạch vá lỗi và ngừng sử dụng. Thu thập ít dữ liệu nhất có thể và cân nhắc việc tiếp cận vật lý.
