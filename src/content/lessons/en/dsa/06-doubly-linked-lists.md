---
id: doubly-linked-lists
order: 6
section: LINKED LISTS
title: Doubly linked lists
summary: prev and next pointers
duration: 10 min
description: A doubly linked list adds a `prev` pointer to every node, so you can move and remove in both directions.
goal: Update both pointers correctly and remove from either end in O(1).
eyebrow: THE BIG IDEA
conceptTitle: Two arrows per node
formula: null ← head ⇄ … ⇄ tail → null
takeaways:
  - label: prev pointer
    text: Each node also knows the node before it.
  - label: O(1) at both ends
    text: Add or remove at the head or the tail instantly.
  - label: Sentinels
    text: Dummy head and tail nodes simplify every update.
widget: doubly-list
widgetTitle: Work from both ends
widgetDescription: Add and remove at the head and the tail. Every operation here is O(1).
code:
  file: doubly_linked_list.py
  lang: python
  source: |-
    class Node:
        def __init__(self, val):
            self.val = val
            self.prev = None
            self.next = None

    class DoublyLinkedList:
        def __init__(self):
            self.head = Node(0)          # left dummy
            self.tail = Node(0)          # right dummy
            self.head.next = self.tail
            self.tail.prev = self.head

        def add_back(self, val):
            node, last = Node(val), self.tail.prev
            last.next, node.prev = node, last
            node.next, self.tail.prev = self.tail, node

        def remove_back(self):
            last = self.tail.prev
            last.prev.next = self.tail
            self.tail.prev = last.prev
            return last.val

    dll = DoublyLinkedList()
    for v in [1, 2, 3]:
        dll.add_back(v)
    print(dll.remove_back())
  output: "3"
  description: Dummy head and tail nodes keep the pointer updates uniform.
  variants:
    - lang: javascript
      file: doubly_linked_list.js
      source: |-
        class Node {
          constructor(val) {
            this.val = val;
            this.prev = null;
            this.next = null;
          }
        }

        class DoublyLinkedList {
          constructor() {
            this.head = new Node(0); // left dummy
            this.tail = new Node(0); // right dummy
            this.head.next = this.tail;
            this.tail.prev = this.head;
          }

          addBack(val) {
            const node = new Node(val), last = this.tail.prev;
            last.next = node; node.prev = last;
            node.next = this.tail; this.tail.prev = node;
          }

          removeBack() {
            const last = this.tail.prev;
            last.prev.next = this.tail;
            this.tail.prev = last.prev;
            return last.val;
          }
        }

        const dll = new DoublyLinkedList();
        for (const v of [1, 2, 3]) dll.addBack(v);
        console.log(dll.removeBack());
      output: "3"
    - lang: cpp
      file: doubly_linked_list.cpp
      source: |-
        #include <iostream>
        using namespace std;

        struct Node {
            int val;
            Node* prev = nullptr;
            Node* next = nullptr;
            Node(int val) : val(val) {}
        };

        class DoublyLinkedList {
            Node* head = new Node(0);  // left dummy
            Node* tail = new Node(0);  // right dummy

        public:
            DoublyLinkedList() { head->next = tail; tail->prev = head; }
            ~DoublyLinkedList() {
                while (head) { Node* next = head->next; delete head; head = next; }
            }

            void addBack(int val) {
                Node* node = new Node(val);
                Node* last = tail->prev;
                last->next = node; node->prev = last;
                node->next = tail; tail->prev = node;
            }

            int removeBack() {
                Node* last = tail->prev;
                last->prev->next = tail;
                tail->prev = last->prev;
                int val = last->val;
                delete last;
                return val;
            }
        };

        int main() {
            DoublyLinkedList dll;
            for (int v : {1, 2, 3}) dll.addBack(v);
            cout << dll.removeBack() << endl;
        }
      output: "3"
complexity:
  - op: Access / search
    time: O(n)
    space: O(1)
  - op: Insert / remove at head
    time: O(1)
    space: O(1)
  - op: Insert / remove at tail
    time: O(1)
    space: O(1)
  - op: Remove a known node
    time: O(1)
    space: O(1)
videos:
  - title: Doubly Linked List Tutorial - What is a Doubly Linked List?
    channel: Tech With Tim
    url: https://www.youtube.com/watch?v=3RzC2NrCO24
  - title: Doubly Linked List - Implementation in C/C++
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=VOQNf1VxU3Q
practice:
  - title: Design Linked List
    url: https://leetcode.com/problems/design-linked-list/
    difficulty: medium
  - title: Design Browser History
    url: https://leetcode.com/problems/design-browser-history/
    difficulty: medium
reflectionPrompt: How would a doubly linked list power the back and forward buttons of a browser?
---

With only `next` pointers, removing the tail is O(n) because you must find the node before it. Adding `prev` fixes that: the tail knows its previous node, so removing from the back becomes O(1).

The cost is one extra pointer per node and more careful updates: every insert or remove changes up to four links. Using two dummy nodes (one before the head, one after the tail) means you never have to special-case an empty list. Browser history and LRU caches are built this way.
