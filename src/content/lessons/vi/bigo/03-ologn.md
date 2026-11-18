---
id: ologn
section: MỨC TĂNG TRƯỞNG
title: Thời gian logarit
navTitle: Logarit · O(log n)
summary: Liên tục chia đôi phạm vi tìm kiếm
description: Mỗi bước loại bỏ phần lớn phạm vi tìm kiếm còn lại.
goal: Tìm kiếm nhị phân chia đôi danh sách đã sắp xếp sau mỗi lần so sánh. Xem ví dụ Python cùng chi phí thời gian và bộ nhớ của nó.
eyebrow: DẠNG ĐỘ PHỨC TẠP
widget: complexity
widgetData:
  label: O(log n)
  space: O(1)
  example: Tìm kiếm nhị phân trong danh sách đã sắp xếp
  tip: Đầu vào cần được sắp xếp hoặc có cấu trúc phù hợp để mỗi bước đều thu hẹp phạm vi.
code:
  file: ologn.py
  lang: python
  source: |-
    def binary_search(values, target):
        low, high = 0, len(values) - 1
        while low <= high:
            mid = (low + high) // 2
            if values[mid] == target:
                return mid
            if values[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1

    print(binary_search([2, 4, 6, 8, 10], 8))
  output: "3"
  description: Tìm kiếm nhị phân trong danh sách đã sắp xếp
  variants:
    - lang: javascript
      file: ologn.js
      source: |-
        function binarySearch(values, target) {
          let low = 0, high = values.length - 1;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (values[mid] === target) return mid;
            if (values[mid] < target) low = mid + 1;
            else high = mid - 1;
          }
          return -1;
        }

        console.log(binarySearch([2, 4, 6, 8, 10], 8));
      output: "3"
    - lang: cpp
      file: ologn.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        int binarySearch(const vector<int>& values, int target) {
            int low = 0, high = values.size() - 1;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (values[mid] == target) return mid;
                if (values[mid] < target) low = mid + 1;
                else high = mid - 1;
            }
            return -1;
        }

        int main() {
            cout << binarySearch({2, 4, 6, 8, 10}, 8) << endl;
        }
      output: "3"
cornellCues:
  - Định nghĩa O(log n)
  - Khối lượng công việc tăng như thế nào?
  - Nêu một ví dụ quen thuộc của O(log n)
  - Điều gì thay đổi khi n tăng?
  - Chi phí bộ nhớ là bao nhiêu?
cornellNotes:
  - label: Trực giác
    text: Tìm kiếm nhị phân chia đôi danh sách đã sắp xếp sau mỗi lần so sánh.
  - label: Ví dụ điển hình
    text: Tìm kiếm nhị phân trong danh sách đã sắp xếp
  - label: Mẹo phân tích
    text: Đầu vào cần được sắp xếp hoặc có cấu trúc phù hợp để mỗi bước đều thu hẹp phạm vi.
  - label: Thời gian · Bộ nhớ
    text: O(log n) · O(1)
cornellApply: Dự đoán khối lượng công việc thay đổi ra sao nếu n lớn gấp 10 lần.
order: 3
---
