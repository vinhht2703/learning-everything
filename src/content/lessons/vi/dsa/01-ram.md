---
id: ram
order: 1
section: BẮT ĐẦU
title: Máy tính lưu dữ liệu thế nào (RAM)
summary: Byte, địa chỉ và bộ nhớ liên tiếp
duration: 6 phút
description: Mọi cấu trúc dữ liệu đều nằm trong bộ nhớ. Hiểu về địa chỉ giúp giải thích vì sao có thao tác diễn ra tức thì và có thao tác lại chậm.
goal: Hình dung RAM như các ô được đánh số và tính được vị trí của một phần tử mảng.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Bộ nhớ là một dãy dài các byte được đánh số
formula: địa chỉ(arr[i]) = base + i × kích_thước_phần_tử
takeaways:
  - label: Địa chỉ
    text: Một con số xác định một byte trong RAM.
  - label: Liên tiếp
    text: Các phần tử mảng nằm sát nhau, không có khoảng trống.
  - label: Truy cập O(1)
    text: Mọi chỉ số đều chỉ cách một phép tính.
widget: ram
widgetTitle: Tìm một phần tử trong bộ nhớ
widgetDescription: Di chuyển chỉ số và đổi kích thước phần tử. Địa chỉ được tính ra, không phải tìm kiếm.
code:
  file: memory.py
  lang: python
  source: |-
    base = 1000      # address of nums[0]
    size = 4         # bytes per integer
    nums = [7, 3, 9, 4]

    for i in range(len(nums)):
        print(f"nums[{i}] = {nums[i]} at address {base + i * size}")
  output: |-
    nums[0] = 7 at address 1000
    nums[1] = 3 at address 1004
    nums[2] = 9 at address 1008
    nums[3] = 4 at address 1012
  description: Mô phỏng cách mảng ánh xạ chỉ số sang địa chỉ.
  variants:
    - lang: javascript
      file: memory.js
      source: |-
        const base = 1000;   // address of nums[0]
        const size = 4;      // bytes per integer
        const nums = [7, 3, 9, 4];

        for (let i = 0; i < nums.length; i++) {
          console.log(`nums[${i}] = ${nums[i]} at address ${base + i * size}`);
        }
      output: |-
        nums[0] = 7 at address 1000
        nums[1] = 3 at address 1004
        nums[2] = 9 at address 1008
        nums[3] = 4 at address 1012
    - lang: cpp
      file: memory.cpp
      source: |-
        #include <cstdint>
        #include <iostream>
        using namespace std;

        int main() {
            int32_t nums[] = {7, 3, 9, 4};
            // Real addresses: each int32 is 4 bytes after the previous one.
            for (int i = 0; i < 4; i++) {
                intptr_t offset = (char*)&nums[i] - (char*)&nums[0];
                cout << "nums[" << i << "] = " << nums[i]
                     << " at base + " << offset << endl;
            }
        }
      output: |-
        nums[0] = 7 at base + 0
        nums[1] = 3 at base + 4
        nums[2] = 9 at base + 8
        nums[3] = 4 at base + 12
complexity:
  - op: Đọc arr[i]
    time: O(1)
    space: O(1)
  - op: Ghi arr[i]
    time: O(1)
    space: O(1)
videos:
  - title: How Computers Store Data | DRAM, SRAM, Registers
    channel: Bit by Bit
    url: https://www.youtube.com/watch?v=GfcwfYXus04
  - title: CS50x 2025 - Lecture 2 - Arrays
    channel: CS50 (Harvard)
    url: https://www.youtube.com/watch?v=Y8qnryVy5sQ
    note: bài giảng đầy đủ
practice:
  - title: Running Sum of 1d Array
    url: https://leetcode.com/problems/running-sum-of-1d-array/
    difficulty: easy
reflectionPrompt: Vì sao máy tính đọc arr[1000000] nhanh như arr[0]?
---

RAM (bộ nhớ truy cập ngẫu nhiên) là một dãy byte rất dài. Mỗi byte có một địa chỉ, là một con số như 1000 hoặc 1004. "Truy cập ngẫu nhiên" nghĩa là máy tính có thể nhảy thẳng tới bất kỳ địa chỉ nào mà không cần đi qua các byte phía trước.

Một số nguyên thường chiếm 4 hoặc 8 byte. Mảng lưu các giá trị nằm sát nhau (liên tiếp), nên nếu biết phần tử đầu tiên bắt đầu ở đâu, bạn tính được vị trí của bất kỳ phần tử nào chỉ với một phép nhân và một phép cộng. Đó là lý do đọc `arr[i]` có độ phức tạp O(1).
