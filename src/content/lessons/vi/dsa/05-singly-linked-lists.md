---
id: singly-linked-lists
order: 5
section: DANH SÁCH LIÊN KẾT
title: Danh sách liên kết đơn
summary: Các nút nối bằng con trỏ next
duration: 12 phút
description: Danh sách liên kết lưu mỗi giá trị trong một nút riêng, nằm rải rác trong bộ nhớ, và nối các nút với nhau bằng con trỏ.
goal: Thêm và xóa ở hai đầu với O(1), và giải thích vì sao tìm một giá trị là O(n).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đi theo mũi tên
formula: nút = giá trị + next  ·  head → … → tail → null
takeaways:
  - label: Nút
    text: Một giá trị cộng một con trỏ tới nút kế tiếp.
  - label: Đầu / cuối
    text: Con trỏ tới nút đầu tiên và nút cuối cùng.
  - label: Nút giả
    text: Một nút đầu giữ chỗ giúp tránh các trường hợp danh sách rỗng.
widget: singly-list
widgetTitle: Tạo và tìm kiếm trong danh sách liên kết
widgetDescription: Thêm ở hai đầu, xóa nút đầu, rồi tìm kiếm để thấy việc đi từ đầu danh sách.
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
  description: Danh sách liên kết đơn với nút đầu giả và con trỏ cuối.
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
  - op: Truy cập / tìm kiếm
    time: O(n)
    space: O(1)
  - op: Chèn / xóa ở đầu
    time: O(1)
    space: O(1)
  - op: Chèn ở cuối (có con trỏ cuối)
    time: O(1)
    space: O(1)
  - op: Xóa ở cuối
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
    note: giải bài chi tiết
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
reflectionPrompt: Khi nào bạn sẽ chọn danh sách liên kết thay vì mảng động?
---

Mỗi nút giữ một giá trị và một con trỏ `next` tới nút kế tiếp. Danh sách giữ `head` (nút đầu) và thường cả `tail` (nút cuối). Nút cuối trỏ tới `null`.

Vì các nút không cần liên tiếp nên chèn hoặc xóa cạnh một nút đã có trong tay là O(1): chỉ cần trỏ lại mũi tên, không cần dịch chuyển. Đổi lại, không thể tính vị trí theo chỉ số. Muốn tới nút thứ 5 phải đi từ đầu danh sách, nên truy cập và tìm kiếm là O(n).
