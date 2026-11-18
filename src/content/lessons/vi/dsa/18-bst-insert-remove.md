---
id: bst-insert-remove
order: 18
section: CÂY
title: Chèn và xóa trong BST
summary: Ba trường hợp khi xóa
duration: 22 phút
description: Chèn vào BST luôn tạo một lá mới. Xóa có ba trường hợp, trường hợp khó nhất dùng phần tử kế tiếp theo trung thứ tự.
goal: Chèn giá trị và xử lý đúng cả ba trường hợp xóa.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Giữ tính chất BST sau mọi thay đổi
formula: "xóa: lá → cắt · 1 con → thay thế · 2 con → chép phần tử kế tiếp"
takeaways:
  - label: Chèn = lá mới
    text: Đi xuống như khi tìm kiếm, gắn vào chỗ đi ra khỏi cây.
  - label: Phần tử kế tiếp trung thứ tự
    text: Giá trị nhỏ nhất trong cây con phải.
  - label: O(h)
    text: Cả hai thao tác đi theo một đường từ gốc đến lá.
widget: bst-edit
widgetTitle: Chèn và xóa giá trị
widgetDescription: Dòng trung thứ tự bên dưới cây luôn có thứ tự dù bạn thay đổi gì.
code:
  file: bst_edit.py
  lang: python
  source: |-
    class TreeNode:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    def insert(root, val):
        if not root:
            return TreeNode(val)
        if val > root.val:
            root.right = insert(root.right, val)
        elif val < root.val:
            root.left = insert(root.left, val)
        return root

    def min_node(root):
        while root.left:
            root = root.left
        return root

    def remove(root, val):
        if not root:
            return None
        if val > root.val:
            root.right = remove(root.right, val)
        elif val < root.val:
            root.left = remove(root.left, val)
        elif not root.left:
            return root.right          # 0 or 1 child
        elif not root.right:
            return root.left
        else:                          # 2 children: copy the in-order successor
            successor = min_node(root.right)
            root.val = successor.val
            root.right = remove(root.right, successor.val)
        return root

    def inorder(root):
        return inorder(root.left) + [root.val] + inorder(root.right) if root else []

    root = None
    for v in [8, 3, 10, 1, 6, 14, 4]:
        root = insert(root, v)
    root = remove(root, 3)
    print(inorder(root), root.left.val)
  output: "[1, 4, 6, 8, 10, 14] 4"
  description: Chèn và xóa (dùng phần tử kế tiếp trung thứ tự), rồi in theo trung thứ tự.
  variants:
    - lang: javascript
      file: bst_edit.js
      source: |-
        class TreeNode {
          constructor(val) { this.val = val; this.left = null; this.right = null; }
        }

        function insert(root, val) {
          if (!root) return new TreeNode(val);
          if (val > root.val) root.right = insert(root.right, val);
          else if (val < root.val) root.left = insert(root.left, val);
          return root;
        }

        function minNode(root) {
          while (root.left) root = root.left;
          return root;
        }

        function remove(root, val) {
          if (!root) return null;
          if (val > root.val) root.right = remove(root.right, val);
          else if (val < root.val) root.left = remove(root.left, val);
          else if (!root.left) return root.right;      // 0 or 1 child
          else if (!root.right) return root.left;
          else {                                       // 2 children: copy successor
            const successor = minNode(root.right);
            root.val = successor.val;
            root.right = remove(root.right, successor.val);
          }
          return root;
        }

        const inorder = (r) => (r ? [...inorder(r.left), r.val, ...inorder(r.right)] : []);

        let root = null;
        for (const v of [8, 3, 10, 1, 6, 14, 4]) root = insert(root, v);
        root = remove(root, 3);
        console.log(inorder(root), root.left.val);
      output: "[ 1, 4, 6, 8, 10, 14 ] 4"
    - lang: cpp
      file: bst_edit.cpp
      source: |-
        #include <iostream>
        using namespace std;

        struct TreeNode {
            int val;
            TreeNode* left = nullptr;
            TreeNode* right = nullptr;
            TreeNode(int v) : val(v) {}
        };

        TreeNode* insert(TreeNode* root, int val) {
            if (!root) return new TreeNode(val);
            if (val > root->val) root->right = insert(root->right, val);
            else if (val < root->val) root->left = insert(root->left, val);
            return root;
        }

        TreeNode* minNode(TreeNode* root) {
            while (root->left) root = root->left;
            return root;
        }

        TreeNode* remove(TreeNode* root, int val) {
            if (!root) return nullptr;
            if (val > root->val) root->right = remove(root->right, val);
            else if (val < root->val) root->left = remove(root->left, val);
            else if (!root->left) { TreeNode* r = root->right; delete root; return r; }   // 0 or 1 child
            else if (!root->right) { TreeNode* l = root->left; delete root; return l; }
            else {                                                // 2 children: copy successor
                TreeNode* successor = minNode(root->right);
                root->val = successor->val;
                root->right = remove(root->right, successor->val);
            }
            return root;
        }

        void inorder(TreeNode* root) {
            if (!root) return;
            inorder(root->left);
            cout << root->val << " ";
            inorder(root->right);
        }

        int main() {
            TreeNode* root = nullptr;
            for (int v : {8, 3, 10, 1, 6, 14, 4}) root = insert(root, v);
            root = remove(root, 3);
            inorder(root);
            cout << "| left child of root: " << root->left->val << endl;
        }
      output: "1 4 6 8 10 14 | left child of root: 4"
complexity:
  - op: Chèn
    time: O(h)
    space: O(h)
  - op: Xóa
    time: O(h)
    space: O(h)
videos:
  - title: Delete a node from Binary Search Tree
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=gcULXE7ViZw
  - title: Binary search tree - Implementation in C/C++
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=COZK7NATh4k
practice:
  - title: Insert into a Binary Search Tree
    url: https://leetcode.com/problems/insert-into-a-binary-search-tree/
    difficulty: medium
  - title: Delete Node in a BST
    url: https://leetcode.com/problems/delete-node-in-a-bst/
    difficulty: medium
reflectionPrompt: Vì sao phần tử kế tiếp theo trung thứ tự không bao giờ có con trái?
---

**Chèn**: tìm giá trị; khi đi ra khỏi cây, gắn một lá mới vào đó. **Xóa** có ba trường hợp. Lá thì chỉ cần cắt bỏ. Nút có một con thì được thay bằng nút con đó. Nút có hai con là trường hợp khó: chép **phần tử kế tiếp theo trung thứ tự** (giá trị nhỏ nhất ở cây con phải) vào, rồi xóa phần tử kế tiếp đó khỏi cây con phải, nơi nó có tối đa một con.

Cả ba trường hợp đều giữ nguyên quy tắc trái-nhỏ/phải-lớn, và mỗi thao tác chỉ đi theo một đường xuống cây, nên tốn O(h).
