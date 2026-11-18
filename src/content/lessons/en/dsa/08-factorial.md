---
id: factorial
order: 8
section: RECURSION
title: "Recursion: factorial"
summary: Base case + recursive case
duration: 11 min
description: A recursive function solves a problem by calling itself on a smaller version of the same problem.
goal: Write a recursive function with a base case and trace its calls on the call stack.
eyebrow: THE BIG IDEA
conceptTitle: Shrink the problem until it is trivial
formula: n! = n × (n − 1)!   ·   1! = 1
takeaways:
  - label: Base case
    text: The input small enough to answer without recursion.
  - label: Recursive case
    text: Call yourself on a smaller input, then combine.
  - label: Call stack
    text: Each pending call waits in a frame until its child returns.
widget: call-stack
widgetTitle: Step through the call stack
widgetDescription: Frames pile up until the base case, then unwind as each call returns its result.
code:
  file: factorial.py
  lang: python
  source: |-
    def factorial(n):
        if n <= 1:                     # base case
            return 1
        return n * factorial(n - 1)    # recursive case

    print(factorial(5))
  output: "120"
  description: The classic first recursive function.
  variants:
    - lang: javascript
      file: factorial.js
      source: |-
        function factorial(n) {
          if (n <= 1) return 1;            // base case
          return n * factorial(n - 1);     // recursive case
        }

        console.log(factorial(5));
      output: "120"
    - lang: cpp
      file: factorial.cpp
      source: |-
        #include <iostream>
        using namespace std;

        long long factorial(int n) {
            if (n <= 1) return 1;            // base case
            return n * factorial(n - 1);     // recursive case
        }

        int main() {
            cout << factorial(5) << endl;
        }
      output: "120"
complexity:
  - op: factorial(n)
    time: O(n)
    space: O(n) call stack
videos:
  - title: "Introduction to Recursion (Data Structures & Algorithms #6)"
    channel: CS Dojo
    url: https://www.youtube.com/watch?v=B0NtAFf4bvU
  - title: How recursion works (actual flow using stack memory) - explained with factorial program
    channel: Team MAST
    url: https://www.youtube.com/watch?v=hKz9QnsLYzE
  - title: 5 Simple Steps for Solving Any Recursive Problem
    channel: Reducible
    url: https://www.youtube.com/watch?v=ngCos392W4w
practice:
  - title: Reverse String (solve it recursively)
    url: https://leetcode.com/problems/reverse-string/
    difficulty: easy
  - title: Power of Two
    url: https://leetcode.com/problems/power-of-two/
    difficulty: easy
reflectionPrompt: What is the base case for summing a list recursively?
---

Every recursive function needs two parts. The **base case** answers the smallest input directly (`factorial(1) = 1`). The **recursive case** reduces the problem and calls itself (`n * factorial(n - 1)`). Without a base case, the calls never stop and Python raises a RecursionError.

Each call gets its own frame on the call stack, which is a real stack: frames are pushed going down and popped as results return. `factorial(n)` makes n calls, so it takes O(n) time and O(n) stack space.
