---
id: lru-cache
order: 35
section: TỔNG HỢP
title: "Dự án nhỏ: bộ đệm LRU"
summary: Bảng băm + danh sách liên kết đôi
duration: 25 phút
description: Kết hợp hai cấu trúc trong khóa học để xây bộ đệm loại bỏ phần tử ít dùng gần đây nhất, với get và put O(1).
goal: Thiết kế bộ đệm LRU và giải thích vì sao nó cần cả bảng băm lẫn danh sách liên kết đôi.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Chọn đúng cấu trúc cho từng việc
formula: "map: khóa → nút (tìm trong O(1)) · list: thứ tự dùng (di chuyển / loại trong O(1))"
takeaways:
  - label: Bảng băm
    text: Tìm nút của một khóa trong O(1).
  - label: Danh sách liên kết đôi
    text: Sắp lại thứ tự và loại bỏ trong O(1).
  - label: Kết hợp
    text: Hệ thống thực tế kết hợp các cấu trúc đơn giản.
widget: lru-sim
widgetTitle: Mô phỏng bộ đệm LRU
widgetDescription: Đặt và lấy khóa. Xem thứ tự sử dụng thay đổi và khóa cũ nhất bị loại khi bộ đệm đầy.
code:
  file: lru_cache.py
  lang: python
  source: |-
    class Node:
        def __init__(self, key=0, val=0):
            self.key, self.val = key, val
            self.prev = self.next = None

    class LRUCache:
        """Hash map (key -> node) + doubly linked list (most recent at the right)."""
        def __init__(self, capacity):
            self.capacity = capacity
            self.map = {}
            self.left, self.right = Node(), Node()      # dummy ends: left = least recent
            self.left.next, self.right.prev = self.right, self.left

        def _remove(self, node):
            node.prev.next, node.next.prev = node.next, node.prev

        def _append(self, node):                        # insert just before the right dummy
            node.prev, node.next = self.right.prev, self.right
            self.right.prev.next = self.right.prev = node

        def get(self, key):
            if key not in self.map:
                return -1
            node = self.map[key]
            self._remove(node)
            self._append(node)                          # mark as most recently used
            return node.val

        def put(self, key, val):
            if key in self.map:
                self._remove(self.map[key])
            self.map[key] = Node(key, val)
            self._append(self.map[key])
            if len(self.map) > self.capacity:           # evict the least recently used
                lru = self.left.next
                self._remove(lru)
                del self.map[lru.key]

        def keys(self):
            out, node = [], self.left.next
            while node is not self.right:
                out.append(node.key)
                node = node.next
            return out

    cache = LRUCache(2)
    cache.put(1, "one")
    cache.put(2, "two")
    print(cache.get(1))          # 1 is now the most recent
    cache.put(3, "three")        # evicts 2, the least recently used
    print(cache.get(2), cache.get(3), cache.keys())
  output: |-
    one
    -1 three [1, 3]
  description: Bộ đệm LRU xây từ bảng băm và danh sách liên kết đôi.
  variants:
    - lang: javascript
      file: lru_cache.js
      source: |-
        // Hash map (key -> node) + doubly linked list (most recent at the right).
        class LRUCache {
          constructor(capacity) {
            this.capacity = capacity;
            this.map = new Map();
            this.left = { key: null }; this.right = { key: null };   // dummy ends
            this.left.next = this.right; this.right.prev = this.left;
          }
          remove(node) { node.prev.next = node.next; node.next.prev = node.prev; }
          append(node) {                                             // just before the right dummy
            node.prev = this.right.prev; node.next = this.right;
            this.right.prev.next = node; this.right.prev = node;
          }
          get(key) {
            if (!this.map.has(key)) return -1;
            const node = this.map.get(key);
            this.remove(node);
            this.append(node);                                       // most recently used
            return node.val;
          }
          put(key, val) {
            if (this.map.has(key)) this.remove(this.map.get(key));
            const node = { key, val };
            this.map.set(key, node);
            this.append(node);
            if (this.map.size > this.capacity) {                     // evict the least recently used
              const lru = this.left.next;
              this.remove(lru);
              this.map.delete(lru.key);
            }
          }
          keys() {
            const out = [];
            for (let n = this.left.next; n !== this.right; n = n.next) out.push(n.key);
            return out;
          }
        }

        const cache = new LRUCache(2);
        cache.put(1, "one");
        cache.put(2, "two");
        console.log(cache.get(1));           // 1 is now the most recent
        cache.put(3, "three");               // evicts 2
        console.log(cache.get(2), cache.get(3), cache.keys());
      output: |-
        one
        -1 three [ 1, 3 ]
    - lang: cpp
      file: lru_cache.cpp
      source: |-
        #include <iostream>
        #include <list>
        #include <string>
        #include <unordered_map>
        #include <utility>
        using namespace std;

        // Hash map (key -> list position) + doubly linked list (most recent at the back).
        class LRUCache {
            size_t capacity;
            list<pair<int, string>> order;                                  // std::list is a doubly linked list
            unordered_map<int, list<pair<int, string>>::iterator> map;

        public:
            LRUCache(size_t capacity) : capacity(capacity) {}

            string get(int key) {
                auto it = map.find(key);
                if (it == map.end()) return "-1";
                order.splice(order.end(), order, it->second);               // move to the back: most recent
                return it->second->second;
            }

            void put(int key, const string& val) {
                auto it = map.find(key);
                if (it != map.end()) order.erase(it->second);
                order.push_back({key, val});
                map[key] = prev(order.end());
                if (map.size() > capacity) {                                // evict the least recently used
                    map.erase(order.front().first);
                    order.pop_front();
                }
            }

            void printKeys() {
                for (auto& [k, v] : order) cout << k << " ";
                cout << endl;
            }
        };

        int main() {
            LRUCache cache(2);
            cache.put(1, "one");
            cache.put(2, "two");
            cout << cache.get(1) << endl;      // 1 is now the most recent
            cache.put(3, "three");             // evicts 2
            cout << cache.get(2) << " " << cache.get(3) << " | keys: ";
            cache.printKeys();
        }
      output: |-
        one
        -1 three | keys: 1 3
