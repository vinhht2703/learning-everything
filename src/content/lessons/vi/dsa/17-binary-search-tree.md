---
id: binary-search-tree
order: 17
section: CÂY
title: Cây nhị phân tìm kiếm
summary: Trái nhỏ hơn, phải lớn hơn
duration: 15 phút
description: Cây nhị phân tìm kiếm (BST) giữ giá trị có thứ tự để mỗi lần tìm có thể bỏ qua một nửa cây còn lại.
goal: Phát biểu tính chất BST và tìm kiếm trong BST với O(h).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Tìm kiếm nhị phân dưới dạng cây
formula: cây con trái < nút < cây con phải
takeaways:
  - label: Tính chất BST
    text: Giá trị nhỏ bên trái, lớn bên phải, tại mọi nút.
  - label: Tìm kiếm O(h)
    text: O(log n) khi cân bằng, O(n) khi suy biến.
  - label: Cây cân bằng
    text: Cây AVL và đỏ-đen tự giữ h ≈ log n.
widget: bst-search
widgetTitle: Tìm kiếm trong BST
widgetDescription: Nhập một giá trị và xem việc tìm kiếm rẽ trái hay phải. Các nút mờ không bao giờ được thăm.
code:
  file: bst_search.py
  lang: python
  source: |-
    class TreeNode:
        def __init__(self, val, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    def search(root, target):
        if not root:
            return False
        if target > root.val:
            return search(root.right, target)   # bigger values live on the right
        if target < root.val:
            return search(root.left, target)    # smaller values live on the left
        return True

    #        8
    #      /   \
    #     3     10
    #    / \      \
    #   1   6      14
    root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))
    print(search(root, 6), search(root, 7))
  output: True False
  description: Tìm kiếm BST bằng đệ quy.
  variants:
    - lang: javascript
      file: bst_search.js
      source: |-
        class TreeNode {
          constructor(val, left = null, right = null) {
            this.val = val;
            this.left = left;
            this.right = right;
          }
        }

        function search(root, target) {
          if (!root) return false;
          if (target > root.val) return search(root.right, target); // bigger → right
          if (target < root.val) return search(root.left, target);  // smaller → left
          return true;
        }

        //        8
        //      /   \
        //     3     10
        //    / \      \
        //   1   6      14
        const root = new TreeNode(8,
          new TreeNode(3, new TreeNode(1), new TreeNode(6)),
          new TreeNode(10, null, new TreeNode(14)));
        console.log(search(root, 6), search(root, 7));
      output: true false
    - lang: cpp
      file: bst_search.cpp
      source: |-
        #include <iostream>
        using namespace std;

        struct TreeNode {
            int val;
            TreeNode* left;
            TreeNode* right;
            TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
        };

        bool search(TreeNode* root, int target) {
            if (!root) return false;
            if (target > root->val) return search(root->right, target);  // bigger → right
            if (target < root->val) return search(root->left, target);   // smaller → left
            return true;
        }

        int main() {
            //        8
            //      /   \
            //     3     10
            //    / \      \
            //   1   6      14
            TreeNode* root = new TreeNode(8,
                new TreeNode(3, new TreeNode(1), new TreeNode(6)),
                new TreeNode(10, nullptr, new TreeNode(14)));
            cout << boolalpha << search(root, 6) << " " << search(root, 7) << endl;
        }
      output: true false
complexity:
  - op: Tìm kiếm (cân bằng)
    time: O(log n)
    space: O(log n)
  - op: Tìm kiếm (suy biến)
    time: O(n)
    space: O(n)
videos:
  - title: "Data structures: Binary Search Tree"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=pYT9F8_LFTM
  - title: BINARY SEARCH TREES (explained simply)
    channel: Robot Maze
    url: https://www.youtube.com/watch?v=reyofDosTGE
practice:
  - title: Search in a Binary Search Tree
    url: https://leetcode.com/problems/search-in-a-binary-search-tree/
    difficulty: easy
  - title: Lowest Common Ancestor of a Binary Search Tree
    url: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
    difficulty: medium
reflectionPrompt: Một BST sẽ trông thế nào nếu bạn chèn 1, 2, 3, 4, 5 theo đúng thứ tự đó?
---

Trong BST, mọi giá trị ở cây con trái của một nút đều nhỏ hơn nút đó, và mọi giá trị ở cây con phải đều lớn hơn. Để tìm, so sánh với gốc: nhỏ hơn thì đi trái, lớn hơn thì đi phải. Mỗi bước loại bỏ cả một cây con.

Chi phí bằng chiều cao h của cây. BST **cân bằng** có h ≈ log n, nên tìm kiếm là O(log n), giống tìm kiếm nhị phân trên mảng, nhưng BST còn chèn và xóa được mà không phải dịch chuyển phần tử. Nếu chèn các giá trị theo thứ tự tăng dần, cây suy biến thành danh sách liên kết và h = n. Các cây tự cân bằng (AVL, đỏ-đen) ngăn chặn điều đó.
