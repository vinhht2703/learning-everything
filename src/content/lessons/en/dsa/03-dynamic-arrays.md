---
id: dynamic-arrays
order: 3
section: ARRAYS
title: Dynamic arrays
summary: Grow by doubling, amortized O(1)
duration: 16 min
description: A dynamic array (like a Python list) grows automatically by copying itself into a bigger array when it runs out of room.
goal: See why doubling the capacity keeps push fast on average, even though one push can cost O(n).
eyebrow: THE BIG IDEA
conceptTitle: Pay for copying rarely
formula: n pushes cost ≤ n + (1 + 2 + 4 + … + n) < 3n → O(1) amortized
takeaways:
  - label: Resize
    text: "Allocate a bigger array and copy everything: O(n)."
  - label: Doubling
    text: Growing by ×2 (not +1) makes resizes rare.
  - label: Amortized O(1)
    text: Averaged over many pushes, each one is constant work.
widget: dynamic-array
widgetTitle: Watch the array double
widgetDescription: Push values one by one. "Work per push" settles below 3 even as the array grows.
code:
  file: dynamic_array.py
  lang: python
  source: |-
    class DynamicArray:
        def __init__(self):
            self.capacity = 2
            self.length = 0
            self.arr = [0] * self.capacity

        def push(self, value):
            if self.length == self.capacity:
                self.resize()
            self.arr[self.length] = value
            self.length += 1

        def resize(self):
            self.capacity *= 2
            new_arr = [0] * self.capacity
            for i in range(self.length):
                new_arr[i] = self.arr[i]
            self.arr = new_arr

    d = DynamicArray()
    for v in range(5):
        d.push(v)
    print(d.length, d.capacity)
  output: 5 8
  description: A minimal dynamic array that doubles when full.
  variants:
    - lang: javascript
      file: dynamic_array.js
      source: |-
        class DynamicArray {
          constructor() {
            this.capacity = 2;
            this.length = 0;
            this.arr = new Array(this.capacity).fill(0);
          }

          push(value) {
            if (this.length === this.capacity) this.resize();
            this.arr[this.length] = value;
            this.length++;
          }

          resize() {
            this.capacity *= 2;
            const newArr = new Array(this.capacity).fill(0);
            for (let i = 0; i < this.length; i++) newArr[i] = this.arr[i];
            this.arr = newArr;
          }
        }

        const d = new DynamicArray();
        for (let v = 0; v < 5; v++) d.push(v);
        console.log(d.length, d.capacity);
      output: 5 8
    - lang: cpp
      file: dynamic_array.cpp
      source: |-
        #include <iostream>
        using namespace std;

        class DynamicArray {
            int capacity = 2;
            int length = 0;
            int* arr = new int[2];

            void resize() {
                capacity *= 2;
                int* newArr = new int[capacity];
                for (int i = 0; i < length; i++) newArr[i] = arr[i];
                delete[] arr;
                arr = newArr;
            }

        public:
            ~DynamicArray() { delete[] arr; }

            void push(int value) {
                if (length == capacity) resize();
                arr[length++] = value;
            }

            int size() const { return length; }
            int cap() const { return capacity; }
        };

        int main() {
            DynamicArray d;
            for (int v = 0; v < 5; v++) d.push(v);
            cout << d.size() << " " << d.cap() << endl;
        }
      output: 5 8
complexity:
  - op: Read arr[i]
    time: O(1)
    space: O(1)
  - op: Push (amortized)
    time: O(1)
    space: O(1)
  - op: Push when resizing
    time: O(n)
    space: O(n)
  - op: Insert / remove in middle
    time: O(n)
    space: O(1)
videos:
  - title: What is Amortized Time Complexity? - Code a Dynamic Array
    channel: Gaurav Sen
    url: https://www.youtube.com/watch?v=EOjoQxdOBgU
  - title: "The Magic Behind Dynamic Arrays: Amortization & How Python Lists Stay Fast!"
    channel: Minus J Squared
    url: https://www.youtube.com/watch?v=p8-NsF3fPV4
practice:
  - title: Concatenation of Array
    url: https://leetcode.com/problems/concatenation-of-array/
    difficulty: easy
  - title: Shuffle the Array
    url: https://leetcode.com/problems/shuffle-the-array/
    difficulty: easy
reflectionPrompt: What would happen to push if the array grew by +1 slot instead of ×2?
---

When a dynamic array is full, it allocates a new array with double the capacity, copies every element over, and frees the old one. That single push costs O(n).

But because the capacity doubles, those expensive copies get rarer and rarer. Adding up all the copying work over n pushes gives less than 2n, so the average (amortized) cost per push is O(1). This is exactly how Python lists, Java ArrayList, and C++ vector work.
