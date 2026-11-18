---
id: hash-implementation
order: 27
section: BĂM
title: Cài đặt bảng băm
summary: Xô, va chạm, thay đổi kích thước
duration: 29 phút
description: "Bên trong bảng băm: hàm băm chọn xô, nối chuỗi xử lý va chạm, và thay đổi kích thước giữ cho chuỗi ngắn."
goal: Cài đặt put/get bằng nối chuỗi và giải thích hệ số tải và băm lại.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Biến khóa thành chỉ số mảng
formula: xô = hash(khóa) % sức_chứa · hệ số tải = số_phần_tử / sức_chứa
takeaways:
  - label: Hàm băm
    text: "Tất định: cùng khóa, cùng xô."
  - label: Va chạm
    text: "Khóa khác nhau, cùng xô: nối chuỗi."
  - label: Hệ số tải
    text: Trên ~0,75 thì gấp đôi và băm lại.
widget: hash-buckets
widgetTitle: Đặt khóa vào các xô
widgetDescription: Xem phép tính băm cho từng khóa, va chạm nối thành chuỗi, và bảng tăng gấp đôi khi quá đầy.
code:
  file: hash_map.py
  lang: python
  source: |-
    class HashMap:
        """Separate chaining: each bucket is a list of [key, value] pairs."""
        def __init__(self, capacity=4):
            self.buckets = [[] for _ in range(capacity)]
            self.size = 0

        def _bucket(self, key):
            return self.buckets[hash(key) % len(self.buckets)]

        def put(self, key, value):
            bucket = self._bucket(key)
            for pair in bucket:
                if pair[0] == key:
                    pair[1] = value            # existing key: update
                    return
            bucket.append([key, value])
            self.size += 1
            if self.size / len(self.buckets) > 0.75:
                self._resize()                 # keep chains short

        def get(self, key):
            for k, v in self._bucket(key):
                if k == key:
                    return v
            return None

        def _resize(self):
            pairs = [p for b in self.buckets for p in b]
            self.buckets = [[] for _ in range(len(self.buckets) * 2)]
            for k, v in pairs:
                self._bucket(k).append([k, v])

    m = HashMap()
    for i, fruit in enumerate(["apple", "banana", "cherry", "date", "elderberry"]):
        m.put(fruit, i)
    m.put("apple", 100)
    print(m.get("apple"), m.get("date"), m.get("fig"))
    print("buckets:", len(m.buckets), "items:", m.size)
  output: |-
    100 3 None
    buckets: 8 items: 5
  description: Một bảng băm nhỏ với nối chuỗi riêng và thay đổi kích thước.
  variants:
    - lang: javascript
      file: hash_map.js
      source: |-
        // Separate chaining: each bucket is an array of [key, value] pairs.
        // A simple string hash keeps the example self-contained.
        function hashString(s) {
          let h = 0;
          for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
          return h;
        }

        class HashMap {
          constructor(capacity = 4) {
            this.buckets = Array.from({ length: capacity }, () => []);
            this.size = 0;
          }
          bucket(key) { return this.buckets[hashString(key) % this.buckets.length]; }

          put(key, value) {
            const b = this.bucket(key);
            const pair = b.find((p) => p[0] === key);
            if (pair) { pair[1] = value; return; }       // existing key: update
            b.push([key, value]);
            this.size++;
            if (this.size / this.buckets.length > 0.75) this.resize();
          }

          get(key) {
            const pair = this.bucket(key).find((p) => p[0] === key);
            return pair ? pair[1] : null;
          }

          resize() {
            const pairs = this.buckets.flat();
            this.buckets = Array.from({ length: this.buckets.length * 2 }, () => []);
            for (const [k, v] of pairs) this.bucket(k).push([k, v]);
          }
        }

        const m = new HashMap();
        ["apple", "banana", "cherry", "date", "elderberry"].forEach((fruit, i) => m.put(fruit, i));
        m.put("apple", 100);
        console.log(m.get("apple"), m.get("date"), m.get("fig"));
        console.log("buckets:", m.buckets.length, "items:", m.size);
      output: |-
        100 3 null
        buckets: 8 items: 5
    - lang: cpp
      file: hash_map.cpp
      source: |-
        #include <functional>
        #include <iostream>
        #include <list>
        #include <string>
        #include <utility>
        #include <vector>
        using namespace std;

        // Separate chaining: each bucket is a linked list of (key, value) pairs.
        class HashMap {
            vector<list<pair<string, int>>> buckets;
            size_t count = 0;

            list<pair<string, int>>& bucket(const string& key) { return buckets[hash<string>{}(key) % buckets.size()]; }

            void resize() {
                vector<list<pair<string, int>>> old = std::move(buckets);
                buckets.assign(old.size() * 2, {});
                for (auto& b : old)
                    for (auto& p : b) bucket(p.first).push_back(p);
            }

        public:
            HashMap(size_t capacity = 4) : buckets(capacity) {}

            void put(const string& key, int value) {
                for (auto& p : bucket(key))
                    if (p.first == key) { p.second = value; return; }   // existing key: update
                bucket(key).push_back({key, value});
                if (++count > buckets.size() * 3 / 4) resize();          // keep chains short
            }

            int get(const string& key, int fallback = -1) {
                for (auto& p : bucket(key))
                    if (p.first == key) return p.second;
                return fallback;
            }

            size_t bucketCount() const { return buckets.size(); }
            size_t size() const { return count; }
        };

        int main() {
            HashMap m;
            vector<string> fruits = {"apple", "banana", "cherry", "date", "elderberry"};
            for (size_t i = 0; i < fruits.size(); i++) m.put(fruits[i], i);
            m.put("apple", 100);
            cout << m.get("apple") << " " << m.get("date") << " " << m.get("fig") << endl;
            cout << "buckets: " << m.bucketCount() << " items: " << m.size() << endl;
        }
      output: |-
        100 3 -1
        buckets: 8 items: 5
