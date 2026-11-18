---
id: queues
order: 7
section: LINKED LISTS
title: Queues
summary: First in, first out
duration: 4 min
description: A queue adds at the back and removes from the front, like a line at a shop. A linked list or deque makes both ends O(1).
goal: Use enqueue and dequeue, and explain why a plain array is a poor queue.
eyebrow: THE BIG IDEA
conceptTitle: "Fair order: first come, first served"
formula: enqueue → back · front → dequeue
takeaways:
  - label: FIFO
    text: The first item added is the first removed.
  - label: deque
    text: "Python's double-ended queue: O(1) at both ends."
  - label: Uses
    text: Task scheduling, buffers, breadth-first search.
widget: queue
widgetTitle: Enqueue and dequeue
widgetDescription: Items join at the back and leave from the front, in arrival order.
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
  description: collections.deque is the standard queue in Python.
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
  - op: Dequeue (deque / linked list)
    time: O(1)
    space: O(1)
  - op: Dequeue (plain array)
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
reflectionPrompt: Why would list.pop(0) be slow for a queue with a million items?
---

A queue is FIFO: first in, first out. New items join the back (enqueue) and leave from the front (dequeue).

With a plain array, removing the front element shifts everything left, which is O(n). A linked list with head and tail pointers, or Python's `collections.deque`, does both operations in O(1). Queues schedule print jobs, buffer network messages, and power breadth-first search, which you will use later on trees and graphs.
