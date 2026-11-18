---
id: hash-usage
order: 26
section: BĂM
title: Sử dụng bảng băm
summary: Tra cứu theo khóa trong O(1)
duration: 10 phút
description: Bảng băm (dict của Python, Map của JavaScript, unordered_map của C++) lưu cặp khóa → giá trị với thêm, tra cứu và xóa trung bình O(1).
goal: Nhận ra các bài toán mà bảng băm hoặc tập hợp biến O(n²) thành O(n).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đổi một chút bộ nhớ lấy nhiều tốc độ
formula: đếm / đã gặp / chỉ số → dict;  "x có ở đây không?" → set
takeaways:
  - label: Đếm
    text: Một lượt duyệt với counts[x] += 1.
  - label: Đã gặp chưa
    text: Lưu phần bù để trả lời trong O(1).
  - label: Tập hợp
    text: Kiểm tra thành viên và loại trùng nhanh.
widget: hash-counter
widgetTitle: Đếm từ bằng bảng băm
widgetDescription: "Gõ văn bản bất kỳ: mỗi từ cập nhật số đếm trong O(1). Tra một từ để thấy trúng hoặc trượt trong O(1)."
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
  description: Đếm, Two Sum và tập hợp.
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
  - op: Thêm / tra / xóa (trung bình)
    time: O(1)
    space: O(n)
  - op: Xấu nhất (nhiều va chạm)
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
reflectionPrompt: Tìm một vòng lặp lồng trong mã của bạn. Liệu dict hoặc set có bỏ được vòng lặp trong không?
---

Ba mẫu bao quát phần lớn cách dùng. **Đếm:** duyệt dữ liệu một lần và tăng `counts[x]`. **Ghi nhớ:** lưu những gì đã gặp (giá trị → chỉ số) để phần tử sau hỏi "mình đã gặp bạn cặp chưa?" trong O(1); đây là cách Two Sum giảm từ O(n²) xuống O(n). **Thành viên:** tập hợp trả lời "x có ở đây không?" trong O(1) và loại bỏ trùng lặp.

Cái giá là bộ nhớ thêm, O(n), và không có thứ tự: thứ tự duyệt là thứ tự chèn (Python, JavaScript) hoặc tùy ý (`unordered_map` của C++). Khi cần khóa có thứ tự, hãy dùng bản đồ dạng cây từ bài BST.
