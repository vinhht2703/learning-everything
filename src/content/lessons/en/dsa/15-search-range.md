---
id: search-range
order: 15
section: BINARY SEARCH
title: Binary search on a range
summary: Search answers, not arrays
duration: 8 min
description: "Binary search does not need an array: any yes/no question that flips once across a range of numbers can be searched."
goal: Apply binary search to a range of possible answers, like guessing a number.
eyebrow: THE BIG IDEA
conceptTitle: Higher or lower?
formula: range [lo, hi], ask about mid → keep one half
takeaways:
  - label: Search space
    text: A range of possible answers, not stored data.
  - label: Monotonic check
    text: Its answer flips only once across the range.
  - label: log₂(range)
    text: 1,000,000 possibilities need about 20 checks.
widget: guess-number
widgetTitle: Let the computer guess your number
widgetDescription: Pick a secret and a range. The blue window is everything still possible.
code:
  file: guess_number.py
  lang: python
  source: |-
    SECRET = 63

    def guess(n):
        # 1: secret is higher, -1: secret is lower, 0: correct
        return (SECRET > n) - (SECRET < n)

    def find_secret(low, high):
        tries = 0
        while low <= high:
            mid = (low + high) // 2
            tries += 1
            result = guess(mid)
            if result > 0:
                low = mid + 1
            elif result < 0:
                high = mid - 1
            else:
                return mid, tries

    number, tries = find_secret(1, 100)
    print(f"found {number} in {tries} guesses")
  output: found 63 in 6 guesses
  description: Binary search over the range 1–100 using a guess() check.
  variants:
    - lang: javascript
      file: guess_number.js
      source: |-
        const SECRET = 63;

        // 1: secret is higher, -1: secret is lower, 0: correct
        const guess = (n) => Math.sign(SECRET - n);

        function findSecret(low, high) {
          let tries = 0;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            tries++;
            const result = guess(mid);
            if (result > 0) low = mid + 1;
            else if (result < 0) high = mid - 1;
            else return [mid, tries];
          }
        }

        const [number, tries] = findSecret(1, 100);
        console.log(`found ${number} in ${tries} guesses`);
      output: found 63 in 6 guesses
    - lang: cpp
      file: guess_number.cpp
      source: |-
        #include <iostream>
        #include <utility>
        using namespace std;

        const int SECRET = 63;

        // 1: secret is higher, -1: secret is lower, 0: correct
        int guess(int n) { return (SECRET > n) - (SECRET < n); }

        pair<int, int> findSecret(int low, int high) {
            int tries = 0;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                tries++;
                int result = guess(mid);
                if (result > 0) low = mid + 1;
                else if (result < 0) high = mid - 1;
                else return {mid, tries};
            }
            return {-1, tries};
        }

        int main() {
            auto [number, tries] = findSecret(1, 100);
            cout << "found " << number << " in " << tries << " guesses" << endl;
        }
      output: found 63 in 6 guesses
complexity:
  - op: Search a range of size R
    time: O(log R)
    space: O(1)
videos:
  - title: First Bad Version - Leetcode 278 - Binary Search
    channel: Greg Hogg
    url: https://www.youtube.com/watch?v=N-9NUXvdvcM
  - title: 278. First Bad Version | Leetcode Unlocked - Python
    channel: Leetcode Unlocked
    url: https://www.youtube.com/watch?v=q2DdOYKqpG8
practice:
  - title: Guess Number Higher or Lower
    url: https://leetcode.com/problems/guess-number-higher-or-lower/
    difficulty: easy
  - title: First Bad Version
    url: https://leetcode.com/problems/first-bad-version/
    difficulty: easy
  - title: Sqrt(x)
    url: https://leetcode.com/problems/sqrtx/
    difficulty: easy
  - title: Koko Eating Bananas
    url: https://leetcode.com/problems/koko-eating-bananas/
    difficulty: medium
reflectionPrompt: Describe a real decision you could make faster by repeatedly halving the options.
---

Think of the "guess my number" game. You do not have an array, just a range 1–100 and a function that says "higher", "lower", or "correct". Guessing the middle each time finds any number in at most 7 guesses.

The same pattern solves many problems: find the first bad software version, the smallest speed that finishes a job in time, or an integer square root. If you can write a check that is false for small answers and true for big ones (or the reverse), binary search finds the boundary in O(log range) checks.
