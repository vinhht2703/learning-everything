---
id: factorial
order: 8
section: ĐỆ QUY
title: "Đệ quy: giai thừa"
summary: Trường hợp cơ sở + trường hợp đệ quy
duration: 11 phút
description: Hàm đệ quy giải bài toán bằng cách tự gọi chính nó với phiên bản nhỏ hơn của cùng bài toán.
goal: Viết hàm đệ quy có trường hợp cơ sở và lần theo các lời gọi trên ngăn xếp lời gọi.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Thu nhỏ bài toán cho đến khi hiển nhiên
formula: n! = n × (n − 1)!   ·   1! = 1
takeaways:
  - label: Trường hợp cơ sở
    text: Đầu vào đủ nhỏ để trả lời mà không cần đệ quy.
  - label: Trường hợp đệ quy
    text: Tự gọi với đầu vào nhỏ hơn, rồi kết hợp kết quả.
  - label: Ngăn xếp lời gọi
    text: Mỗi lời gọi đang chờ nằm trong một khung cho đến khi lời gọi con trả về.
widget: call-stack
widgetTitle: Chạy từng bước ngăn xếp lời gọi
widgetDescription: Các khung chồng lên đến trường hợp cơ sở, rồi lần lượt trả về khi mỗi lời gọi có kết quả.
code:
  file: factorial.py
  lang: python
  source: |-
    def factorial(n):
        if n <= 1:                     # base case
            return 1
        return n * factorial(n - 1)    # recursive case

    print(factorial(5))
  output: "120"
  description: Hàm đệ quy kinh điển đầu tiên.
  variants:
    - lang: javascript
      file: factorial.js
      source: |-
        function factorial(n) {
          if (n <= 1) return 1;            // base case
          return n * factorial(n - 1);     // recursive case
        }

        console.log(factorial(5));
      output: "120"
    - lang: cpp
      file: factorial.cpp
      source: |-
        #include <iostream>
        using namespace std;

        long long factorial(int n) {
            if (n <= 1) return 1;            // base case
            return n * factorial(n - 1);     // recursive case
        }

        int main() {
            cout << factorial(5) << endl;
        }
      output: "120"
complexity:
  - op: factorial(n)
    time: O(n)
    space: O(n) ngăn xếp lời gọi
videos:
  - title: "Introduction to Recursion (Data Structures & Algorithms #6)"
    channel: CS Dojo
    url: https://www.youtube.com/watch?v=B0NtAFf4bvU
  - title: How recursion works (actual flow using stack memory) - explained with factorial program
    channel: Team MAST
    url: https://www.youtube.com/watch?v=hKz9QnsLYzE
  - title: 5 Simple Steps for Solving Any Recursive Problem
    channel: Reducible
    url: https://www.youtube.com/watch?v=ngCos392W4w
practice:
  - title: Reverse String (solve it recursively)
    url: https://leetcode.com/problems/reverse-string/
    difficulty: easy
  - title: Power of Two
    url: https://leetcode.com/problems/power-of-two/
    difficulty: easy
reflectionPrompt: Trường hợp cơ sở khi tính tổng một danh sách bằng đệ quy là gì?
---

Mọi hàm đệ quy cần hai phần. **Trường hợp cơ sở** trả lời trực tiếp với đầu vào nhỏ nhất (`factorial(1) = 1`). **Trường hợp đệ quy** thu nhỏ bài toán và tự gọi lại (`n * factorial(n - 1)`). Không có trường hợp cơ sở, các lời gọi không bao giờ dừng và Python báo lỗi RecursionError.

Mỗi lời gọi có một khung riêng trên ngăn xếp lời gọi, đây là một ngăn xếp thật: khung được đẩy vào khi đi xuống và lấy ra khi kết quả trả về. `factorial(n)` thực hiện n lời gọi, nên tốn O(n) thời gian và O(n) bộ nhớ ngăn xếp.
