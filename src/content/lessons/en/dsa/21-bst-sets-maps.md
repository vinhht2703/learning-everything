---
id: bst-sets-maps
order: 21
section: TREES
title: BST sets and maps
summary: Sorted keys in O(log n)
duration: 6 min
description: A BST can store unique keys (a set) or key-value pairs (a map) while keeping them sorted.
goal: Use a tree-based map and compare it with a hash map.
eyebrow: THE BIG IDEA
conceptTitle: Ordered collections
formula: "put / get / remove: O(log n) · iterate: sorted, O(n)"
takeaways:
  - label: Tree set
    text: Unique keys, always sorted.
  - label: Tree map
    text: Key → value with sorted keys.
  - label: vs hash map
    text: "Hash: O(1) but unordered; tree: O(log n) and ordered."
widget: bst-map
widgetTitle: Build a sorted map
widgetDescription: Add names with ages. Names are placed alphabetically, so iteration is always sorted.
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
  description: A tiny BST-backed sorted map (C++ uses the built-in std::map).
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
  - op: put / get / remove (balanced)
    time: O(log n)
    space: O(1)
  - op: Iterate in sorted order
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
reflectionPrompt: When would you choose a tree map over a hash map in your own project?
---

Store a key in each node, plus a value for a map. The BST rules decide where each key goes, and an in-order traversal returns the keys in sorted order. Inserting an existing key just updates its value, so keys stay unique.

C++ `std::map` / `std::set` and Java `TreeMap` / `TreeSet` are balanced BSTs with O(log n) operations. A hash map (Python `dict`, JavaScript `Map`) is faster on average, O(1), but does not keep keys sorted. Choose a tree map when you need ordered iteration, the smallest or largest key, or "the next key after x".
