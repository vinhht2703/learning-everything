---
id: stacks
order: 4
section: ARRAYS
title: Stacks
summary: Last in, first out
duration: 4 min
description: "A stack only lets you add, read, and remove at one end: the top. A dynamic array makes all three O(1)."
goal: Use push, pop, and peek, and recognize problems that need "most recent first".
eyebrow: THE BIG IDEA
conceptTitle: Like a stack of plates
formula: push → top · pop ← top · peek = top
takeaways:
  - label: LIFO
    text: The last item pushed is the first popped.
  - label: Top only
    text: No access to the middle; that is the point.
  - label: Uses
    text: Undo, back button, parentheses, recursion.
widget: stack
widgetTitle: Push, pop, and peek
widgetDescription: Only the top of the stack is reachable. Try popping until it is empty.
code:
  file: stack.py
  lang: python
  source: |-
    stack = []
    stack.append(1)      # push
    stack.append(2)
    stack.append(3)

    print(stack[-1])     # peek -> top
    print(stack.pop())   # pop the top
    print(stack)
  output: |-
    3
    3
    [1, 2]
  description: "A Python list works as a stack: append is push, pop is pop."
  variants:
    - lang: javascript
      file: stack.js
      source: |-
        const stack = [];
        stack.push(1);
        stack.push(2);
        stack.push(3);

        console.log(stack[stack.length - 1]); // peek -> top
        console.log(stack.pop());             // pop the top
        console.log(stack);
      output: |-
        3
        3
        [ 1, 2 ]
    - lang: cpp
      file: stack.cpp
      source: |-
        #include <iostream>
        #include <stack>
        using namespace std;

        int main() {
            stack<int> s;
            s.push(1);
            s.push(2);
            s.push(3);

            cout << s.top() << endl;  // peek
            s.pop();                  // pop removes the top (returns nothing)
            cout << "size after pop: " << s.size() << endl;
        }
      output: |-
        3
        size after pop: 2
complexity:
  - op: Push
    time: O(1)
    space: O(1)
  - op: Pop
    time: O(1)
    space: O(1)
  - op: Peek
    time: O(1)
    space: O(1)
videos:
  - title: "Data structures: Introduction to stack"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=F1F2imiOJfk
  - title: "Data structures: Array implementation of stacks"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=sFVxsglODoo
practice:
  - title: Baseball Game
    url: https://leetcode.com/problems/baseball-game/
    difficulty: easy
  - title: Valid Parentheses
    url: https://leetcode.com/problems/valid-parentheses/
    difficulty: easy
  - title: Min Stack
    url: https://leetcode.com/problems/min-stack/
    difficulty: medium
reflectionPrompt: Name an app you use daily that behaves like a stack.
---

A stack is LIFO: last in, first out. You push onto the top, pop from the top, and peek at the top without removing it. Since the top is simply the end of a dynamic array, every operation is O(1).

Stacks appear whenever the most recent item matters first: undo history, the browser back button, matching parentheses, and the call stack that runs recursive functions (you will meet it again in the recursion section).
