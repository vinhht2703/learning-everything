---
id: quick-sort
order: 12
section: SẮP XẾP
title: Sắp xếp nhanh
summary: Phân hoạch quanh phần tử chốt
duration: 17 phút
description: Sắp xếp nhanh chọn một phần tử chốt, đưa phần tử nhỏ hơn sang trái và lớn hơn sang phải, rồi sắp xếp từng bên.
goal: Phân hoạch mảng quanh phần tử chốt và giải thích vì sao trường hợp xấu nhất là O(n²).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đặt một phần tử vào đúng chỗ, rồi đệ quy
formula: "[ < chốt ] chốt [ ≥ chốt ]"
takeaways:
  - label: Phần tử chốt
    text: Sau khi phân hoạch, nó nằm đúng vị trí cuối cùng.
  - label: Tại chỗ
    text: Chỉ hoán đổi; không cần mảng phụ (ngăn xếp O(log n)).
  - label: Không ổn định
    text: Các phần tử bằng nhau có thể đổi thứ tự.
widget: sort-quick
widgetTitle: Phân hoạch quanh phần tử chốt
widgetDescription: Cột màu cam là chốt. Mỗi chốt chuyển sang xanh khi về đúng vị trí cuối cùng.
code:
  file: quick_sort.py
  lang: python
  source: |-
    def quick_sort(arr, lo, hi):
        if lo >= hi:
            return
        pivot = arr[hi]                 # last element as pivot
        left = lo
        for i in range(lo, hi):
            if arr[i] < pivot:          # move smaller items to the left side
                arr[left], arr[i] = arr[i], arr[left]
                left += 1
        arr[left], arr[hi] = arr[hi], arr[left]   # pivot to its final spot
        quick_sort(arr, lo, left - 1)
        quick_sort(arr, left + 1, hi)

    nums = [6, 2, 4, 1, 3, 5]
    quick_sort(nums, 0, len(nums) - 1)
    print(nums)
  output: "[1, 2, 3, 4, 5, 6]"
  description: Sắp xếp nhanh tại chỗ, chọn phần tử cuối làm chốt.
  variants:
    - lang: javascript
      file: quick_sort.js
      source: |-
        function quickSort(arr, lo, hi) {
          if (lo >= hi) return;
          const pivot = arr[hi];               // last element as pivot
          let left = lo;
          for (let i = lo; i < hi; i++) {
            if (arr[i] < pivot) {              // move smaller items to the left side
              [arr[left], arr[i]] = [arr[i], arr[left]];
              left++;
            }
          }
          [arr[left], arr[hi]] = [arr[hi], arr[left]];   // pivot to its final spot
          quickSort(arr, lo, left - 1);
          quickSort(arr, left + 1, hi);
        }

        const nums = [6, 2, 4, 1, 3, 5];
        quickSort(nums, 0, nums.length - 1);
        console.log(nums);
      output: "[ 1, 2, 3, 4, 5, 6 ]"
    - lang: cpp
      file: quick_sort.cpp
      source: |-
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        void quickSort(vector<int>& arr, int lo, int hi) {
            if (lo >= hi) return;
            int pivot = arr[hi];                // last element as pivot
            int left = lo;
            for (int i = lo; i < hi; i++) {
                if (arr[i] < pivot) swap(arr[left++], arr[i]);  // smaller items go left
            }
            swap(arr[left], arr[hi]);           // pivot to its final spot
            quickSort(arr, lo, left - 1);
            quickSort(arr, left + 1, hi);
        }

        int main() {
            vector<int> nums = {6, 2, 4, 1, 3, 5};
            quickSort(nums, 0, nums.size() - 1);
            for (int x : nums) cout << x << " ";
            cout << endl;
        }
      output: 1 2 3 4 5 6
complexity:
  - op: Trung bình
    time: O(n log n)
    space: O(log n)
  - op: Xấu nhất (chốt tệ)
    time: O(n²)
    space: O(n)
videos:
  - title: Quick sort in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=Hoixgm4-P4M
  - title: Quicksort algorithm
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=COk73cpQbFQ
practice:
  - title: Sort an Array
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Kth Largest Element in an Array
    url: https://leetcode.com/problems/kth-largest-element-in-an-array/
    difficulty: medium
reflectionPrompt: Đầu vào nào khiến chốt là phần tử cuối hoạt động tệ nhất, và bạn tránh điều đó thế nào?
---

Chọn một **phần tử chốt** (ở đây là phần tử cuối). Duyệt qua đoạn và hoán đổi mọi phần tử nhỏ hơn sang bên trái. Cuối cùng hoán đổi chốt về ngay sau chúng: lúc này chốt nằm đúng vị trí của nó trong mảng đã sắp xếp. Đệ quy cho phần bên trái và phần bên phải.

Khi chốt chia mảng gần đều hai nửa, sắp xếp nhanh chạy trong O(n log n) và sắp xếp tại chỗ, nên rất nhanh trong thực tế. Nếu chốt luôn là phần tử nhỏ nhất hoặc lớn nhất (ví dụ dữ liệu đã sắp xếp và chọn chốt là phần tử cuối), mỗi bước chỉ loại được một phần tử và thời gian thành O(n²). Chọn chốt ngẫu nhiên khiến điều đó rất khó xảy ra.
