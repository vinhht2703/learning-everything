---
id: ram
order: 1
section: GETTING STARTED
title: How computers store data (RAM)
summary: Bytes, addresses, and contiguous memory
duration: 6 min
description: Every data structure lives in memory. Understanding addresses explains why some operations are instant and others are slow.
goal: Picture RAM as numbered boxes and compute where an array element lives.
eyebrow: THE BIG IDEA
conceptTitle: Memory is a long row of numbered bytes
formula: address(arr[i]) = base + i × element_size
takeaways:
  - label: Address
    text: A number that identifies one byte in RAM.
  - label: Contiguous
    text: Array elements sit side by side with no gaps.
  - label: O(1) access
    text: Any index is one calculation away.
widget: ram
widgetTitle: Find an element in memory
widgetDescription: Move the index and change the element size. The address is computed, never searched.
code:
  file: memory.py
  lang: python
  source: |-
    base = 1000      # address of nums[0]
    size = 4         # bytes per integer
    nums = [7, 3, 9, 4]

    for i in range(len(nums)):
        print(f"nums[{i}] = {nums[i]} at address {base + i * size}")
  output: |-
    nums[0] = 7 at address 1000
    nums[1] = 3 at address 1004
    nums[2] = 9 at address 1008
    nums[3] = 4 at address 1012
  description: Simulate how an array maps indexes to addresses.
  variants:
    - lang: javascript
      file: memory.js
      source: |-
        const base = 1000;   // address of nums[0]
        const size = 4;      // bytes per integer
        const nums = [7, 3, 9, 4];

        for (let i = 0; i < nums.length; i++) {
          console.log(`nums[${i}] = ${nums[i]} at address ${base + i * size}`);
        }
      output: |-
        nums[0] = 7 at address 1000
        nums[1] = 3 at address 1004
        nums[2] = 9 at address 1008
        nums[3] = 4 at address 1012
    - lang: cpp
      file: memory.cpp
      source: |-
        #include <cstdint>
        #include <iostream>
        using namespace std;

        int main() {
            int32_t nums[] = {7, 3, 9, 4};
            // Real addresses: each int32 is 4 bytes after the previous one.
            for (int i = 0; i < 4; i++) {
                intptr_t offset = (char*)&nums[i] - (char*)&nums[0];
                cout << "nums[" << i << "] = " << nums[i]
                     << " at base + " << offset << endl;
            }
        }
      output: |-
        nums[0] = 7 at base + 0
        nums[1] = 3 at base + 4
        nums[2] = 9 at base + 8
        nums[3] = 4 at base + 12
complexity:
  - op: Read arr[i]
    time: O(1)
    space: O(1)
  - op: Write arr[i]
    time: O(1)
    space: O(1)
videos:
  - title: How Computers Store Data | DRAM, SRAM, Registers
    channel: Bit by Bit
    url: https://www.youtube.com/watch?v=GfcwfYXus04
  - title: CS50x 2025 - Lecture 2 - Arrays
    channel: CS50 (Harvard)
    url: https://www.youtube.com/watch?v=Y8qnryVy5sQ
    note: full lecture
practice:
  - title: Running Sum of 1d Array
    url: https://leetcode.com/problems/running-sum-of-1d-array/
    difficulty: easy
reflectionPrompt: Why can a computer read arr[1000000] as fast as arr[0]?
---

RAM (random access memory) is a huge row of bytes. Every byte has an address, a number like 1000 or 1004. "Random access" means the computer can jump to any address directly, without walking past the bytes before it.

An integer usually takes 4 or 8 bytes. An array stores its values next to each other (contiguously), so if you know where the first element starts, you can compute where any element lives with one multiplication and one addition. That is why reading `arr[i]` is O(1).
