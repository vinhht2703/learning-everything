---
id: insertion-sort
order: 10
section: SẮP XẾP
title: Sắp xếp chèn
summary: Mở rộng phần đã sắp xếp từng phần tử
duration: 19 phút
description: Sắp xếp chèn xây dựng kết quả từng phần tử một, trượt mỗi phần tử mới sang trái cho đến khi vừa chỗ.
goal: Tự lần theo sắp xếp chèn và giải thích vì sao nó nhanh với dữ liệu gần như đã sắp xếp.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Giống xếp bài trên tay
formula: "xấu nhất: 1 + 2 + … + (n − 1) = n(n − 1)/2 → O(n²)"
takeaways:
  - label: Phần đầu đã sắp xếp
    text: Mọi thứ bên trái phần tử hiện tại đã có thứ tự.
  - label: Ổn định
    text: Các giá trị bằng nhau không bao giờ vượt qua nhau.
  - label: Tốt nhất với dữ liệu gần sắp xếp
    text: Cần rất ít lần hoán đổi, gần O(n).
widget: sort-insertion
widgetTitle: Chạy từng bước sắp xếp chèn
widgetDescription: Cột xanh là phần đã sắp xếp. Xem mỗi cột mới trượt sang trái. Thử Xáo trộn để có dữ liệu mới.
code:
  file: insertion_sort.py
  lang: python
  source: |-
    def insertion_sort(arr):
        for i in range(1, len(arr)):
            j = i - 1
            # swap the new item left until it is in place
            while j >= 0 and arr[j + 1] < arr[j]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                j -= 1
        return arr

    print(insertion_sort([5, 2, 4, 1, 3]))
  output: "[1, 2, 3, 4, 5]"
  description: Hoán đổi phần tử mới sang trái cho đến khi đúng chỗ.
  variants:
    - lang: javascript
      file: insertion_sort.js
      source: |-
        function insertionSort(arr) {
          for (let i = 1; i < arr.length; i++) {
            let j = i - 1;
            // swap the new item left until it is in place
            while (j >= 0 && arr[j + 1] < arr[j]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              j--;
            }
          }
          return arr;
        }

        console.log(insertionSort([5, 2, 4, 1, 3]));
      output: "[ 1, 2, 3, 4, 5 ]"
    - lang: cpp
      file: insertion_sort.cpp
      source: |-
        #include <iostream>
        #include <utility>
        #include <vector>
        using namespace std;

        void insertionSort(vector<int>& arr) {
            for (int i = 1; i < (int)arr.size(); i++) {
                int j = i - 1;
                // swap the new item left until it is in place
                while (j >= 0 && arr[j + 1] < arr[j]) {
                    swap(arr[j], arr[j + 1]);
                    j--;
                }
            }
        }

        int main() {
            vector<int> arr = {5, 2, 4, 1, 3};
            insertionSort(arr);
            for (int x : arr) cout << x << " ";
            cout << endl;
        }
      output: 1 2 3 4 5
complexity:
  - op: Xấu nhất / trung bình
    time: O(n²)
    space: O(1)
  - op: Tốt nhất (đã sắp xếp)
    time: O(n)
    space: O(1)
videos:
  - title: Insertion sort in 2 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=JU767SDMDvA
  - title: Insertion sort algorithm
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=i-SKeOcBwko
practice:
  - title: Sort an Array
    url: https://leetcode.com/problems/sort-an-array/
    difficulty: medium
  - title: Insertion Sort List
    url: https://leetcode.com/problems/insertion-sort-list/
    difficulty: medium
reflectionPrompt: Vì sao sắp xếp chèn gần như không phải làm gì với danh sách đã có thứ tự?
---

Phần bên trái của mảng luôn được sắp xếp. Mỗi vòng lấy phần tử kế tiếp và hoán đổi nó sang trái chừng nào nó còn nhỏ hơn phần tử bên cạnh. Khi dừng lại, phần đã sắp xếp dài thêm một phần tử.

Trường hợp xấu nhất (thứ tự ngược) mỗi phần tử phải đi hết về bên trái, nên công việc là O(n²). Nhưng nếu dữ liệu gần như đã sắp xếp, mỗi phần tử chỉ dịch một hai bước và tổng thời gian gần O(n). Sắp xếp chèn **ổn định** (phần tử bằng nhau giữ nguyên thứ tự) và sắp xếp **tại chỗ** với O(1) bộ nhớ phụ.
