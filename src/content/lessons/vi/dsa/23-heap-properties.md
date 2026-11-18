---
id: heap-properties
order: 23
section: HEAP / HÀNG ĐỢI ƯU TIÊN
title: Tính chất của heap
summary: Một cây lưu trong mảng
duration: 14 phút
description: Heap là một cây nhị phân đầy đủ, trong đó mọi nút cha nhỏ hơn (heap nhỏ nhất) hoặc lớn hơn (heap lớn nhất) các con, và được lưu trong một mảng thường.
goal: Đọc heap vừa như cây vừa như mảng, và tìm cha, con bằng phép tính chỉ số.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Phần tử nhỏ nhất luôn ở đỉnh
formula: cha(i) = (i − 1) // 2 · trái(i) = 2i + 1 · phải(i) = 2i + 2
takeaways:
  - label: Cây đầy đủ
    text: Lấp đầy theo từng tầng nên vừa khít trong mảng.
  - label: Thứ tự heap
    text: Cha ≤ con (heap nhỏ nhất); anh em không có thứ tự.
  - label: Hàng đợi ưu tiên
    text: Xem phần tử nhỏ/lớn nhất trong O(1).
widget: heap-view
widgetTitle: Khám phá heap dưới dạng cây và mảng
widgetDescription: Nhấp một nút hoặc ô để xem cha và các con. Đổi nhỏ nhất/lớn nhất, hoặc phá thứ tự để xem nút nào vi phạm.
code:
  file: heap_index.py
  lang: python
  source: |-
    # A min-heap stored in a plain list (index 0 is the root).
    heap = [1, 3, 2, 7, 4, 5, 6]

    def parent(i): return (i - 1) // 2
    def left(i):   return 2 * i + 1
    def right(i):  return 2 * i + 2

    def is_min_heap(arr):
        # every parent must be <= its children
        return all(arr[parent(i)] <= arr[i] for i in range(1, len(arr)))

    print("root (minimum):", heap[0])
    print("children of index 1:", heap[left(1)], heap[right(1)])
    print("parent of index 5:", heap[parent(5)])
    print("valid min-heap:", is_min_heap(heap), is_min_heap([3, 1, 2]))
  output: |-
    root (minimum): 1
    children of index 1: 7 4
    parent of index 5: 2
    valid min-heap: True False
  description: Phép tính chỉ số và kiểm tra một danh sách có phải heap nhỏ nhất hợp lệ.
  variants:
    - lang: javascript
      file: heap_index.js
      source: |-
        // A min-heap stored in a plain array (index 0 is the root).
        const heap = [1, 3, 2, 7, 4, 5, 6];

        const parent = (i) => Math.floor((i - 1) / 2);
        const left = (i) => 2 * i + 1;
        const right = (i) => 2 * i + 2;

        // every parent must be <= its children
        const isMinHeap = (arr) => arr.every((v, i) => i === 0 || arr[parent(i)] <= v);

        console.log("root (minimum):", heap[0]);
        console.log("children of index 1:", heap[left(1)], heap[right(1)]);
        console.log("parent of index 5:", heap[parent(5)]);
        console.log("valid min-heap:", isMinHeap(heap), isMinHeap([3, 1, 2]));
      output: |-
        root (minimum): 1
        children of index 1: 7 4
        parent of index 5: 2
        valid min-heap: true false
    - lang: cpp
      file: heap_index.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        // A min-heap stored in a plain vector (index 0 is the root).
        int parent(int i) { return (i - 1) / 2; }
        int leftChild(int i) { return 2 * i + 1; }
        int rightChild(int i) { return 2 * i + 2; }

        bool isMinHeap(const vector<int>& arr) {
            for (int i = 1; i < (int)arr.size(); i++)
                if (arr[parent(i)] > arr[i]) return false;   // a parent bigger than its child
            return true;
        }

        int main() {
            vector<int> heap = {1, 3, 2, 7, 4, 5, 6};
            cout << boolalpha;
            cout << "root (minimum): " << heap[0] << endl;
            cout << "children of index 1: " << heap[leftChild(1)] << " " << heap[rightChild(1)] << endl;
            cout << "parent of index 5: " << heap[parent(5)] << endl;
            cout << "valid min-heap: " << isMinHeap(heap) << " " << isMinHeap({3, 1, 2}) << endl;
        }
      output: |-
        root (minimum): 1
        children of index 1: 7 4
        parent of index 5: 2
        valid min-heap: true false
complexity:
  - op: Xem nhỏ / lớn nhất
    time: O(1)
    space: O(1)
  - op: Tìm cha / con
    time: O(1)
    space: O(1)
  - op: Tìm một giá trị bất kỳ
    time: O(n)
    space: O(1)
videos:
  - title: Heaps in 3 minutes — Intro
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=0wPlzMU-k00
  - title: "Data Structures: Heaps"
    channel: HackerRank
    url: https://www.youtube.com/watch?v=t0Cq6tVNRBA
practice:
  - title: Kth Largest Element in a Stream
    url: https://leetcode.com/problems/kth-largest-element-in-a-stream/
    difficulty: easy
  - title: Last Stone Weight
    url: https://leetcode.com/problems/last-stone-weight/
    difficulty: easy
reflectionPrompt: Kể một tình huống thực tế mà bạn luôn cần "phần tử khẩn cấp nhất tiếp theo".
---

Heap có hai quy tắc. **Hình dạng:** là cây nhị phân đầy đủ, mọi tầng đều đầy trừ tầng cuối, tầng cuối được lấp từ trái sang. **Thứ tự:** trong heap nhỏ nhất, mọi nút cha ≤ các con (heap lớn nhất thì ≥). Quy tắc thứ tự chỉ so sánh cha với con; các nút anh em có thể theo bất kỳ thứ tự nào, nên heap *không* phải là dãy đã sắp xếp.

Vì cây đầy đủ nên nó vừa khít trong một mảng không có lỗ hổng: đọc cây theo từng tầng. Khi đó cha và các con của chỉ số `i` được tìm bằng phép tính thay vì con trỏ. Phần tử nhỏ nhất luôn là `heap[0]`, nên xem nó tốn O(1). Heap chính là cách xây dựng **hàng đợi ưu tiên**: "luôn đưa tôi phần tử khẩn cấp nhất tiếp theo".