complexity:
  - op: get
    time: O(1)
    space: O(1)
  - op: put (kèm loại bỏ)
    time: O(1)
    space: O(1)
  - op: Toàn bộ bộ đệm
    time: —
    space: O(capacity)
videos:
  - title: LRU Cache - Twitch Interview Question - Leetcode 146
    channel: NeetCode
    url: https://www.youtube.com/watch?v=7ABFKPK2hD4
practice:
  - title: LRU Cache
    url: https://leetcode.com/problems/lru-cache/
    difficulty: medium
  - title: Time Based Key-Value Store
    url: https://leetcode.com/problems/time-based-key-value-store/
    difficulty: medium
reflectionPrompt: Bạn sẽ kết hợp những cấu trúc nào trong khóa học để làm tính năng gợi ý tự động?
---

Bộ đệm giữ một số lượng phần tử giới hạn. Khi đầy, bộ đệm **LRU** (ít dùng gần đây nhất) loại bỏ phần tử lâu nhất chưa được dùng. Ta cần ba thao tác trong O(1): tìm phần tử theo khóa, đánh dấu vừa được dùng, và xóa phần tử cũ nhất.

Không cấu trúc đơn lẻ nào làm được cả ba. **Bảng băm** tìm khóa trong O(1) nhưng không biết thứ tự. **Danh sách liên kết đôi** có thể chuyển một nút về cuối hoặc xóa đầu trong O(1), nhưng tìm kiếm thì O(n). Kết hợp lại thì được: bảng băm lưu khóa → nút trong danh sách, còn danh sách lưu các nút theo thứ tự sử dụng, cũ nhất ở bên trái. `get` tra nút rồi chuyển nó sang phải; `put` nối thêm một nút và nếu vượt sức chứa thì xóa nút trái nhất khỏi cả hai cấu trúc. Trình duyệt, cơ sở dữ liệu và CPU đều dùng bộ đệm như vậy.
