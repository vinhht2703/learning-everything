---
id: fibonacci
order: 9
section: ĐỆ QUY
title: "Đệ quy: Fibonacci"
summary: Hai nhánh mỗi lời gọi, rồi ghi nhớ
duration: 13 phút
description: Fibonacci tự gọi hai lần mỗi bước. Cây đệ quy bùng nổ, cho đến khi bạn ghi nhớ các kết quả đã tính.
goal: Vẽ cây đệ quy, đếm số lời gọi và tăng tốc bằng ghi nhớ (memoization).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Công việc lặp lại ẩn trong cây
formula: fib(n) = fib(n − 1) + fib(n − 2)   ·   fib(0) = 0, fib(1) = 1
takeaways:
  - label: Phân nhánh
    text: Hai lời gọi đệ quy mỗi bước tạo ra một cây lời gọi.
  - label: Bài toán con chồng lấn
    text: Cùng một đầu vào bị giải đi giải lại.
  - label: Ghi nhớ
    text: "Lưu kết quả vào dict: O(2ⁿ) → O(n)."
widget: fib-tree
widgetTitle: Khám phá cây đệ quy
widgetDescription: Tăng n để thấy cây bùng nổ, rồi bật ghi nhớ để cắt tỉa nó.
code:
  file: fibonacci.py
  lang: python
  source: |-
    def fib(n):
        if n <= 1:
            return n
        return fib(n - 1) + fib(n - 2)

    def fib_memo(n, memo):
        if n <= 1:
            return n
        if n not in memo:
            memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
        return memo[n]

    print(fib(10), fib_memo(10, {}))
  output: 55 55
  description: Cùng một kết quả, khối lượng công việc rất khác nhau.
  variants:
    - lang: javascript
      file: fibonacci.js
      source: |-
        function fib(n) {
          if (n <= 1) return n;
          return fib(n - 1) + fib(n - 2);
        }

        function fibMemo(n, memo = new Map()) {
          if (n <= 1) return n;
          if (!memo.has(n)) memo.set(n, fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
          return memo.get(n);
        }

        console.log(fib(10), fibMemo(10));
      output: 55 55
    - lang: cpp
      file: fibonacci.cpp
      source: |-
        #include <iostream>
        #include <unordered_map>
        using namespace std;

        int fib(int n) {
            if (n <= 1) return n;
            return fib(n - 1) + fib(n - 2);
        }

        int fibMemo(int n, unordered_map<int, int>& memo) {
            if (n <= 1) return n;
            if (!memo.count(n)) memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
            return memo[n];
        }

        int main() {
            unordered_map<int, int> memo;
            cout << fib(10) << " " << fibMemo(10, memo) << endl;
        }
      output: 55 55
complexity:
  - op: fib(n), đơn giản
    time: O(2ⁿ)
    space: O(n)
  - op: fib(n), có ghi nhớ
    time: O(n)
    space: O(n)
videos:
  - title: Recursive Fibonacci Calls (Diagrammed)
    channel: Khan Academy Computing
    url: https://www.youtube.com/watch?v=214lD7tWkz8
  - title: How Recursive Fibonacci Works in Python | Call Stack Explained Step by Step
    channel: Amulya's Academy
    url: https://www.youtube.com/watch?v=irIFdsXl4qk
  - title: Recursion in Programming - Full Course
    channel: freeCodeCamp.org
    url: https://www.youtube.com/watch?v=IJDJ0kBx2LM
    note: bài học dài, chuyên sâu
practice:
  - title: Fibonacci Number
    url: https://leetcode.com/problems/fibonacci-number/
    difficulty: easy
  - title: N-th Tribonacci Number
    url: https://leetcode.com/problems/n-th-tribonacci-number/
    difficulty: easy
  - title: Climbing Stairs
    url: https://leetcode.com/problems/climbing-stairs/
    difficulty: easy
reflectionPrompt: Climbing Stairs trông khác Fibonacci. Hai bài có điểm gì chung?
---

Phiên bản đơn giản rẽ thành hai lời gọi mỗi lần, nên số lời gọi gần như gấp đôi theo n: khoảng O(2ⁿ) thời gian. Nhìn vào cây, bạn sẽ thấy `fib(2)` và `fib(3)` bị tính đi tính lại nhiều lần.

**Ghi nhớ (memoization)** lưu mỗi kết quả ở lần tính đầu tiên và dùng lại về sau. Khi đó mỗi `fib(k)` chỉ được tính một lần, nên thời gian giảm còn O(n). Nhận ra các bài toán con chồng lấn như thế này là bước đầu tiên hướng tới quy hoạch động ở phần sau của khóa học.