complexity:
  - op: put / get (trung bình)
    time: O(1)
    space: O(n)
  - op: Thay đổi kích thước (băm lại hết)
    time: O(n)
    space: O(n)
  - op: Mọi khóa vào một xô
    time: O(n)
    space: O(n)
videos:
  - title: What is a HashTable Data Structure - Introduction to Hash Tables , Part 0
    channel: Paul Programming
    url: https://www.youtube.com/watch?v=MfhjkfocRR0
  - title: Hash tables in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=knV86FlSXJ8
practice:
  - title: Design HashSet
    url: https://leetcode.com/problems/design-hashset/
    difficulty: easy
  - title: Design HashMap
    url: https://leetcode.com/problems/design-hashmap/
    difficulty: easy
reflectionPrompt: Điều gì xảy ra nếu hàm băm trả về cùng một số cho mọi khóa?
---

Bảng băm là một mảng các **xô**. Hàm băm biến khóa thành một số nguyên lớn, và `% sức_chứa` ánh xạ nó vào chỉ số xô, nên tìm xô tốn O(1). Hai khóa khác nhau có thể rơi vào cùng một xô: đó là **va chạm**. Với **nối chuỗi riêng**, mỗi xô giữ một danh sách nhỏ và ta duyệt nó để tìm khóa.

**Hệ số tải** là số phần tử ÷ số xô. Nếu nó tăng, chuỗi dài ra và tra cứu chậm đi. Vì vậy khi vượt ngưỡng (thường 0,75), bảng cấp phát gấp đôi số xô và **băm lại** mọi khóa, một bước O(n) hiếm khi xảy ra, nên các thao tác vẫn O(1) trung bình, giống việc mở rộng mảng động. Hàm băm tốt phân tán khóa đều; hàm băm tệ dồn mọi thứ vào một xô và suy biến thành O(n).
