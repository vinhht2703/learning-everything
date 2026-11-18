---
id: heap-properties
order: 23
section: HEAP / PRIORITY QUEUE
title: Heap properties
summary: A tree stored in an array
duration: 14 min
description: A heap is a complete binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children, stored in a plain array.
goal: Read a heap both as a tree and as an array, and find parents and children with index math.
eyebrow: THE BIG IDEA
conceptTitle: The smallest item is always at the top
formula: parent(i) = (i − 1) // 2 · left(i) = 2i + 1 · right(i) = 2i + 2
takeaways:
  - label: Complete tree
    text: Filled level by level, so it fits in an array.
  - label: Heap order
    text: Parent ≤ children (min-heap); siblings are unordered.
  - label: Priority queue
    text: Peek the min/max in O(1).
widget: heap-view
widgetTitle: Explore a heap as a tree and an array
widgetDescription: Click a node or a cell to see its parent and children. Switch min/max, or break the order to see which nodes violate it.
code:
  file: heap_index.py
  lang: python
  source: |-
    # A min-heap stored in a plain list (index 0 is the root).
    heap = [1, 3, 2, 7, 4, 5, 6]

    def parent(i): return (i - 1) // 2
    def left(i):   return 2 * i + 1
    def right(i):  return 2 * i + 2

    def is_min_heap(arr):
        # every parent must be <= its children
        return all(arr[parent(i)] <= arr[i] for i in range(1, len(arr)))

    print("root (minimum):", heap[0])
    print("children of index 1:", heap[left(1)], heap[right(1)])
    print("parent of index 5:", heap[parent(5)])
    print("valid min-heap:", is_min_heap(heap), is_min_heap([3, 1, 2]))
  output: |-
    root (minimum): 1
    children of index 1: 7 4
    parent of index 5: 2
    valid min-heap: True False
  description: Index arithmetic and a check that a list is a valid min-heap.
  variants:
    - lang: javascript
      file: heap_index.js
      source: |-
        // A min-heap stored in a plain array (index 0 is the root).
        const heap = [1, 3, 2, 7, 4, 5, 6];

        const parent = (i) => Math.floor((i - 1) / 2);
        const left = (i) => 2 * i + 1;
        const right = (i) => 2 * i + 2;

        // every parent must be <= its children
        const isMinHeap = (arr) => arr.every((v, i) => i === 0 || arr[parent(i)] <= v);

        console.log("root (minimum):", heap[0]);
        console.log("children of index 1:", heap[left(1)], heap[right(1)]);
        console.log("parent of index 5:", heap[parent(5)]);
        console.log("valid min-heap:", isMinHeap(heap), isMinHeap([3, 1, 2]));
      output: |-
        root (minimum): 1
        children of index 1: 7 4
        parent of index 5: 2
        valid min-heap: true false
    - lang: cpp
      file: heap_index.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        // A min-heap stored in a plain vector (index 0 is the root).
        int parent(int i) { return (i - 1) / 2; }
        int leftChild(int i) { return 2 * i + 1; }
        int rightChild(int i) { return 2 * i + 2; }

        bool isMinHeap(const vector<int>& arr) {
            for (int i = 1; i < (int)arr.size(); i++)
                if (arr[parent(i)] > arr[i]) return false;   // a parent bigger than its child
            return true;
        }

        int main() {
            vector<int> heap = {1, 3, 2, 7, 4, 5, 6};
            cout << boolalpha;
            cout << "root (minimum): " << heap[0] << endl;
            cout << "children of index 1: " << heap[leftChild(1)] << " " << heap[rightChild(1)] << endl;
            cout << "parent of index 5: " << heap[parent(5)] << endl;
            cout << "valid min-heap: " << isMinHeap(heap) << " " << isMinHeap({3, 1, 2}) << endl;
        }
      output: |-
        root (minimum): 1
        children of index 1: 7 4
        parent of index 5: 2
        valid min-heap: true false
complexity:
  - op: Peek min / max
    time: O(1)
    space: O(1)
  - op: Find parent / child
    time: O(1)
    space: O(1)
  - op: Search for any value
    time: O(n)
    space: O(1)
videos:
  - title: Heaps in 3 minutes — Intro
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=0wPlzMU-k00
  - title: "Data Structures: Heaps"
    channel: HackerRank
    url: https://www.youtube.com/watch?v=t0Cq6tVNRBA
practice:
  - title: Kth Largest Element in a Stream
    url: https://leetcode.com/problems/kth-largest-element-in-a-stream/
    difficulty: easy
  - title: Last Stone Weight
    url: https://leetcode.com/problems/last-stone-weight/
    difficulty: easy
reflectionPrompt: Name a real situation where you always need "the most urgent item next".
---

A heap has two rules. **Shape:** it is a complete binary tree, every level is full except possibly the last, which fills from the left. **Order:** in a min-heap every parent is ≤ its children (in a max-heap, ≥). The order rule only compares parents with children; siblings can be in any order, so a heap is *not* sorted.

Because the tree is complete, it fits perfectly in an array with no gaps: read the tree level by level. Then the parent and children of index `i` are found with arithmetic instead of pointers. The minimum is always `heap[0]`, so peeking at it is O(1). A heap is how a **priority queue** is built: "always give me the most urgent item next".
