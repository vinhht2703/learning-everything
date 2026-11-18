---
id: bit-operations
order: 34
section: THAO TÁC BIT
title: Phép toán bit
summary: AND, OR, XOR, dịch bit
duration: 17 phút
description: Số nguyên được lưu dưới dạng nhị phân. Toán tử bit xử lý mọi bit cùng lúc, giúp một số bài toán trở nên rất gọn và nhanh.
goal: Dùng &, |, ^, << và >> để giải các mẹo bit kinh điển như đếm bit 1 và Single Number.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Mỗi số là một dãy công tắc
formula: x & 1 → bit cuối · x << k = x·2ᵏ · x >> k = x // 2ᵏ · x ^ x = 0
takeaways:
  - label: AND / OR / XOR
    text: "Cả hai, ít nhất một, khác nhau: theo từng bit."
  - label: Dịch bit
    text: Nhân hoặc chia cho lũy thừa của 2.
  - label: XOR triệt tiêu
    text: "Các cặp biến mất: a ^ a = 0."
widget: bit-playground
widgetTitle: Lật bit và kết hợp chúng
widgetDescription: Nhấp các bit của a và b, chọn phép toán, và đọc kết quả ở dạng nhị phân và thập phân.
code:
  file: bits.py
  lang: python
  source: |-
    a, b = 12, 10                          # 1100 and 1010 in binary
    show = lambda n: format(n, "04b")

    print("a & b  =", show(a & b), a & b)  # AND: 1 where both are 1
    print("a | b  =", show(a | b), a | b)  # OR:  1 where either is 1
    print("a ^ b  =", show(a ^ b), a ^ b)  # XOR: 1 where they differ
    print("a << 1 =", format(a << 1, "05b"), a << 1)   # shift left = multiply by 2
    print("a >> 2 =", show(a >> 2), a >> 2)            # shift right = divide by 4

    def count_ones(n):
        count = 0
        while n:
            count += n & 1                 # look at the lowest bit
            n >>= 1                        # drop it
        return count

    print("ones in 13:", count_ones(13), "| 13 is odd:", 13 & 1 == 1)
    print("single number:", 4 ^ 1 ^ 2 ^ 1 ^ 2)   # pairs cancel out: x ^ x = 0
  output: |-
    a & b  = 1000 8
    a | b  = 1110 14
    a ^ b  = 0110 6
    a << 1 = 11000 24
    a >> 2 = 0011 3
    ones in 13: 3 | 13 is odd: True
    single number: 4
  description: Các toán tử bit, đếm bit 1, và mẹo XOR.
  variants:
    - lang: javascript
      file: bits.js
      source: |-
        const a = 12, b = 10;                         // 1100 and 1010 in binary
        const show = (n, width = 4) => n.toString(2).padStart(width, "0");

        console.log("a & b  =", show(a & b), a & b);  // AND: 1 where both are 1
        console.log("a | b  =", show(a | b), a | b);  // OR:  1 where either is 1
        console.log("a ^ b  =", show(a ^ b), a ^ b);  // XOR: 1 where they differ
        console.log("a << 1 =", show(a << 1, 5), a << 1);   // shift left = multiply by 2
        console.log("a >> 2 =", show(a >> 2), a >> 2);      // shift right = divide by 4

        function countOnes(n) {
          let count = 0;
          while (n) {
            count += n & 1;                           // look at the lowest bit
            n >>>= 1;                                 // drop it
          }
          return count;
        }

        console.log("ones in 13:", countOnes(13), "| 13 is odd:", (13 & 1) === 1);
        console.log("single number:", 4 ^ 1 ^ 2 ^ 1 ^ 2);   // pairs cancel out: x ^ x = 0
      output: |-
        a & b  = 1000 8
        a | b  = 1110 14
        a ^ b  = 0110 6
        a << 1 = 11000 24
        a >> 2 = 0011 3
        ones in 13: 3 | 13 is odd: true
        single number: 4
    - lang: cpp
      file: bits.cpp
      source: |-
        #include <bitset>
        #include <iostream>
        using namespace std;

        int countOnes(unsigned n) {
            int count = 0;
            while (n) {
                count += n & 1;          // look at the lowest bit
                n >>= 1;                 // drop it
            }
            return count;
        }

        int main() {
            unsigned a = 12, b = 10;     // 1100 and 1010 in binary
            cout << "a & b  = " << bitset<4>(a & b) << " " << (a & b) << endl;    // AND
            cout << "a | b  = " << bitset<4>(a | b) << " " << (a | b) << endl;    // OR
            cout << "a ^ b  = " << bitset<4>(a ^ b) << " " << (a ^ b) << endl;    // XOR
            cout << "a << 1 = " << bitset<5>(a << 1) << " " << (a << 1) << endl;  // multiply by 2
            cout << "a >> 2 = " << bitset<4>(a >> 2) << " " << (a >> 2) << endl;  // divide by 4
            cout << "ones in 13: " << countOnes(13) << " | 13 is odd: " << boolalpha << ((13 & 1) == 1) << endl;
            cout << "single number: " << (4 ^ 1 ^ 2 ^ 1 ^ 2) << endl;               // x ^ x = 0
        }
      output: |-
        a & b  = 1000 8
        a | b  = 1110 14
        a ^ b  = 0110 6
        a << 1 = 11000 24
        a >> 2 = 0011 3
        ones in 13: 3 | 13 is odd: true
        single number: 4
complexity:
  - op: Một phép toán bit
    time: O(1)
    space: O(1)
  - op: Đếm bit của n
    time: O(log n)
    space: O(1)
videos:
  - title: "Algorithms: Bit Manipulation"
    channel: HackerRank
    url: https://www.youtube.com/watch?v=NLKQEOgBAnw
  - title: Single Number - Leetcode 136 - Python
    channel: NeetCode
    url: https://www.youtube.com/watch?v=qMPX1AOa83k
  - title: Counting Bits - Dynamic Programming - Leetcode 338 - Python
    channel: NeetCode
    url: https://www.youtube.com/watch?v=RyBM56RIWrM
practice:
  - title: Single Number
    url: https://leetcode.com/problems/single-number/
    difficulty: easy
  - title: Number of 1 Bits
    url: https://leetcode.com/problems/number-of-1-bits/
    difficulty: easy
  - title: Counting Bits
    url: https://leetcode.com/problems/counting-bits/
    difficulty: easy
reflectionPrompt: Làm sao một số nguyên lưu được những ngày trong tuần có lớp học?
---

Ở hệ nhị phân, 12 là `1100` và 10 là `1010`. **AND** (`&`) giữ 1 ở vị trí cả hai bit đều là 1, **OR** (`|`) ở vị trí có ít nhất một bit 1, và **XOR** (`^`) ở vị trí hai bit khác nhau. **Phép dịch** di chuyển mọi bit: `x << 1` nhân đôi một số và `x >> 1` chia đôi (bỏ phần dư).

Mẹo hữu ích: `x & 1` cho biết x lẻ hay chẵn; vòng lặp `count += x & 1; x >>= 1` đếm số bit 1; và vì `x ^ x = 0` và `x ^ 0 = x`, XOR một danh sách mà mọi số xuất hiện hai lần trừ một số sẽ để lại đúng số đó (Single Number). Bit cũng gói nhiều cờ đúng/sai vào một số nguyên, như quyền truy cập tệp và cờ tính năng.
