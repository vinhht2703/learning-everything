---
id: static-arrays
order: 2
section: MẢNG
title: Mảng tĩnh
summary: Kích thước cố định, đọc nhanh, dịch chuyển tốn kém
duration: 15 phút
description: Mảng tĩnh có sức chứa cố định được chọn khi tạo. Đọc thì tức thì, nhưng chèn vào giữa phải dịch chuyển phần tử.
goal: Giải thích vì sao ghi vào cuối là O(1) nhưng chèn hoặc xóa ở giữa là O(n).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Không được có khoảng trống
formula: chèn / xóa tại i → dịch (length − i) phần tử
takeaways:
  - label: Sức chứa
    text: Số ô cố định được dành sẵn trong bộ nhớ.
  - label: Độ dài
    text: Số ô hiện đang chứa giá trị thật.
  - label: Dịch chuyển
    text: "Di chuyển phần tử để mảng không có lỗ hổng: O(n)."
widget: static-array
widgetTitle: Chèn và xóa trong mảng kích thước cố định
widgetDescription: So sánh thao tác ở cuối với thao tác ở giữa. Ô màu cam là những ô phải di chuyển.
code:
  file: insert.py
  lang: python
  source: |-
    def insert_at(arr, length, i, value):
        # shift elements right to open a gap at index i
        for j in range(length - 1, i - 1, -1):
            arr[j + 1] = arr[j]
        arr[i] = value
        return length + 1

    arr = [4, 5, 6, 0, 0]    # capacity 5, length 3
    length = insert_at(arr, 3, 1, 9)
    print(arr[:length])
  output: "[4, 9, 5, 6]"
  description: Chèn vào giữa bằng cách dịch phần tử sang phải.
  variants:
    - lang: javascript
      file: insert.js
      source: |-
        function insertAt(arr, length, i, value) {
          // shift elements right to open a gap at index i
          for (let j = length - 1; j >= i; j--) {
            arr[j + 1] = arr[j];
          }
          arr[i] = value;
          return length + 1;
        }

        const arr = [4, 5, 6, 0, 0];   // capacity 5, length 3
        const length = insertAt(arr, 3, 1, 9);
        console.log(arr.slice(0, length));
      output: "[ 4, 9, 5, 6 ]"
    - lang: cpp
      file: insert.cpp
      source: |-
        #include <iostream>
        using namespace std;

        int insertAt(int arr[], int length, int i, int value) {
            // shift elements right to open a gap at index i
            for (int j = length - 1; j >= i; j--) {
                arr[j + 1] = arr[j];
            }
            arr[i] = value;
            return length + 1;
        }

        int main() {
            int arr[5] = {4, 5, 6};          // capacity 5, length 3
            int length = insertAt(arr, 3, 1, 9);
            for (int k = 0; k < length; k++) cout << arr[k] << " ";
            cout << endl;
        }
      output: 4 9 5 6
complexity:
  - op: Đọc / ghi arr[i]
    time: O(1)
    space: O(1)
  - op: Chèn / xóa ở cuối
    time: O(1)
    space: O(1)
  - op: Chèn / xóa ở giữa
    time: O(n)
    space: O(1)
videos:
  - title: Array Memory Representation & Basics Explained
    channel: CodeLucky
    url: https://www.youtube.com/watch?v=HWQ-1BTC1L8
  - title: "Data Structures: Arrays vs Linked Lists"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=lC-yYCOnN8Q
practice:
  - title: Remove Element
    url: https://leetcode.com/problems/remove-element/
    difficulty: easy
  - title: Remove Duplicates from Sorted Array
    url: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
    difficulty: easy
reflectionPrompt: Trong mã của bạn, chỗ nào bạn chèn vào đầu danh sách? Có thể thêm vào cuối thay thế không?
---

Vì các phần tử phải liên tiếp nên mảng không được có lỗ hổng. Để chèn tại chỉ số `i`, mọi phần tử từ `i` đến cuối phải dịch sang phải một bước trước. Để xóa tại `i`, mọi phần tử phía sau dịch sang trái một bước. Trường hợp xấu nhất (chỉ số 0) phải đụng tới cả n phần tử.

Thao tác ở cuối thì khác: ghi vào ô trống kế tiếp hoặc bỏ phần tử cuối không phải dịch gì cả, nên là O(1). Mảng tĩnh cũng không thể mở rộng: khi đã đầy, bạn cần một mảng mới lớn hơn.
