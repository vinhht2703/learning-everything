---
id: fibonacci
order: 9
section: RECURSION
title: "Recursion: Fibonacci"
summary: Two branches per call, then memoization
duration: 13 min
description: Fibonacci calls itself twice per step. The recursion tree explodes, until you remember answers you already computed.
goal: Draw the recursion tree, count its calls, and speed it up with memoization.
eyebrow: THE BIG IDEA
conceptTitle: Repeated work hides in the tree
formula: fib(n) = fib(n − 1) + fib(n − 2)   ·   fib(0) = 0, fib(1) = 1
takeaways:
  - label: Branching
    text: Two recursive calls per step create a tree of calls.
  - label: Overlapping subproblems
    text: The same inputs are solved again and again.
  - label: Memoization
    text: "Cache answers in a dict: O(2ⁿ) → O(n)."
widget: fib-tree
widgetTitle: Explore the recursion tree
widgetDescription: Raise n to watch the tree explode, then turn on memoization to prune it.
code:
  file: fibonacci.py
  lang: python
  source: |-
    def fib(n):
        if n <= 1:
            return n
        return fib(n - 1) + fib(n - 2)

    def fib_memo(n, memo):
        if n <= 1:
            return n
        if n not in memo:
            memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
        return memo[n]

    print(fib(10), fib_memo(10, {}))
  output: 55 55
  description: The same answer, very different amounts of work.
  variants:
    - lang: javascript
      file: fibonacci.js
      source: |-
        function fib(n) {
          if (n <= 1) return n;
          return fib(n - 1) + fib(n - 2);
        }

        function fibMemo(n, memo = new Map()) {
          if (n <= 1) return n;
          if (!memo.has(n)) memo.set(n, fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
          return memo.get(n);
        }

        console.log(fib(10), fibMemo(10));
      output: 55 55
    - lang: cpp
      file: fibonacci.cpp
      source: |-
        #include <iostream>
        #include <unordered_map>
        using namespace std;

        int fib(int n) {
            if (n <= 1) return n;
            return fib(n - 1) + fib(n - 2);
        }

        int fibMemo(int n, unordered_map<int, int>& memo) {
            if (n <= 1) return n;
            if (!memo.count(n)) memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
            return memo[n];
        }

        int main() {
            unordered_map<int, int> memo;
            cout << fib(10) << " " << fibMemo(10, memo) << endl;
        }
      output: 55 55
complexity:
  - op: fib(n), naive
    time: O(2ⁿ)
    space: O(n)
  - op: fib(n), memoized
    time: O(n)
    space: O(n)
videos:
  - title: Recursive Fibonacci Calls (Diagrammed)
    channel: Khan Academy Computing
    url: https://www.youtube.com/watch?v=214lD7tWkz8
  - title: How Recursive Fibonacci Works in Python | Call Stack Explained Step by Step
    channel: Amulya's Academy
    url: https://www.youtube.com/watch?v=irIFdsXl4qk
  - title: Recursion in Programming - Full Course
    channel: freeCodeCamp.org
    url: https://www.youtube.com/watch?v=IJDJ0kBx2LM
    note: longer deep dive
practice:
  - title: Fibonacci Number
    url: https://leetcode.com/problems/fibonacci-number/
    difficulty: easy
  - title: N-th Tribonacci Number
    url: https://leetcode.com/problems/n-th-tribonacci-number/
    difficulty: easy
  - title: Climbing Stairs
    url: https://leetcode.com/problems/climbing-stairs/
    difficulty: easy
reflectionPrompt: Climbing Stairs looks different from Fibonacci. What do they have in common?
---

The naive version branches into two calls each time, so the number of calls roughly doubles with n: about O(2ⁿ) time. Look at the tree and you will see `fib(2)` and `fib(3)` computed many times over.

**Memoization** stores each answer the first time it is computed and reuses it afterwards. Every `fib(k)` is then computed once, so the time drops to O(n). Spotting overlapping subproblems like this is the first step towards dynamic programming, later in the course.
