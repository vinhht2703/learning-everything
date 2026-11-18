---
id: onfact
section: MỨC TĂNG TRƯỞNG
title: Thời gian giai thừa
navTitle: Giai thừa · O(n!)
summary: Thử mọi thứ tự có thể
description: Thuật toán có thể thử mọi thứ tự có thể của đầu vào.
goal: Sinh mọi lộ trình qua n điểm dừng tạo ra n! hoán vị. Xem ví dụ Python cùng chi phí thời gian và bộ nhớ của nó.
eyebrow: DẠNG ĐỘ PHỨC TẠP
widget: complexity
widgetData:
  label: O(n!)
  space: O(n · n!)
  example: Tạo mọi thứ tự
  tip: Chỉ hữu ích với đầu vào rất nhỏ trừ khi có thể cắt tỉa tìm kiếm.
code:
  file: onfact.py
  lang: python
  source: |-
    from itertools import permutations
    routes = list(permutations(["A", "B", "C"]))
    print(len(routes))
  output: "6"
  description: Tạo mọi thứ tự
  variants:
    - lang: javascript
      file: onfact.js
      source: |-
        function permutations(items) {
          if (items.length <= 1) return [items];
          const result = [];
          items.forEach((item, i) => {
            const rest = [...items.slice(0, i), ...items.slice(i + 1)];
            for (const p of permutations(rest)) result.push([item, ...p]);
          });
          return result;
        }

        const routes = permutations(["A", "B", "C"]);
        console.log(routes.length);
      output: "6"
    - lang: cpp
      file: onfact.cpp
      source: |-
        #include <algorithm>
        #include <iostream>
        #include <string>
        #include <vector>
        using namespace std;

        int main() {
            vector<string> stops = {"A", "B", "C"};  // must start sorted
            int routes = 0;
            do {
                routes++;
            } while (next_permutation(stops.begin(), stops.end()));
            cout << routes << endl;
        }
      output: "6"
cornellCues:
  - Định nghĩa O(n!)
  - Khối lượng công việc tăng như thế nào?
  - Nêu một ví dụ quen thuộc của O(n!)
  - Điều gì thay đổi khi n tăng?
  - Chi phí bộ nhớ là bao nhiêu?
cornellNotes:
  - label: Trực giác
    text: Tạo mọi lộ trình qua n điểm dừng tạo ra n! hoán vị.
  - label: Ví dụ điển hình
    text: Tạo mọi thứ tự
  - label: Mẹo phân tích
    text: Chỉ hữu ích với đầu vào rất nhỏ trừ khi có thể cắt tỉa tìm kiếm.
  - label: Thời gian · Bộ nhớ
    text: O(n!) · O(n · n!)
cornellApply: Dự đoán khối lượng công việc thay đổi ra sao nếu n lớn gấp 10 lần.
order: 8
---
