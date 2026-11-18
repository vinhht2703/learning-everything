---
id: singly-linked-lists
order: 5
section: LINKED LISTS
title: Singly linked lists
summary: Nodes connected by next pointers
duration: 12 min
description: A linked list stores each value in its own node, scattered in memory, and links the nodes together with pointers.
goal: Add and remove at the ends in O(1), and explain why finding a value is O(n).
eyebrow: THE BIG IDEA
conceptTitle: Follow the arrows
formula: node = value + next  ·  head → … → tail → null
takeaways:
  - label: Node
    text: A value plus a pointer to the next node.
  - label: Head / tail
    text: Pointers to the first and last nodes.
  - label: Dummy node
    text: A placeholder head that removes empty-list edge cases.
widget: singly-list
widgetTitle: Build and search a linked list
widgetDescription: Add at either end, remove the head, then search to see the walk from the head.
code:
  file: linked_list.py
  lang: python
  source: |-
    class ListNode:
        def __init__(self, val):
            self.val = val
            self.next = None

    class LinkedList:
        def __init__(self):
            self.head = ListNode(-1)   # dummy node
            self.tail = self.head

        def append(self, val):
            self.tail.next = ListNode(val)
            self.tail = self.tail.next

        def to_list(self):
            cur, out = self.head.next, []
            while cur:
                out.append(cur.val)
                cur = cur.next
            return out

    lst = LinkedList()
    for v in [1, 2, 3]:
        lst.append(v)
    print(lst.to_list())
  output: "[1, 2, 3]"
  description: A singly linked list with a dummy head and a tail pointer.
  variants:
    - lang: javascript
      file: linked_list.js
      source: |-
        class ListNode {
          constructor(val) {
            this.val = val;
            this.next = null;
          }
        }

        class LinkedList {
          constructor() {
            this.head = new ListNode(-1); // dummy node
            this.tail = this.head;
          }

          append(val) {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
          }

          toArray() {
            const out = [];
            for (let cur = this.head.next; cur; cur = cur.next) out.push(cur.val);
            return out;
          }
        }

        const lst = new LinkedList();
        for (const v of [1, 2, 3]) lst.append(v);
        console.log(lst.toArray());
      output: "[ 1, 2, 3 ]"
    - lang: cpp
      file: linked_list.cpp
      source: |-
        #include <iostream>
        using namespace std;

        struct ListNode {
            int val;
            ListNode* next = nullptr;
            ListNode(int val) : val(val) {}
        };

        class LinkedList {
            ListNode* head = new ListNode(-1);  // dummy node
            ListNode* tail = head;

        public:
            ~LinkedList() {
                while (head) { ListNode* next = head->next; delete head; head = next; }
            }

            void append(int val) {
                tail->next = new ListNode(val);
                tail = tail->next;
            }

            void print() {
                for (ListNode* cur = head->next; cur; cur = cur->next) cout << cur->val << " -> ";
                cout << "null" << endl;
            }
        };

        int main() {
            LinkedList lst;
            for (int v : {1, 2, 3}) lst.append(v);
            lst.print();
        }
      output: 1 -> 2 -> 3 -> null
complexity:
  - op: Access / search
    time: O(n)
    space: O(1)
  - op: Insert / remove at head
    time: O(1)
    space: O(1)
  - op: Insert at tail (with tail pointer)
    time: O(1)
    space: O(1)
  - op: Remove at tail
    time: O(n)
    space: O(1)
videos:
  - title: Introduction to linked list
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=NobHlGUjV3g
  - title: Linked List - Implementation in C/C++
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=vcQIFT79_50
  - title: Design a Singly Linked List
    channel: NeetCodeIO
    url: https://www.youtube.com/watch?v=xqAvQsy5KkI
    note: solution walkthrough
practice:
  - title: Reverse Linked List
    url: https://leetcode.com/problems/reverse-linked-list/
    difficulty: easy
  - title: Merge Two Sorted Lists
    url: https://leetcode.com/problems/merge-two-sorted-lists/
    difficulty: easy
  - title: Linked List Cycle
    url: https://leetcode.com/problems/linked-list-cycle/
    difficulty: easy
reflectionPrompt: When would you choose a linked list over a dynamic array?
---

Each node holds a value and a `next` pointer to the following node. The list keeps a `head` (first node) and often a `tail` (last node). The last node points to `null`.

Because nodes do not need to be contiguous, inserting or removing next to a node you already have is O(1): you just re-point arrows, no shifting. The trade-off is that there is no index math. To reach the 5th node you must walk from the head, so access and search are O(n).
