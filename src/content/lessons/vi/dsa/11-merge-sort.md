---
id: merge-sort
order: 11
section: SẮP XẾP
title: Sắp xếp trộn
summary: Chia đôi, sắp xếp, trộn lại
duration: 22 phút
description: Sắp xếp trộn chia đôi mảng, sắp xếp đệ quy từng nửa, rồi trộn hai nửa đã sắp xếp lại với nhau.
goal: Giải thích chia để trị và vì sao sắp xếp trộn luôn là O(n log n).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Chia để trị
formula: log₂ n tầng × O(n) công trộn mỗi tầng = O(n log n)
takeaways:
  - label: Chia
    text: Chia đến khi mỗi phần chỉ còn một phần tử.
  - label: Trộn
    text: Kết hợp hai danh sách đã sắp xếp trong O(n) bằng hai con trỏ.
  - label: Luôn O(n log n)
    text: Không có đầu vào xấu, nhưng cần O(n) bộ nhớ phụ.
widget: sort-merge
widgetTitle: Xem các nửa được trộn
widgetDescription: Cột mờ nằm ngoài đoạn đang xét. Đoạn màu xanh đã được trộn.
code:
  file: merge_sort.py
  lang: python
  source: |-
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        return merge(left, right)

    def merge(left, right):
        out, i, j = [], 0, 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:      # <= keeps the sort stable
                out.append(left[i]); i += 1
            else:
                out.append(right[j]); j += 1
        return out + left[i:] + right[j:]

    print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
  output: "[3, 9, 10, 27, 38, 43, 82]"
  description: Sắp xếp trộn đệ quy trả về danh sách mới đã sắp xếp.
  variants:
    - lang: javascript
      file: merge_sort.js
      source: |-
        function mergeSort(arr) {
          if (arr.length <= 1) return arr;
          const mid = Math.floor(arr.length / 2);
          return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
        }

        function merge(left, right) {
          const out = [];
          let i = 0, j = 0;
          while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) out.push(left[i++]);   // <= keeps it stable
            else out.push(right[j++]);
          }
          return [...out, ...left.slice(i), ...right.slice(j)];
        }

        console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]).join(" "));
      output: 3 9 10 27 38 43 82
    - lang: cpp
      file: merge_sort.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        vector<int> merge(const vector<int>& left, const vector<int>& right) {
            vector<int> out;
            size_t i = 0, j = 0;
            while (i < left.size() && j < right.size()) {
                if (left[i] <= right[j]) out.push_back(left[i++]);  // <= keeps it stable
                else out.push_back(right[j++]);
            }
            while (i < left.size()) out.push_back(left[i++]);
            while (j < right.size()) out.push_back(right[j++]);
            return out;
        }

        vector<int> mergeSort(const vector<int>& arr) {
            if (arr.size() <= 1) return arr;
            size_t mid = arr.size() / 2;
            vector<int> left(arr.begin(), arr.begin() + mid), right(arr.begin() + mid, arr.end());
            return merge(mergeSort(left), mergeSort(right));
        }

        int main() {
            for (int x : mergeSort({38, 27, 43, 3, 9, 82, 10})) cout << x << " ";
            cout << endl;
        }
      output: 3 9 10 27 38 43 82
complexity:
  - op: Mọi trường hợp
    time: O(n log n)
    space: O(n)
videos:
  - title: Merge sort in 3 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=4VqmGXwpLqc
  - title: Merge sort algorithm
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=TzeBrDU-JaY
practice:
  - title: Merge Sorted Array
    url: https://leetcode.com/problems/merge-sorted-array/
    difficulty: easy
  - title: Sort an Array
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Merge k Sorted Lists
    url: https://leetcode.com/problems/merge-k-sorted-lists/
    difficulty: hard
reflectionPrompt: '"Chia đôi, giải, kết hợp" còn có thể giúp bạn ở đâu khác?'
---

Mảng một phần tử đã có thứ tự, đó là trường hợp cơ sở. Ngược lại, chia mảng làm hai nửa, sắp xếp mỗi nửa bằng chính hàm đó, rồi **trộn**: nhìn phần tử đầu của hai nửa, lấy phần tử nhỏ hơn, lặp lại.

Chia đôi n liên tục cho khoảng log₂ n tầng, và mỗi tầng trộn toàn bộ n phần tử một lần, nên sắp xếp trộn là O(n log n) trong mọi trường hợp. Cái giá là O(n) bộ nhớ phụ cho các mảng trộn. Thuật toán này ổn định, vì vậy nhiều thư viện chuẩn dùng sắp xếp trộn (hoặc Timsort, một biến thể).
