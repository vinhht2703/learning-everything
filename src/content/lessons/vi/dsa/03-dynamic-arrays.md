---
id: dynamic-arrays
order: 3
section: MẢNG
title: Mảng động
summary: Tăng gấp đôi, trung bình O(1)
duration: 16 phút
description: Mảng động (như list trong Python) tự mở rộng bằng cách sao chép sang một mảng lớn hơn khi hết chỗ.
goal: Hiểu vì sao tăng gấp đôi sức chứa giúp thao tác thêm vẫn nhanh trung bình, dù có lần thêm tốn O(n).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Hiếm khi phải trả giá sao chép
formula: n lần thêm tốn ≤ n + (1 + 2 + 4 + … + n) < 3n → trung bình O(1)
takeaways:
  - label: Thay đổi kích thước
    text: "Cấp phát mảng lớn hơn và sao chép tất cả: O(n)."
  - label: Gấp đôi
    text: Tăng ×2 (không phải +1) khiến việc đổi kích thước hiếm xảy ra.
  - label: Trung bình O(1)
    text: Tính trung bình qua nhiều lần thêm, mỗi lần là công việc hằng số.
widget: dynamic-array
widgetTitle: Xem mảng tăng gấp đôi
widgetDescription: Thêm từng giá trị. "Công việc mỗi lần thêm" ổn định dưới 3 dù mảng ngày càng lớn.
code:
  file: dynamic_array.py
  lang: python
  source: |-
    class DynamicArray:
        def __init__(self):
            self.capacity = 2
            self.length = 0
            self.arr = [0] * self.capacity

        def push(self, value):
            if self.length == self.capacity:
                self.resize()
            self.arr[self.length] = value
            self.length += 1

        def resize(self):
            self.capacity *= 2
            new_arr = [0] * self.capacity
            for i in range(self.length):
                new_arr[i] = self.arr[i]
            self.arr = new_arr

    d = DynamicArray()
    for v in range(5):
        d.push(v)
    print(d.length, d.capacity)
  output: 5 8
  description: Một mảng động tối giản tăng gấp đôi khi đầy.
  variants:
    - lang: javascript
      file: dynamic_array.js
      source: |-
        class DynamicArray {
          constructor() {
            this.capacity = 2;
            this.length = 0;
            this.arr = new Array(this.capacity).fill(0);
          }

          push(value) {
            if (this.length === this.capacity) this.resize();
            this.arr[this.length] = value;
            this.length++;
          }

          resize() {
            this.capacity *= 2;
            const newArr = new Array(this.capacity).fill(0);
            for (let i = 0; i < this.length; i++) newArr[i] = this.arr[i];
            this.arr = newArr;
          }
        }

        const d = new DynamicArray();
        for (let v = 0; v < 5; v++) d.push(v);
        console.log(d.length, d.capacity);
      output: 5 8
    - lang: cpp
      file: dynamic_array.cpp
      source: |-
        #include <iostream>
        using namespace std;

        class DynamicArray {
            int capacity = 2;
            int length = 0;
            int* arr = new int[2];

            void resize() {
                capacity *= 2;
                int* newArr = new int[capacity];
                for (int i = 0; i < length; i++) newArr[i] = arr[i];
                delete[] arr;
                arr = newArr;
            }

        public:
            ~DynamicArray() { delete[] arr; }

            void push(int value) {
                if (length == capacity) resize();
                arr[length++] = value;
            }

            int size() const { return length; }
            int cap() const { return capacity; }
        };

        int main() {
            DynamicArray d;
            for (int v = 0; v < 5; v++) d.push(v);
            cout << d.size() << " " << d.cap() << endl;
        }
      output: 5 8
complexity:
  - op: Đọc arr[i]
    time: O(1)
    space: O(1)
  - op: Thêm vào cuối (trung bình)
    time: O(1)
    space: O(1)
  - op: Thêm khi đổi kích thước
    time: O(n)
    space: O(n)
  - op: Chèn / xóa ở giữa
    time: O(n)
    space: O(1)
videos:
  - title: What is Amortized Time Complexity? - Code a Dynamic Array
    channel: Gaurav Sen
    url: https://www.youtube.com/watch?v=EOjoQxdOBgU
  - title: "The Magic Behind Dynamic Arrays: Amortization & How Python Lists Stay Fast!"
    channel: Minus J Squared
    url: https://www.youtube.com/watch?v=p8-NsF3fPV4
practice:
  - title: Concatenation of Array
    url: https://leetcode.com/problems/concatenation-of-array/
    difficulty: easy
  - title: Shuffle the Array
    url: https://leetcode.com/problems/shuffle-the-array/
    difficulty: easy
reflectionPrompt: Thao tác thêm sẽ ra sao nếu mảng chỉ tăng +1 ô thay vì ×2?
---

Khi mảng động đầy, nó cấp phát một mảng mới có sức chứa gấp đôi, sao chép mọi phần tử sang và giải phóng mảng cũ. Lần thêm đó tốn O(n).

Nhưng vì sức chứa tăng gấp đôi nên các lần sao chép tốn kém ngày càng hiếm. Cộng toàn bộ công sao chép qua n lần thêm được ít hơn 2n, nên chi phí trung bình (khấu hao) mỗi lần thêm là O(1). Đây chính là cách list của Python, ArrayList của Java và vector của C++ hoạt động.
