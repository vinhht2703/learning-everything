---
id: binary-tree
order: 16
section: CÂY
title: Cây nhị phân
summary: Nút có tối đa hai con
duration: 11 phút
description: "Cây nhị phân giống danh sách liên kết nhưng mỗi nút có thể trỏ tới hai con: trái và phải."
goal: Gọi tên các thành phần của cây và tính chiều cao bằng đệ quy.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Mỗi nút có tối đa hai con
formula: chiều_cao(nút) = 1 + max(chiều_cao(trái), chiều_cao(phải))
takeaways:
  - label: Gốc / lá
    text: Nút trên cùng / các nút không có con.
  - label: Độ sâu / chiều cao
    text: Khoảng cách từ gốc / đường dài nhất xuống lá.
  - label: Hình dạng đệ quy
    text: Mỗi cây con là một cây nhị phân nhỏ hơn.
widget: tree-anatomy
widgetTitle: Khám phá cây nhị phân
widgetDescription: Làm nổi bật gốc, các lá hoặc đường dài nhất. Nhấp một nút để xem chi tiết, hoặc cho cây lớn thêm.
code:
  file: binary_tree.py
  lang: python
  source: |-
    class TreeNode:
        def __init__(self, val, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    def height(node):
        if not node:
            return 0
        return 1 + max(height(node.left), height(node.right))

    def count_leaves(node):
        if not node:
            return 0
        if not node.left and not node.right:
            return 1
        return count_leaves(node.left) + count_leaves(node.right)

    #        1
    #      /   \
    #     2     3
    #    / \     \
    #   4   5     6
    root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3, None, TreeNode(6)))
    print(height(root), count_leaves(root))
  output: 3 3
  description: Tạo một cây nhỏ, rồi tính chiều cao và số lá bằng đệ quy.
  variants:
    - lang: javascript
      file: binary_tree.js
      source: |-
        class TreeNode {
          constructor(val, left = null, right = null) {
            this.val = val;
            this.left = left;
            this.right = right;
          }
        }

        const height = (node) => (node ? 1 + Math.max(height(node.left), height(node.right)) : 0);

        function countLeaves(node) {
          if (!node) return 0;
          if (!node.left && !node.right) return 1;
          return countLeaves(node.left) + countLeaves(node.right);
        }

        //        1
        //      /   \
        //     2     3
        //    / \     \
        //   4   5     6
        const root = new TreeNode(1,
          new TreeNode(2, new TreeNode(4), new TreeNode(5)),
          new TreeNode(3, null, new TreeNode(6)));
        console.log(height(root), countLeaves(root));
      output: 3 3
    - lang: cpp
      file: binary_tree.cpp
      source: |-
        #include <algorithm>
        #include <iostream>
        using namespace std;

        struct TreeNode {
            int val;
            TreeNode* left;
            TreeNode* right;
            TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
        };

        int height(TreeNode* node) {
            if (!node) return 0;
            return 1 + max(height(node->left), height(node->right));
        }

        int countLeaves(TreeNode* node) {
            if (!node) return 0;
            if (!node->left && !node->right) return 1;
            return countLeaves(node->left) + countLeaves(node->right);
        }

        int main() {
            //        1
            //      /   \
            //     2     3
            //    / \     \
            //   4   5     6
            TreeNode* root = new TreeNode(1,
                new TreeNode(2, new TreeNode(4), new TreeNode(5)),
                new TreeNode(3, nullptr, new TreeNode(6)));
            cout << height(root) << " " << countLeaves(root) << endl;
        }
      output: 3 3
complexity:
  - op: Thăm mọi nút (chiều cao, đếm)
    time: O(n)
    space: O(h) ngăn xếp lời gọi
videos:
  - title: "Data structures: Introduction to Trees"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=qH6yxkw0u78
  - title: "Data structures: Binary Tree"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=H5JubkIy_p8
  - title: Find height of a binary tree
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=_pnqMz5nrRs
practice:
  - title: Maximum Depth of Binary Tree
    url: https://leetcode.com/problems/maximum-depth-of-binary-tree/
    difficulty: easy
  - title: Invert Binary Tree
    url: https://leetcode.com/problems/invert-binary-tree/
    difficulty: easy
  - title: Same Tree
    url: https://leetcode.com/problems/same-tree/
    difficulty: easy
reflectionPrompt: Kể tên một thứ trong đời sống có cấu trúc giống cây.
---

Nút trên cùng là **gốc**. Các nút không có con là **lá**. **Độ sâu** của một nút là số cạnh tính từ gốc xuống nó, còn **chiều cao** của cây là số tầng trên đường dài nhất từ gốc đến lá. Cây không có chu trình: mọi nút trừ gốc đều có đúng một cha.

Cây có tính đệ quy tự nhiên: mỗi nút con là gốc của một cây nhỏ hơn. Đó là lý do phần lớn mã xử lý cây là một hàm đệ quy ngắn với trường hợp cơ sở cho cây rỗng (`None`), như hàm tính chiều cao ở trên.
