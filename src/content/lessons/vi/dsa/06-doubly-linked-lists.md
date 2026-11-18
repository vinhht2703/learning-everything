---
id: doubly-linked-lists
order: 6
section: DANH SÁCH LIÊN KẾT
title: Danh sách liên kết đôi
summary: Con trỏ prev và next
duration: 10 phút
description: Danh sách liên kết đôi thêm con trỏ `prev` vào mỗi nút, nên có thể di chuyển và xóa theo cả hai chiều.
goal: Cập nhật đúng cả hai con trỏ và xóa ở cả hai đầu với O(1).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Mỗi nút có hai mũi tên
formula: null ← head ⇄ … ⇄ tail → null
takeaways:
  - label: Con trỏ prev
    text: Mỗi nút cũng biết nút đứng trước nó.
  - label: O(1) ở cả hai đầu
    text: Thêm hoặc xóa ở đầu hay cuối ngay lập tức.
  - label: Nút canh
    text: Nút đầu và nút cuối giả giúp đơn giản hóa mọi cập nhật.
widget: doubly-list
widgetTitle: Thao tác từ cả hai đầu
widgetDescription: Thêm và xóa ở đầu và cuối. Mọi thao tác ở đây đều O(1).
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
  description: Nút đầu và cuối giả giúp việc cập nhật con trỏ đồng nhất.
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
  - op: Truy cập / tìm kiếm
    time: O(n)
    space: O(1)
  - op: Chèn / xóa ở đầu
    time: O(1)
    space: O(1)
  - op: Chèn / xóa ở cuối
    time: O(1)
    space: O(1)
  - op: Xóa một nút đã biết
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
reflectionPrompt: Danh sách liên kết đôi giúp nút quay lại và tiến tới của trình duyệt hoạt động như thế nào?
---

Khi chỉ có con trỏ `next`, xóa nút cuối tốn O(n) vì phải tìm nút đứng trước nó. Thêm `prev` giải quyết điều đó: nút cuối biết nút trước nó, nên xóa ở cuối trở thành O(1).

Đổi lại, mỗi nút tốn thêm một con trỏ và việc cập nhật phải cẩn thận hơn: mỗi lần chèn hoặc xóa thay đổi tới bốn liên kết. Dùng hai nút giả (một trước đầu, một sau cuối) giúp không bao giờ phải xử lý riêng danh sách rỗng. Lịch sử trình duyệt và bộ nhớ đệm LRU được xây theo cách này.
