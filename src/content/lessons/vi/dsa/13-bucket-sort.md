---
id: bucket-sort
order: 13
section: SẮP XẾP
title: Sắp xếp theo xô
summary: Đếm vào xô, không cần so sánh
duration: 14 phút
description: Khi giá trị nằm trong một khoảng nhỏ đã biết, bạn có thể sắp xếp bằng cách đếm số lượng mỗi giá trị.
goal: Sắp xếp mảng có khoảng giá trị nhỏ trong O(n) và nhận ra khi nào dùng được mẹo này.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Bỏ hẳn việc so sánh
formula: một lượt đếm + một lượt ghi → O(n + k)
takeaways:
  - label: Xô
    text: Một bộ đếm cho một giá trị có thể.
  - label: O(n + k)
    text: Tuyến tính khi khoảng giá trị k nhỏ.
  - label: Phạm vi hẹp
    text: Cần một tập giá trị nhỏ và biết trước.
widget: sort-bucket
widgetTitle: Đếm, rồi ghi lại
widgetDescription: Giá trị là 0, 1 hoặc 2. Xem số đếm trong các xô tăng dần, rồi mảng được ghi lại theo thứ tự.
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
  description: Sắp xếp đếm cho giá trị 0, 1, 2 (bài Sort Colors).
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
  - op: Sắp xếp n phần tử, k giá trị
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
reflectionPrompt: Bạn có thể sắp xếp theo xô một danh sách người theo tuổi không? Theo tên thì sao?
---

Các thuật toán sắp xếp bằng so sánh như sắp xếp trộn không thể nhanh hơn O(n log n). Sắp xếp theo xô né tránh việc so sánh: tạo một xô cho mỗi giá trị có thể, thả từng phần tử vào xô của nó, rồi ghi các xô trở lại theo thứ tự.

Với n phần tử và k giá trị có thể, chi phí là O(n + k). Cách này chỉ hiệu quả khi khoảng giá trị nhỏ và biết trước (màu 0–2, điểm thi 0–100, chữ cái a–z). Với khoảng giá trị khổng lồ, các xô sẽ tốn quá nhiều bộ nhớ. Đếm tần suất xuất hiện cũng là ý tưởng cốt lõi của nhiều bài "top k phần tử xuất hiện nhiều nhất".
