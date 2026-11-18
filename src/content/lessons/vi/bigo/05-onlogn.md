---
id: onlogn
section: MỨC TĂNG TRƯỞNG
title: Thời gian tuyến tính-logarit
navTitle: Tuyến tính-logarit · O(n log n)
summary: Sắp xếp hiệu quả phổ biến
description: Đầu vào được xử lý qua số tầng tăng theo logarit.
goal: Các thuật toán sắp xếp so sánh hiệu quả chia nhỏ đầu vào rồi kết hợp kết quả. Xem ví dụ Python cùng chi phí thời gian và bộ nhớ của nó.
eyebrow: DẠNG ĐỘ PHỨC TẠP
widget: complexity
widgetData:
  label: O(n log n)
  space: O(n)
  example: Sắp xếp danh sách
  tip: Đây là mức thường gặp của thuật toán sắp xếp đa dụng.
code:
  file: onlogn.py
  lang: python
  source: |-
    names = ["Lee", "Ari", "Sam", "Jo"]
    print(sorted(names))
  output: "['Ari', 'Jo', 'Lee', 'Sam']"
  description: Sắp xếp danh sách
  variants:
    - lang: javascript
      file: onlogn.js
      source: |-
        const names = ["Lee", "Ari", "Sam", "Jo"];
        console.log([...names].sort());
      output: "[ 'Ari', 'Jo', 'Lee', 'Sam' ]"
    - lang: cpp
      file: onlogn.cpp
      source: |-
        #include <algorithm>
        #include <iostream>
        #include <string>
        #include <vector>
        using namespace std;

        int main() {
            vector<string> names = {"Lee", "Ari", "Sam", "Jo"};
            sort(names.begin(), names.end());  // O(n log n)
            for (const string& name : names) cout << name << " ";
            cout << endl;
        }
      output: Ari Jo Lee Sam
cornellCues:
  - Định nghĩa O(n log n)
  - Khối lượng công việc tăng như thế nào?
  - Nêu một ví dụ quen thuộc của O(n log n)
  - Điều gì thay đổi khi n tăng?
  - Chi phí bộ nhớ là bao nhiêu?
cornellNotes:
  - label: Trực giác
    text: Thuật toán sắp xếp so sánh hiệu quả chia đầu vào rồi kết hợp kết quả.
  - label: Ví dụ điển hình
    text: Sắp xếp danh sách
  - label: Mẹo phân tích
    text: Đây là mức thường gặp của thuật toán sắp xếp đa dụng.
  - label: Thời gian · Bộ nhớ
    text: O(n log n) · O(n)
cornellApply: Dự đoán khối lượng công việc thay đổi ra sao nếu n lớn gấp 10 lần.
order: 5
---
