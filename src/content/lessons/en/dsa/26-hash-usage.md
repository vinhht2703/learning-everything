---
id: hash-usage
order: 26
section: HASHING
title: Using hash maps
summary: O(1) lookups by key
duration: 10 min
description: Hash maps (Python dict, JavaScript Map, C++ unordered_map) store key → value pairs with average O(1) insert, lookup and delete.
goal: Recognize problems where a hash map or set turns O(n²) into O(n).
eyebrow: THE BIG IDEA
conceptTitle: Trade a little memory for a lot of speed
formula: count / seen / index → dict;  "is x here?" → set
takeaways:
  - label: Counting
    text: One pass with counts[x] += 1.
  - label: Seen-before
    text: Store complements to answer in O(1).
  - label: Set
    text: Fast membership and de-duplication.
widget: hash-counter
widgetTitle: Count words with a hash map
widgetDescription: "Type any text: every word updates its count in O(1). Look up a word to see an O(1) hit or miss."
code:
  file: hash_usage.py
  lang: python
  source: |-
    # 1. Count things in one pass
    words = "the cat and the hat and the bat".split()
    counts = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    print(counts)

    # 2. Two Sum: remember what you've seen -> O(n) instead of O(n^2)
    def two_sum(nums, target):
        seen = {}                          # value -> index
        for i, n in enumerate(nums):
            if target - n in seen:
                return [seen[target - n], i]
            seen[n] = i

    print(two_sum([2, 7, 11, 15], 9))

    # 3. Sets: fast membership and duplicates
    print(len(set(words)), "unique words;", "cat" in set(words))
  output: |-
    {'the': 3, 'cat': 1, 'and': 2, 'hat': 1, 'bat': 1}
    [0, 1]
    5 unique words; True
  description: Counting, Two Sum and sets.
  variants:
    - lang: javascript
      file: hash_usage.js
      source: |-
        // 1. Count things in one pass
        const words = "the cat and the hat and the bat".split(" ");
        const counts = new Map();
        for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
        console.log(counts);

        // 2. Two Sum: remember what you've seen -> O(n) instead of O(n^2)
        function twoSum(nums, target) {
          const seen = new Map();             // value -> index
          for (let i = 0; i < nums.length; i++) {
            if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];
            seen.set(nums[i], i);
          }
        }

        console.log(twoSum([2, 7, 11, 15], 9));

        // 3. Sets: fast membership and duplicates
        const unique = new Set(words);
        console.log(unique.size, "unique words;", unique.has("cat"));
      output: |-
        Map(5) { 'the' => 3, 'cat' => 1, 'and' => 2, 'hat' => 1, 'bat' => 1 }
        [ 0, 1 ]
        5 unique words; true
    - lang: cpp
      file: hash_usage.cpp
      source: |-
        #include <iostream>
        #include <sstream>
        #include <string>
        #include <unordered_map>
        #include <unordered_set>
        #include <vector>
        using namespace std;

        vector<int> twoSum(const vector<int>& nums, int target) {
            unordered_map<int, int> seen;                   // value -> index
            for (int i = 0; i < (int)nums.size(); i++) {
                auto it = seen.find(target - nums[i]);
                if (it != seen.end()) return {it->second, i};
                seen[nums[i]] = i;
            }
            return {};
        }

        int main() {
            // 1. Count things in one pass
            istringstream text("the cat and the hat and the bat");
            unordered_map<string, int> counts;
            vector<string> words;
            for (string w; text >> w;) { counts[w]++; words.push_back(w); }
            cout << "the=" << counts["the"] << " and=" << counts["and"] << " cat=" << counts["cat"] << endl;

            // 2. Two Sum in O(n)
            vector<int> pair = twoSum({2, 7, 11, 15}, 9);
            cout << pair[0] << " " << pair[1] << endl;

            // 3. Sets: fast membership and duplicates
            unordered_set<string> unique(words.begin(), words.end());
            cout << unique.size() << " unique words; " << boolalpha << (unique.count("cat") > 0) << endl;
        }
      output: |-
        the=3 and=2 cat=1
        0 1
        5 unique words; true
complexity:
  - op: Insert / lookup / delete (average)
    time: O(1)
    space: O(n)
  - op: Worst case (many collisions)
    time: O(n)
    space: O(n)
videos:
  - title: "Data Structures: Hash Tables"
    channel: HackerRank
    url: https://www.youtube.com/watch?v=shs0KM3wKv8
  - title: Hash tables in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=knV86FlSXJ8
practice:
  - title: Two Sum
    url: https://leetcode.com/problems/two-sum/
    difficulty: easy
  - title: Valid Anagram
    url: https://leetcode.com/problems/valid-anagram/
    difficulty: easy
  - title: Group Anagrams
    url: https://leetcode.com/problems/group-anagrams/
    difficulty: medium
reflectionPrompt: Find a nested loop in your own code. Could a dict or set remove the inner loop?
---

Three patterns cover most uses. **Counting:** walk the data once and increment `counts[x]`. **Remembering:** store what you have seen (value → index) so a later item can ask "have I seen my partner?" in O(1); this is how Two Sum drops from O(n²) to O(n). **Membership:** a set answers "is x in here?" in O(1) and removes duplicates.

The cost is extra memory, O(n), and no ordering: iteration order is insertion order (Python, JavaScript) or arbitrary (C++ `unordered_map`). When you need sorted keys, use a tree map from the BST lesson instead.
