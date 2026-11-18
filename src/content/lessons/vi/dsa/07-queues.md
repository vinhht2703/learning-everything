---
id: queues
order: 7
section: DANH SÁCH LIÊN KẾT
title: Hàng đợi (Queue)
summary: Vào trước, ra trước
duration: 4 phút
description: Hàng đợi thêm ở cuối và lấy ra ở đầu, giống xếp hàng ở cửa hàng. Danh sách liên kết hoặc deque giúp cả hai đầu đều O(1).
goal: Dùng được enqueue và dequeue, và giải thích vì sao mảng thường là hàng đợi kém.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: "Thứ tự công bằng: đến trước, phục vụ trước"
formula: enqueue → cuối · đầu → dequeue
takeaways:
  - label: FIFO
    text: Phần tử được thêm đầu tiên sẽ được lấy ra đầu tiên.
  - label: deque
    text: "Hàng đợi hai đầu của Python: O(1) ở cả hai đầu."
  - label: Ứng dụng
    text: Xếp lịch tác vụ, bộ đệm, tìm kiếm theo chiều rộng.
widget: queue
widgetTitle: Enqueue và dequeue
widgetDescription: Phần tử vào ở cuối và rời đi ở đầu, theo đúng thứ tự đến.
code:
  file: queue.py
  lang: python
  source: |-
    from collections import deque

    queue = deque()
    queue.append("A")        # enqueue at the back
    queue.append("B")
    queue.append("C")

    print(queue.popleft())   # dequeue from the front
    print(list(queue))
  output: |-
    A
    ['B', 'C']
  description: collections.deque là hàng đợi chuẩn trong Python.
  variants:
    - lang: javascript
      file: queue.js
      source: |-
        // JavaScript has no built-in deque; a linked list gives O(1) at both ends.
        class Queue {
          constructor() { this.head = null; this.tail = null; this.size = 0; }

          enqueue(val) {                       // add at the back
            const node = { val, next: null };
            if (this.tail) this.tail.next = node; else this.head = node;
            this.tail = node;
            this.size++;
          }

          dequeue() {                          // remove from the front
            const node = this.head;
            this.head = node.next;
            if (!this.head) this.tail = null;
            this.size--;
            return node.val;
          }
        }

        const queue = new Queue();
        queue.enqueue("A");
        queue.enqueue("B");
        queue.enqueue("C");
        console.log(queue.dequeue());
        console.log(queue.size);
      output: |-
        A
        2
    - lang: cpp
      file: queue.cpp
      source: |-
        #include <iostream>
        #include <queue>
        #include <string>
        using namespace std;

        int main() {
            queue<string> q;
            q.push("A");   // enqueue at the back
            q.push("B");
            q.push("C");

            cout << q.front() << endl;  // front of the queue
            q.pop();                    // dequeue
            cout << "next: " << q.front() << ", size: " << q.size() << endl;
        }
      output: |-
        A
        next: B, size: 2
complexity:
  - op: Enqueue
    time: O(1)
    space: O(1)
  - op: Dequeue (deque / danh sách liên kết)
    time: O(1)
    space: O(1)
  - op: Dequeue (mảng thường)
    time: O(n)
    space: O(1)
videos:
  - title: "Data structures: Introduction to Queues"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=XuCbpw6Bj1U
  - title: "Data structures: Array implementation of Queue"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=okr-XE8yTO8
practice:
  - title: Number of Students Unable to Eat Lunch
    url: https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/
    difficulty: easy
  - title: Implement Stack using Queues
    url: https://leetcode.com/problems/implement-stack-using-queues/
    difficulty: easy
  - title: Design Circular Queue
    url: https://leetcode.com/problems/design-circular-queue/
    difficulty: medium
reflectionPrompt: Vì sao list.pop(0) sẽ chậm với hàng đợi có một triệu phần tử?
---

Hàng đợi hoạt động theo FIFO: vào trước, ra trước. Phần tử mới vào ở cuối (enqueue) và rời đi ở đầu (dequeue).

Với mảng thường, xóa phần tử đầu khiến mọi thứ dịch sang trái, tốn O(n). Danh sách liên kết có con trỏ đầu và cuối, hoặc `collections.deque` của Python, làm cả hai thao tác với O(1). Hàng đợi dùng để xếp lịch in, đệm tin nhắn mạng và chạy tìm kiếm theo chiều rộng (BFS) mà bạn sẽ dùng sau này với cây và đồ thị.
