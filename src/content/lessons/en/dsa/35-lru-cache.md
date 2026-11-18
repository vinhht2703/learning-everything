---
id: lru-cache
order: 35
section: PUT IT TOGETHER
title: "Mini project: LRU cache"
summary: Hash map + doubly linked list
duration: 25 min
description: Combine two structures from this course to build a cache that evicts the least recently used item, with O(1) get and put.
goal: Design an LRU cache and explain why it needs both a hash map and a doubly linked list.
eyebrow: THE BIG IDEA
conceptTitle: Pick the right structure for each job
formula: "map: key → node (find in O(1)) · list: usage order (move / evict in O(1))"
takeaways:
  - label: Hash map
    text: Find the node for a key in O(1).
  - label: Doubly linked list
    text: Reorder and evict in O(1).
  - label: Composition
    text: Real systems combine simple structures.
widget: lru-sim
widgetTitle: Simulate an LRU cache
widgetDescription: Put and get keys. Watch the usage order change and the least recent key get evicted when the cache is full.
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
  description: An LRU cache built from a hash map and a doubly linked list.
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
  - op: put (with eviction)
    time: O(1)
    space: O(1)
  - op: Whole cache
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
reflectionPrompt: Which structures from this course would you combine for an autocomplete feature?
---

A cache keeps a limited number of items. When it is full, an **LRU** (least recently used) cache throws away the item that has gone unused the longest. We need three operations in O(1): find an item by key, mark it as just used, and remove the oldest one.

No single structure does all three. A **hash map** finds a key in O(1) but has no notion of order. A **doubly linked list** can move a node to the end or remove the front in O(1), but searching it is O(n). Together they work: the map stores key → list node, and the list stores nodes in usage order, least recent at the left. `get` looks up the node and moves it to the right; `put` appends a node and, if over capacity, removes the leftmost node from both structures. Browsers, databases and CPUs all use caches like this.
