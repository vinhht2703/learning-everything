---
id: systems
section: PHÉP TOÁN CỐT LÕI
title: Hệ phương trình và bình phương tối thiểu
summary: Giải hệ và khớp dữ liệu
description: Hệ phương trình tuyến tính mô tả các ràng buộc; bình phương tối thiểu tìm tham số khớp nhất với dữ liệu nhiễu.
goal: Diễn giải hệ phương trình nhỏ và liên hệ việc khớp đường thẳng với giảm sai số dự đoán.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Giải các ràng buộc hoặc tìm đường thẳng khớp nhất
formula: "Ax = b   ;   bình phương tối thiểu: cực tiểu hóa ||Xw − y||₂²"
takeaways:
  - label: Hệ có nghiệm chính xác
    text: Giải đồng thời mọi phương trình khi tồn tại nghiệm chính xác.
  - label: Phần dư
    text: Giá trị quan sát trừ giá trị dự đoán.
  - label: Bình phương tối thiểu
    text: Chọn tham số làm nhỏ nhất tổng bình phương sai số phần dư.
widget: system
widgetTitle: Giải hệ nhỏ theo từng bước
widgetDescription: Theo dõi phép khử cho hệ 2x + y = 5 và x − y = 1.
code:
  lang: python
  source: |-
    import numpy as np
    X = np.array([[1, 1],
                  [1, 2],
                  [1, 3]])
    y = np.array([2, 3, 5])
    w, *_ = np.linalg.lstsq(X, y, rcond=None)
    print(np.round(w, 2))
  output: "[0.33 1.5 ]"
  description: Với tập dữ liệu dư phương trình thực tế, bình phương tối thiểu ước lượng tham số khớp nhất.
order: 6
---

Hệ Ax = b tìm các giá trị đồng thời thỏa nhiều phương trình tuyến tính. Một số hệ có một nghiệm chính xác, nhiều nghiệm hoặc không có nghiệm. Dữ liệu thực có nhiễu nên đường thẳng có thể không đi qua mọi điểm. Bình phương tối thiểu chọn tham số làm nhỏ nhất tổng bình phương phần dư, tức chênh lệch giữa quan sát và dự đoán.
