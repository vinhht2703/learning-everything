---
id: search-range
order: 15
section: TÌM KIẾM NHỊ PHÂN
title: Tìm kiếm nhị phân trên một khoảng
summary: Tìm đáp án, không phải tìm trong mảng
duration: 8 phút
description: "Tìm kiếm nhị phân không cần mảng: mọi câu hỏi có/không đổi kết quả đúng một lần trên một khoảng số đều tìm được."
goal: Áp dụng tìm kiếm nhị phân cho một khoảng đáp án có thể, như trò đoán số.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Cao hơn hay thấp hơn?
formula: khoảng [lo, hi], hỏi về mid → giữ lại một nửa
takeaways:
  - label: Không gian tìm kiếm
    text: Một khoảng đáp án có thể, không phải dữ liệu lưu sẵn.
  - label: Phép kiểm tra đơn điệu
    text: Kết quả chỉ đổi một lần trên toàn khoảng.
  - label: log₂(khoảng)
    text: 1.000.000 khả năng chỉ cần khoảng 20 lần kiểm tra.
widget: guess-number
widgetTitle: Để máy tính đoán số của bạn
widgetDescription: Chọn số bí mật và khoảng. Vùng màu xanh là mọi khả năng còn lại.
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
  description: Tìm kiếm nhị phân trên khoảng 1–100 với phép kiểm tra guess().
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
  - op: Tìm trong khoảng kích thước R
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
reflectionPrompt: Hãy mô tả một quyết định thực tế bạn có thể đưa ra nhanh hơn bằng cách liên tục chia đôi các lựa chọn.
---

Hãy nghĩ tới trò "đoán số". Bạn không có mảng, chỉ có khoảng 1–100 và một hàm trả lời "cao hơn", "thấp hơn" hoặc "đúng". Luôn đoán số ở giữa sẽ tìm ra bất kỳ số nào trong tối đa 7 lần.

Cùng mẫu này giải được nhiều bài: tìm phiên bản phần mềm lỗi đầu tiên, tốc độ nhỏ nhất để kịp hoàn thành công việc, hay căn bậc hai nguyên. Nếu bạn viết được một phép kiểm tra sai với đáp án nhỏ và đúng với đáp án lớn (hoặc ngược lại), tìm kiếm nhị phân sẽ tìm ra ranh giới với O(log khoảng) lần kiểm tra.
