---
id: bst-sets-maps
order: 21
section: CÂY
title: Tập hợp và bản đồ dùng BST
summary: Khóa có thứ tự trong O(log n)
duration: 6 phút
description: BST có thể lưu các khóa duy nhất (tập hợp) hoặc cặp khóa-giá trị (bản đồ) mà vẫn giữ chúng có thứ tự.
goal: Dùng bản đồ dựa trên cây và so sánh với bảng băm.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Tập hợp có thứ tự
formula: "đặt / lấy / xóa: O(log n) · duyệt: có thứ tự, O(n)"
takeaways:
  - label: Tập hợp dạng cây
    text: Khóa duy nhất, luôn có thứ tự.
  - label: Bản đồ dạng cây
    text: Khóa → giá trị với khóa có thứ tự.
  - label: So với bảng băm
    text: "Băm: O(1) nhưng không thứ tự; cây: O(log n) và có thứ tự."
widget: bst-map
widgetTitle: Tạo một bản đồ có thứ tự
widgetDescription: Thêm tên kèm tuổi. Tên được đặt theo bảng chữ cái, nên khi duyệt luôn có thứ tự.
code:
  file: tree_map.py
  lang: python
  source: |-
    class Node:
        def __init__(self, key, value):
            self.key, self.value = key, value
            self.left = self.right = None

    class TreeMap:
        """A sorted map built on a binary search tree."""
        def __init__(self):
            self.root = None

        def put(self, key, value):
            def _put(node):
                if not node:
                    return Node(key, value)
                if key < node.key:
                    node.left = _put(node.left)
                elif key > node.key:
                    node.right = _put(node.right)
                else:
                    node.value = value      # same key: update the value
                return node
            self.root = _put(self.root)

        def items(self):                    # in-order traversal = sorted by key
            out, stack, cur = [], [], self.root
            while stack or cur:
                while cur:
                    stack.append(cur)
                    cur = cur.left
                cur = stack.pop()
                out.append((cur.key, cur.value))
                cur = cur.right
            return out

    ages = TreeMap()
    for name, age in [("Mai", 31), ("An", 24), ("Tuan", 28), ("Binh", 35), ("An", 25)]:
        ages.put(name, age)
    print(ages.items())
  output: "[('An', 25), ('Binh', 35), ('Mai', 31), ('Tuan', 28)]"
  description: Một bản đồ có thứ tự nhỏ dựa trên BST (C++ dùng std::map có sẵn).
  variants:
    - lang: javascript
      file: tree_map.js
      source: |-
        // JavaScript's Map keeps insertion order, not sorted order.
        // A BST-backed map keeps keys sorted:
        class TreeMap {
          #root = null;

          put(key, value) {
            const put = (node) => {
              if (!node) return { key, value, left: null, right: null };
              if (key < node.key) node.left = put(node.left);
              else if (key > node.key) node.right = put(node.right);
              else node.value = value;               // same key: update
              return node;
            };
            this.#root = put(this.#root);
          }

          *entries(node = this.#root) {             // in-order = sorted by key
            if (!node) return;
            yield* this.entries(node.left);
            yield [node.key, node.value];
            yield* this.entries(node.right);
          }
        }

        const ages = new TreeMap();
        for (const [name, age] of [["Mai", 31], ["An", 24], ["Tuan", 28], ["Binh", 35], ["An", 25]]) {
          ages.put(name, age);
        }
        console.log([...ages.entries()].map(([k, v]) => `${k}=${v}`).join(", "));
      output: An=25, Binh=35, Mai=31, Tuan=28
    - lang: cpp
      file: tree_map.cpp
      source: |-
        #include <iostream>
        #include <map>
        #include <set>
        #include <string>
        using namespace std;

        int main() {
            // std::map and std::set are balanced binary search trees (red-black trees):
            // insert / find / erase are O(log n) and iteration is in sorted order.
            map<string, int> ages;
            ages["Mai"] = 31;
            ages["An"] = 24;
            ages["Tuan"] = 28;
            ages["Binh"] = 35;
            ages["An"] = 25;            // same key: update the value

            for (const auto& [name, age] : ages) cout << name << "=" << age << " ";
            cout << endl;

            set<int> seen = {5, 1, 4, 1, 3};    // duplicates are dropped
            for (int x : seen) cout << x << " ";
            cout << endl;
        }
      output: |-
        An=25 Binh=35 Mai=31 Tuan=28 
        1 3 4 5
complexity:
  - op: đặt / lấy / xóa (cân bằng)
    time: O(log n)
    space: O(1)
  - op: Duyệt theo thứ tự
    time: O(n)
    space: O(h)
videos:
  - title: Binary Search Trees as Maps
    channel: Mark Lewis
    url: https://www.youtube.com/watch?v=irPbVRy8Gls
  - title: "8.4 Data Structures & Algorithms: Binary Search Trees (BSTs) for Ordered Collections"
    channel: Bill Siever
    url: https://www.youtube.com/watch?v=SfoBnrLX7Do
practice:
  - title: Contains Duplicate
    url: https://leetcode.com/problems/contains-duplicate/
    difficulty: easy
  - title: My Calendar I
    url: https://leetcode.com/problems/my-calendar-i/
    difficulty: medium
reflectionPrompt: Khi nào bạn chọn bản đồ dạng cây thay vì bảng băm trong dự án của mình?
---

Lưu một khóa trong mỗi nút, kèm một giá trị nếu là bản đồ. Quy tắc BST quyết định mỗi khóa nằm ở đâu, và duyệt trung thứ tự trả về các khóa theo thứ tự. Chèn một khóa đã có chỉ cập nhật giá trị của nó, nên khóa luôn duy nhất.

`std::map` / `std::set` của C++ và `TreeMap` / `TreeSet` của Java là các BST cân bằng với thao tác O(log n). Bảng băm (`dict` của Python, `Map` của JavaScript) nhanh hơn trung bình, O(1), nhưng không giữ khóa có thứ tự. Hãy chọn bản đồ dạng cây khi bạn cần duyệt theo thứ tự, khóa nhỏ nhất hoặc lớn nhất, hay "khóa kế tiếp sau x".
