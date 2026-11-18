---
id: heapify
order: 25
section: HEAP / HÀNG ĐỢI ƯU TIÊN
title: Heapify (vun đống)
summary: Xây heap trong O(n)
duration: 15 phút
description: Heapify biến bất kỳ mảng nào thành heap trong thời gian tuyến tính bằng cách cho mọi nút cha chìm xuống, từ nút cuối ngược về gốc.
goal: Xây heap từ dưới lên và hiểu vì sao nhanh hơn n lần thêm riêng lẻ.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Sửa heap nhỏ trước, rồi ghép lại
formula: "với i = n//2 − 1 giảm về 0: sift_down(i)  → O(n)"
takeaways:
  - label: Lá có sẵn
    text: Một nửa mảng không cần làm gì.
  - label: Từ dưới lên
    text: Cho các nút cha chìm xuống từ nút cuối đến gốc.
  - label: O(n)
    text: Rẻ hơn n lần thêm với O(n log n).
widget: heapify
widgetTitle: Xây heap từng bước
widgetDescription: Cây con màu xanh là heap đã xong. Thử mảng mới và đếm số lần hoán đổi.
code:
  file: heapify.py
  lang: python
  source: |-
    def sift_down(arr, i, n):
        while True:
            l, r, smallest = 2 * i + 1, 2 * i + 2, i
            if l < n and arr[l] < arr[smallest]: smallest = l
            if r < n and arr[r] < arr[smallest]: smallest = r
            if smallest == i:
                return
            arr[i], arr[smallest] = arr[smallest], arr[i]
            i = smallest

    def heapify(arr):
        # leaves are already heaps: start at the last parent and walk back to the root
        for i in range(len(arr) // 2 - 1, -1, -1):
            sift_down(arr, i, len(arr))
        return arr

    print(heapify([9, 5, 7, 2, 4, 1, 8]))

    import heapq                     # Python's built-in min-heap does the same
    nums = [9, 5, 7, 2, 4, 1, 8]
    heapq.heapify(nums)
    print(nums, heapq.heappop(nums))
  output: |-
    [1, 2, 7, 5, 4, 9, 8]
    [2, 4, 7, 5, 8, 9] 1
  description: Heapify từ dưới lên, rồi làm lại bằng thư viện chuẩn.
  variants:
    - lang: javascript
      file: heapify.js
      source: |-
        function siftDown(arr, i, n) {
          while (true) {
            const l = 2 * i + 1, r = 2 * i + 2;
            let smallest = i;
            if (l < n && arr[l] < arr[smallest]) smallest = l;
            if (r < n && arr[r] < arr[smallest]) smallest = r;
            if (smallest === i) return;
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            i = smallest;
          }
        }

        function heapify(arr) {
          // leaves are already heaps: start at the last parent and walk back to the root
          for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) siftDown(arr, i, arr.length);
          return arr;
        }

        console.log(heapify([9, 5, 7, 2, 4, 1, 8]).join(" "));
      output: 1 2 7 5 4 9 8
    - lang: cpp
      file: heapify.cpp
      source: |-
        #include <algorithm>
        #include <functional>
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        void siftDown(vector<int>& arr, int i, int n) {
            while (true) {
                int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
                if (l < n && arr[l] < arr[smallest]) smallest = l;
                if (r < n && arr[r] < arr[smallest]) smallest = r;
                if (smallest == i) return;
                swap(arr[i], arr[smallest]);
                i = smallest;
            }
        }

        void heapify(vector<int>& arr) {
            // leaves are already heaps: start at the last parent and walk back to the root
            for (int i = arr.size() / 2 - 1; i >= 0; i--) siftDown(arr, i, arr.size());
        }

        int main() {
            vector<int> arr = {9, 5, 7, 2, 4, 1, 8};
            heapify(arr);
            for (int v : arr) cout << v << " ";
            cout << endl;

            vector<int> nums = {9, 5, 7, 2, 4, 1, 8};
            make_heap(nums.begin(), nums.end(), greater<int>());   // the standard library equivalent
            cout << "min: " << nums.front() << endl;
        }
      output: |-
        1 2 7 5 4 9 8 
        min: 1
complexity:
  - op: Heapify n phần tử
    time: O(n)
    space: O(1)
  - op: n lần thêm riêng lẻ
    time: O(n log n)
    space: O(1)
videos:
  - title: 2.6.3 Heap - Heap Sort - Heapify - Priority Queues
    channel: Abdul Bari
    url: https://www.youtube.com/watch?v=HqPJF2L5h9U
  - title: Heap sort in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=2DmK_H7IdTo
practice:
  - title: Sort an Array (try heap sort)
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Kth Largest Element in an Array
    url: https://leetcode.com/problems/kth-largest-element-in-an-array/
    difficulty: medium
reflectionPrompt: Vì sao heapify bắt đầu từ giữa mảng chứ không phải từ cuối?
---

Nửa sau của mảng là các lá, và một lá đơn lẻ đã là heap. Vì vậy bắt đầu ở nút cha cuối cùng, chỉ số `n // 2 − 1`, cho nó chìm xuống, rồi đi dần sang trái về phía gốc. Khi tới một nút, cả hai cây con của nó đã là heap hợp lệ, nên chỉ một lần chìm xuống là đủ để cả cây con hợp lệ.

Thêm n phần tử lần lượt tốn O(n log n). Heapify là **O(n)**: phần lớn nút nằm gần đáy, nơi chìm xuống chỉ mất một hai bước, còn số ít nút gần đỉnh phải đi xa thì rất hiếm. Đây là cách `heapq.heapify` hoạt động, và là giai đoạn đầu của heap sort.
