---
id: search-array
order: 14
section: TÌM KIẾM NHỊ PHÂN
title: Tìm kiếm nhị phân trong mảng
summary: Chia đôi mảng đã sắp xếp mỗi bước
duration: 16 phút
description: Trong mảng đã sắp xếp, bạn tìm được giá trị bằng cách xem phần tử giữa và bỏ đi nửa không thể chứa nó.
goal: Cài đặt tìm kiếm nhị phân với con trỏ low/high và tránh lỗi lệch một.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Chia đôi không gian tìm kiếm mỗi lần
formula: n → n/2 → n/4 → … → 1   ⇒   khoảng log₂ n bước
takeaways:
  - label: Đầu vào đã sắp xếp
    text: Tìm kiếm nhị phân chỉ dùng được với dữ liệu có thứ tự.
  - label: low / mid / high
    text: Khung còn có thể chứa đáp án.
  - label: O(log n)
    text: Khoảng 20 lần kiểm tra cho một triệu phần tử.
widget: binary-search
widgetTitle: Tìm giá trị từng bước
widgetDescription: Ô mờ đã bị loại. So sánh số lần kiểm tra của tìm kiếm nhị phân với duyệt tuyến tính.
code:
  file: binary_search.py
  lang: python
  source: |-
    def binary_search(arr, target):
        low, high = 0, len(arr) - 1
        while low <= high:
            mid = (low + high) // 2
            if arr[mid] < target:
                low = mid + 1           # target is in the right half
            elif arr[mid] > target:
                high = mid - 1          # target is in the left half
            else:
                return mid
        return -1

    nums = [1, 3, 5, 7, 9, 11, 13]
    print(binary_search(nums, 9), binary_search(nums, 4))
  output: 4 -1
  description: Tìm kiếm nhị phân dạng lặp, trả về chỉ số hoặc -1.
  variants:
    - lang: javascript
      file: binary_search.js
      source: |-
        function binarySearch(arr, target) {
          let low = 0, high = arr.length - 1;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] < target) low = mid + 1;        // right half
            else if (arr[mid] > target) high = mid - 1;  // left half
            else return mid;
          }
          return -1;
        }

        const nums = [1, 3, 5, 7, 9, 11, 13];
        console.log(binarySearch(nums, 9), binarySearch(nums, 4));
      output: 4 -1
    - lang: cpp
      file: binary_search.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        int binarySearch(const vector<int>& arr, int target) {
            int low = 0, high = arr.size() - 1;
            while (low <= high) {
                int mid = low + (high - low) / 2;   // avoids overflow on huge arrays
                if (arr[mid] < target) low = mid + 1;
                else if (arr[mid] > target) high = mid - 1;
                else return mid;
            }
            return -1;
        }

        int main() {
            vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
            cout << binarySearch(nums, 9) << " " << binarySearch(nums, 4) << endl;
        }
      output: 4 -1
complexity:
  - op: Tìm trong mảng đã sắp xếp
    time: O(log n)
    space: O(1)
videos:
  - title: Binary search in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=fDKIpRe8GW4
  - title: What is binary search
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=j5uXyPJ0Pew
practice:
  - title: Binary Search
    url: https://leetcode.com/problems/binary-search/
    difficulty: easy
  - title: Search a 2D Matrix
    url: https://leetcode.com/problems/search-a-2d-matrix/
    difficulty: medium
reflectionPrompt: Điều gì sai nếu chạy tìm kiếm nhị phân trên mảng chưa sắp xếp?
---

Giữ hai con trỏ `low` và `high` bao quanh phần mảng còn có thể chứa giá trị cần tìm. Xem phần tử ở giữa. Nếu nó nhỏ hơn giá trị cần tìm, mọi thứ bên trái nó đều quá nhỏ, nên dời `low` qua nó. Nếu nó lớn hơn, dời `high` về trước nó. Dừng khi tìm thấy hoặc khi `low` vượt qua `high`.

Mỗi lần kiểm tra chia đôi khoảng, nên ngay cả một triệu phần tử cũng chỉ cần khoảng 20 lần: O(log n). Mảng **bắt buộc phải được sắp xếp**. Phần lớn lỗi đến từ điều kiện vòng lặp (`low <= high`) và quên `+ 1` / `- 1` khi dời con trỏ.
