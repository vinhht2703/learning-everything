---
id: stacks
order: 4
section: MẢNG
title: Ngăn xếp (Stack)
summary: Vào sau, ra trước
duration: 4 phút
description: "Ngăn xếp chỉ cho phép thêm, đọc và xóa ở một đầu: đỉnh. Mảng động giúp cả ba thao tác đều O(1)."
goal: Dùng được push, pop, peek và nhận ra các bài toán cần "gần nhất trước".
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Giống một chồng đĩa
formula: push → đỉnh · pop ← đỉnh · peek = đỉnh
takeaways:
  - label: LIFO
    text: Phần tử được đẩy vào sau cùng sẽ được lấy ra đầu tiên.
  - label: Chỉ ở đỉnh
    text: Không truy cập phần giữa; đó chính là mục đích.
  - label: Ứng dụng
    text: Hoàn tác, nút quay lại, dấu ngoặc, đệ quy.
widget: stack
widgetTitle: Push, pop và peek
widgetDescription: Chỉ chạm được vào đỉnh ngăn xếp. Thử pop cho đến khi rỗng.
code:
  file: stack.py
  lang: python
  source: |-
    stack = []
    stack.append(1)      # push
    stack.append(2)
    stack.append(3)

    print(stack[-1])     # peek -> top
    print(stack.pop())   # pop the top
    print(stack)
  output: |-
    3
    3
    [1, 2]
  description: "List của Python dùng được như ngăn xếp: append là push, pop là pop."
  variants:
    - lang: javascript
      file: stack.js
      source: |-
        const stack = [];
        stack.push(1);
        stack.push(2);
        stack.push(3);

        console.log(stack[stack.length - 1]); // peek -> top
        console.log(stack.pop());             // pop the top
        console.log(stack);
      output: |-
        3
        3
        [ 1, 2 ]
    - lang: cpp
      file: stack.cpp
      source: |-
        #include <iostream>
        #include <stack>
        using namespace std;

        int main() {
            stack<int> s;
            s.push(1);
            s.push(2);
            s.push(3);

            cout << s.top() << endl;  // peek
            s.pop();                  // pop removes the top (returns nothing)
            cout << "size after pop: " << s.size() << endl;
        }
      output: |-
        3
        size after pop: 2
complexity:
  - op: Push
    time: O(1)
    space: O(1)
  - op: Pop
    time: O(1)
    space: O(1)
  - op: Peek
    time: O(1)
    space: O(1)
videos:
  - title: "Data structures: Introduction to stack"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=F1F2imiOJfk
  - title: "Data structures: Array implementation of stacks"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=sFVxsglODoo
practice:
  - title: Baseball Game
    url: https://leetcode.com/problems/baseball-game/
    difficulty: easy
  - title: Valid Parentheses
    url: https://leetcode.com/problems/valid-parentheses/
    difficulty: easy
  - title: Min Stack
    url: https://leetcode.com/problems/min-stack/
    difficulty: medium
reflectionPrompt: Kể tên một ứng dụng bạn dùng hằng ngày hoạt động giống ngăn xếp.
---

Ngăn xếp hoạt động theo LIFO: vào sau, ra trước. Bạn đẩy (push) lên đỉnh, lấy ra (pop) từ đỉnh và xem (peek) đỉnh mà không xóa. Vì đỉnh chỉ là cuối của một mảng động nên mọi thao tác đều O(1).

Ngăn xếp xuất hiện bất cứ khi nào phần tử gần nhất cần được xử lý trước: lịch sử hoàn tác, nút quay lại của trình duyệt, kiểm tra dấu ngoặc và ngăn xếp lời gọi chạy các hàm đệ quy (bạn sẽ gặp lại ở phần đệ quy).
