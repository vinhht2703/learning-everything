---
id: bucket-sort
order: 13
section: SORTING
title: Bucket sort
summary: Count into buckets, no comparisons
duration: 14 min
description: When values come from a small known range, you can sort by counting how many of each value you have.
goal: Sort a small-range array in O(n) and recognize when this trick applies.
eyebrow: THE BIG IDEA
conceptTitle: Skip comparisons entirely
formula: one pass to count + one pass to write → O(n + k)
takeaways:
  - label: Bucket
    text: A counter for one possible value.
  - label: O(n + k)
    text: Linear when the value range k is small.
  - label: Limited use
    text: Needs a small, known set of values.
widget: sort-bucket
widgetTitle: Count, then write back
widgetDescription: Values are 0, 1 or 2. Watch the bucket counts fill, then the array rewrite in order.
code:
  file: bucket_sort.py
  lang: python
  source: |-
    def bucket_sort(arr):
        counts = [0, 0, 0]          # one bucket per possible value: 0, 1, 2
        for n in arr:
            counts[n] += 1
        i = 0
        for value, count in enumerate(counts):
            for _ in range(count):  # write each bucket back in order
                arr[i] = value
                i += 1
        return arr

    print(bucket_sort([2, 0, 2, 1, 1, 0]))
  output: "[0, 0, 1, 1, 2, 2]"
  description: Counting sort for values 0, 1, 2 (the Sort Colors problem).
  variants:
    - lang: javascript
      file: bucket_sort.js
      source: |-
        function bucketSort(arr) {
          const counts = [0, 0, 0];      // one bucket per possible value: 0, 1, 2
          for (const n of arr) counts[n]++;
          let i = 0;
          counts.forEach((count, value) => {
            for (let k = 0; k < count; k++) arr[i++] = value;  // write buckets back in order
          });
          return arr;
        }

        console.log(bucketSort([2, 0, 2, 1, 1, 0]));
      output: "[ 0, 0, 1, 1, 2, 2 ]"
    - lang: cpp
      file: bucket_sort.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        void bucketSort(vector<int>& arr) {
            int counts[3] = {0, 0, 0};    // one bucket per possible value: 0, 1, 2
            for (int n : arr) counts[n]++;
            int i = 0;
            for (int value = 0; value < 3; value++)
                for (int k = 0; k < counts[value]; k++) arr[i++] = value;
        }

        int main() {
            vector<int> arr = {2, 0, 2, 1, 1, 0};
            bucketSort(arr);
            for (int x : arr) cout << x << " ";
            cout << endl;
        }
      output: 0 0 1 1 2 2
complexity:
  - op: Sort n items, k values
    time: O(n + k)
    space: O(k)
videos:
  - title: Bucket Sort Algorithm Explained in 5 Minutes
    channel: CodeLucky
    url: https://www.youtube.com/watch?v=3G_UemqOkqs
  - title: Bucket Sort Program in Python | Step-by-Step Implementation
    channel: Amulya's Academy
    url: https://www.youtube.com/watch?v=jVfWqkQrBPo
practice:
  - title: Sort Colors
    url: https://leetcode.com/problems/sort-colors/
    difficulty: medium
  - title: Top K Frequent Elements
    url: https://leetcode.com/problems/top-k-frequent-elements/
    difficulty: medium
reflectionPrompt: Could you bucket sort a list of people by age? By name?
---

Comparison sorts like merge sort cannot beat O(n log n). Bucket sort sidesteps comparisons: make one bucket per possible value, drop each item into its bucket, then write the buckets back in order.

With n items and k possible values this is O(n + k). It only works when the range of values is small and known in advance (colours 0–2, exam scores 0–100, letters a–z). For a huge range of values the buckets would waste too much memory. Counting how often things appear is also the core idea behind many "top k frequent" problems.
