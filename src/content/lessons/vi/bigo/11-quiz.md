---
id: quiz
section: THỰC HÀNH VÀ TRA CỨU
title: Câu hỏi độ phức tạp mã nguồn
navTitle: Câu hỏi mã nguồn
summary: Ước lượng thời gian và bộ nhớ
description: Ước lượng độ phức tạp thời gian và bộ nhớ từ các đoạn mã ngắn.
goal: Chọn tốc độ tăng trưởng mô tả phù hợp nhất cho từng ví dụ.
eyebrow: KIỂM TRA MỨC ĐỘ HIỂU
widget: quiz
widgetTitle: Đọc mã và ước lượng mức tăng trưởng.
widgetDescription: Tập trung vào cách số phép toán thay đổi khi n tăng.
widgetData:
  questions:
    - topic: DUYỆT MẢNG
      question: Độ phức tạp thời gian của hàm này là gì?
      code: |-
        for item in values:
            if item == target:
                return True
      options:
        - O(1)
        - O(log n)
        - O(n)
        - O(n²)
      answer: 2
      explanation: Trong trường hợp xấu nhất, nó kiểm tra mỗi phần tử một lần, nên khối lượng công việc tăng tuyến tính theo n.
    - topic: TÌM KIẾM NHỊ PHÂN
      question: Danh sách đã sắp xếp bị chia đôi sau mỗi lần so sánh. Độ phức tạp thời gian là gì?
      code: |-
        while low <= high:
            mid = (low + high) // 2
            # keep one half
      options:
        - O(1)
        - O(log n)
        - O(n)
        - O(n log n)
      answer: 1
      explanation: Liên tục chia đôi phần đầu vào còn lại mất khoảng log₂(n) bước.
    - topic: VÒNG LẶP LỒNG NHAU
      question: Cặp vòng lặp này tăng trưởng như thế nào?
      code: |-
        for left in values:
            for right in values:
                compare(left, right)
      options:
        - O(log n)
        - O(n)
        - O(n²)
        - O(2ⁿ)
      answer: 2
      explanation: "Mỗi lần lặp trong n lần lặp ngoài chạy n lần lặp trong: n × n = n²."
    - topic: BỘ NHỚ PHỤ
      question: Sao chép n phần tử cần thêm bao nhiêu bộ nhớ?
      code: |-
        copy = []
        for item in values:
            copy.append(item)
      options:
        - O(1)
        - O(log n)
        - O(n)
        - O(n²)
      answer: 2
      explanation: Danh sách mới lưu thêm một phần tử cho mỗi phần tử đầu vào, nên bộ nhớ bổ sung tăng theo O(n).
    - topic: ĐỆ QUY
      question: Hàm này khám phá hai nhánh đệ quy ở mỗi tầng. Độ phức tạp thời gian của nó là gì?
      code: |-
        def solve(n):
            if n <= 1: return 1
            return solve(n - 1) + solve(n - 1)
      options:
        - O(n)
        - O(n²)
        - O(2ⁿ)
        - O(n!)
      answer: 2
      explanation: Số lần gọi gần như gấp đôi với mỗi tầng thêm vào, tạo ra tăng trưởng hàm mũ.
    - topic: SẮP XẾP
      question: Sắp xếp trộn chia danh sách, sắp xếp hai nửa rồi trộn lại. Độ phức tạp thời gian điển hình là gì?
      code: |-
        sort(left_half)
        sort(right_half)
        merge(left_half, right_half)
      options:
        - O(log n)
        - O(n)
        - O(n log n)
        - O(n²)
      answer: 2
      explanation: Có khoảng log n tầng chia, với O(n) công việc để trộn ở mỗi tầng.
    - topic: RÚT GỌN
      question: Big O rút gọn của 4n² + 7n + 12 là gì?
      code: |-
        # Keep the fastest-growing term
        4*n**2 + 7*n + 12
      options:
        - O(1)
        - O(n)
        - O(n²)
        - O(n³)
      answer: 2
      explanation: Big O bỏ hệ số hằng và các số hạng bậc thấp, còn lại O(n²).
    - topic: HOÁN VỊ
      question: Một thuật toán thử mọi cách sắp thứ tự của n phần tử phân biệt. Có bao nhiêu cách sắp thứ tự?
      code: |-
        for order in permutations(items):
            check(order)
      options:
        - O(n)
        - O(n²)
        - O(2ⁿ)
        - O(n!)
      answer: 3
      explanation: Có n! hoán vị phân biệt của n phần tử, nên liệt kê chúng có tốc độ tăng giai thừa.
cornellCues:
  - Làm sao tìm thao tác chi phối?
  - Khi nào một lần duyệt là O(n)?
  - Điều gì khiến tìm kiếm nhị phân có độ phức tạp logarit?
  - Phân tích vòng lặp lồng nhau như thế nào?
  - Các nhánh đệ quy ảnh hưởng đến tốc độ tăng như thế nào?
  - Vì sao bỏ các số hạng bậc thấp?
cornellNotes:
  - label: "DUYỆT MẢNG: O(n)"
    text: Trong trường hợp xấu nhất, nó kiểm tra mỗi phần tử một lần, nên khối lượng công việc tăng tuyến tính theo n.
  - label: "TÌM KIẾM NHỊ PHÂN: O(log n)"
    text: Liên tục chia đôi phần đầu vào còn lại mất khoảng log₂(n) bước.
  - label: "VÒNG LẶP LỒNG NHAU: O(n²)"
    text: "Mỗi lần lặp trong n lần lặp ngoài chạy n lần lặp trong: n × n = n²."
  - label: "BỘ NHỚ PHỤ: O(n)"
    text: Danh sách mới lưu thêm một phần tử cho mỗi phần tử đầu vào, nên bộ nhớ bổ sung tăng theo O(n).
  - label: "ĐỆ QUY: O(2ⁿ)"
    text: Số lần gọi gần như gấp đôi với mỗi tầng thêm vào, tạo ra tăng trưởng hàm mũ.
  - label: "SẮP XẾP: O(n log n)"
    text: Có khoảng log n tầng chia, với O(n) công việc để trộn ở mỗi tầng.
  - label: "RÚT GỌN: O(n²)"
    text: Big O bỏ hệ số hằng và các số hạng bậc thấp, còn lại O(n²).
  - label: "HOÁN VỊ: O(n!)"
    text: Có n! hoán vị phân biệt của n phần tử, nên liệt kê chúng có tốc độ tăng giai thừa.
cornellApply: Chọn một câu bạn thấy khó và viết lại lập luận bằng lời của bạn.
order: 11
---

Cách phân tích: xác định phần việc lặp lại, xem nó chạy bao nhiêu lần khi n thay đổi, rồi rút gọn về số hạng tăng nhanh nhất. Xét bộ nhớ bổ sung riêng.
