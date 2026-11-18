---
id: static-arrays
order: 2
section: ARRAYS
title: Static arrays
summary: Fixed size, fast reads, costly shifts
duration: 15 min
description: A static array has a fixed capacity chosen when it is created. Reading is instant, but inserting in the middle means shifting.
goal: Explain why writing at the end is O(1) but inserting or removing in the middle is O(n).
eyebrow: THE BIG IDEA
conceptTitle: No gaps allowed
formula: insert / remove at i → shift (length − i) elements
takeaways:
  - label: Capacity
    text: The fixed number of slots reserved in memory.
  - label: Length
    text: How many slots currently hold real values.
  - label: Shifting
    text: "Moving elements to keep the array gap-free: O(n)."
widget: static-array
widgetTitle: Insert and remove in a fixed-size array
widgetDescription: Compare working at the end with working in the middle. Orange cells are the ones that had to move.
code:
  file: insert.py
  lang: python
  source: |-
    def insert_at(arr, length, i, value):
        # shift elements right to open a gap at index i
        for j in range(length - 1, i - 1, -1):
            arr[j + 1] = arr[j]
        arr[i] = value
        return length + 1

    arr = [4, 5, 6, 0, 0]    # capacity 5, length 3
    length = insert_at(arr, 3, 1, 9)
    print(arr[:length])
  output: "[4, 9, 5, 6]"
  description: Insert into the middle by shifting elements right.
  variants:
    - lang: javascript
      file: insert.js
      source: |-
        function insertAt(arr, length, i, value) {
          // shift elements right to open a gap at index i
          for (let j = length - 1; j >= i; j--) {
            arr[j + 1] = arr[j];
          }
          arr[i] = value;
          return length + 1;
        }

        const arr = [4, 5, 6, 0, 0];   // capacity 5, length 3
        const length = insertAt(arr, 3, 1, 9);
        console.log(arr.slice(0, length));
      output: "[ 4, 9, 5, 6 ]"
    - lang: cpp
      file: insert.cpp
      source: |-
        #include <iostream>
        using namespace std;

        int insertAt(int arr[], int length, int i, int value) {
            // shift elements right to open a gap at index i
            for (int j = length - 1; j >= i; j--) {
                arr[j + 1] = arr[j];
            }
            arr[i] = value;
            return length + 1;
        }

        int main() {
            int arr[5] = {4, 5, 6};          // capacity 5, length 3
            int length = insertAt(arr, 3, 1, 9);
            for (int k = 0; k < length; k++) cout << arr[k] << " ";
            cout << endl;
        }
      output: 4 9 5 6
complexity:
  - op: Read / write arr[i]
    time: O(1)
    space: O(1)
  - op: Insert / remove at end
    time: O(1)
    space: O(1)
  - op: Insert / remove in middle
    time: O(n)
    space: O(1)
videos:
  - title: Array Memory Representation & Basics Explained
    channel: CodeLucky
    url: https://www.youtube.com/watch?v=HWQ-1BTC1L8
  - title: "Data Structures: Arrays vs Linked Lists"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=lC-yYCOnN8Q
practice:
  - title: Remove Element
    url: https://leetcode.com/problems/remove-element/
    difficulty: easy
  - title: Remove Duplicates from Sorted Array
    url: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
    difficulty: easy
reflectionPrompt: Where in your own code do you insert at the front of a list? Could you append instead?
---

Because elements must stay contiguous, an array cannot leave holes. To insert at index `i`, every element from `i` to the end moves one step right first. To remove at `i`, everything after it moves one step left. In the worst case (index 0) that touches all n elements.

Working at the end is different: writing to the next free slot or dropping the last element moves nothing, so it is O(1). A static array also cannot grow: once it is full, you need a new, bigger array.
