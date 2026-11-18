---
id: bit-operations
order: 34
section: BIT MANIPULATION
title: Bit operations
summary: AND, OR, XOR, shifts
duration: 17 min
description: Integers are stored as binary. Bitwise operators work on every bit at once, which makes some problems tiny and fast.
goal: Use &, |, ^, << and >> and solve classic bit tricks like counting set bits and Single Number.
eyebrow: THE BIG IDEA
conceptTitle: Every number is a row of switches
formula: x & 1 → last bit · x << k = x·2ᵏ · x >> k = x // 2ᵏ · x ^ x = 0
takeaways:
  - label: AND / OR / XOR
    text: "Both, either, different: bit by bit."
  - label: Shifts
    text: Multiply or divide by powers of two.
  - label: XOR cancels
    text: "Pairs disappear: a ^ a = 0."
widget: bit-playground
widgetTitle: Flip bits and combine them
widgetDescription: Click bits of a and b, choose an operation, and read the result in binary and decimal.
code:
  file: bits.py
  lang: python
  source: |-
    a, b = 12, 10                          # 1100 and 1010 in binary
    show = lambda n: format(n, "04b")

    print("a & b  =", show(a & b), a & b)  # AND: 1 where both are 1
    print("a | b  =", show(a | b), a | b)  # OR:  1 where either is 1
    print("a ^ b  =", show(a ^ b), a ^ b)  # XOR: 1 where they differ
    print("a << 1 =", format(a << 1, "05b"), a << 1)   # shift left = multiply by 2
    print("a >> 2 =", show(a >> 2), a >> 2)            # shift right = divide by 4

    def count_ones(n):
        count = 0
        while n:
            count += n & 1                 # look at the lowest bit
            n >>= 1                        # drop it
        return count

    print("ones in 13:", count_ones(13), "| 13 is odd:", 13 & 1 == 1)
    print("single number:", 4 ^ 1 ^ 2 ^ 1 ^ 2)   # pairs cancel out: x ^ x = 0
  output: |-
    a & b  = 1000 8
    a | b  = 1110 14
    a ^ b  = 0110 6
    a << 1 = 11000 24
    a >> 2 = 0011 3
    ones in 13: 3 | 13 is odd: True
    single number: 4
  description: Bitwise operators, counting set bits, and the XOR trick.
  variants:
    - lang: javascript
      file: bits.js
      source: |-
        const a = 12, b = 10;                         // 1100 and 1010 in binary
        const show = (n, width = 4) => n.toString(2).padStart(width, "0");

        console.log("a & b  =", show(a & b), a & b);  // AND: 1 where both are 1
        console.log("a | b  =", show(a | b), a | b);  // OR:  1 where either is 1
        console.log("a ^ b  =", show(a ^ b), a ^ b);  // XOR: 1 where they differ
        console.log("a << 1 =", show(a << 1, 5), a << 1);   // shift left = multiply by 2
        console.log("a >> 2 =", show(a >> 2), a >> 2);      // shift right = divide by 4

        function countOnes(n) {
          let count = 0;
          while (n) {
            count += n & 1;                           // look at the lowest bit
            n >>>= 1;                                 // drop it
          }
          return count;
        }

        console.log("ones in 13:", countOnes(13), "| 13 is odd:", (13 & 1) === 1);
        console.log("single number:", 4 ^ 1 ^ 2 ^ 1 ^ 2);   // pairs cancel out: x ^ x = 0
      output: |-
        a & b  = 1000 8
        a | b  = 1110 14
        a ^ b  = 0110 6
        a << 1 = 11000 24
        a >> 2 = 0011 3
        ones in 13: 3 | 13 is odd: true
        single number: 4
    - lang: cpp
      file: bits.cpp
      source: |-
        #include <bitset>
        #include <iostream>
        using namespace std;

        int countOnes(unsigned n) {
            int count = 0;
            while (n) {
                count += n & 1;          // look at the lowest bit
                n >>= 1;                 // drop it
            }
            return count;
        }

        int main() {
            unsigned a = 12, b = 10;     // 1100 and 1010 in binary
            cout << "a & b  = " << bitset<4>(a & b) << " " << (a & b) << endl;    // AND
            cout << "a | b  = " << bitset<4>(a | b) << " " << (a | b) << endl;    // OR
            cout << "a ^ b  = " << bitset<4>(a ^ b) << " " << (a ^ b) << endl;    // XOR
            cout << "a << 1 = " << bitset<5>(a << 1) << " " << (a << 1) << endl;  // multiply by 2
            cout << "a >> 2 = " << bitset<4>(a >> 2) << " " << (a >> 2) << endl;  // divide by 4
            cout << "ones in 13: " << countOnes(13) << " | 13 is odd: " << boolalpha << ((13 & 1) == 1) << endl;
            cout << "single number: " << (4 ^ 1 ^ 2 ^ 1 ^ 2) << endl;               // x ^ x = 0
        }
      output: |-
        a & b  = 1000 8
        a | b  = 1110 14
        a ^ b  = 0110 6
        a << 1 = 11000 24
        a >> 2 = 0011 3
        ones in 13: 3 | 13 is odd: true
        single number: 4
complexity:
  - op: One bitwise operation
    time: O(1)
    space: O(1)
  - op: Count bits of n
    time: O(log n)
    space: O(1)
videos:
  - title: "Algorithms: Bit Manipulation"
    channel: HackerRank
    url: https://www.youtube.com/watch?v=NLKQEOgBAnw
  - title: Single Number - Leetcode 136 - Python
    channel: NeetCode
    url: https://www.youtube.com/watch?v=qMPX1AOa83k
  - title: Counting Bits - Dynamic Programming - Leetcode 338 - Python
    channel: NeetCode
    url: https://www.youtube.com/watch?v=RyBM56RIWrM
practice:
  - title: Single Number
    url: https://leetcode.com/problems/single-number/
    difficulty: easy
  - title: Number of 1 Bits
    url: https://leetcode.com/problems/number-of-1-bits/
    difficulty: easy
  - title: Counting Bits
    url: https://leetcode.com/problems/counting-bits/
    difficulty: easy
reflectionPrompt: How could one integer store which days of the week a class meets?
---

In binary, 12 is `1100` and 10 is `1010`. **AND** (`&`) keeps a 1 where both bits are 1, **OR** (`|`) where either is, and **XOR** (`^`) where they differ. **Shifts** move all bits: `x << 1` doubles a number and `x >> 1` halves it (dropping the remainder).

Useful tricks: `x & 1` tells whether x is odd; looping `count += x & 1; x >>= 1` counts the 1 bits; and because `x ^ x = 0` and `x ^ 0 = x`, XOR-ing a list where every number appears twice except one leaves exactly that one (Single Number). Bits also pack many true/false flags into one integer, as file permissions and feature flags do.
