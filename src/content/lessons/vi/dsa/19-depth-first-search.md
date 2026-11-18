---
id: depth-first-search
order: 19
section: CÂY
title: Tìm kiếm theo chiều sâu (DFS)
summary: Tiền, trung và hậu thứ tự
duration: 15 phút
description: Tìm kiếm theo chiều sâu đi hết một nhánh xuống dưới rồi mới quay lại. Thứ tự thăm tạo ra ba cách duyệt kinh điển.
goal: Viết được duyệt tiền, trung, hậu thứ tự và biết mỗi cách dùng để làm gì.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đi sâu trước
formula: "tiền: N T P · trung: T N P · hậu: T P N"
takeaways:
  - label: Tiền thứ tự
    text: "Nút, trái, phải: sao chép hoặc tuần tự hóa cây."
  - label: Trung thứ tự
    text: "Trái, nút, phải: kết quả có thứ tự với BST."
  - label: Hậu thứ tự
    text: "Trái, phải, nút: xử lý con trước cha."
widget: tree-dfs
widgetTitle: Chạy duyệt theo chiều sâu
widgetDescription: Đổi thứ tự rồi chạy lại. Trung thứ tự trên BST này in ra 1 đến 7.
code:
  file: dfs.py
  lang: python
  source: |-
    class TreeNode:
        def __init__(self, val, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    def preorder(node, out):
        if node:
            out.append(node.val)        # visit, then left, then right
            preorder(node.left, out)
            preorder(node.right, out)
        return out

    def inorder(node, out):
        if node:
            inorder(node.left, out)     # left, visit, right -> sorted for a BST
            out.append(node.val)
            inorder(node.right, out)
        return out

    def postorder(node, out):
        if node:
            postorder(node.left, out)   # left, right, then visit
            postorder(node.right, out)
            out.append(node.val)
        return out

    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(6, TreeNode(5), TreeNode(7)))
    print("pre: ", preorder(root, []))
    print("in:  ", inorder(root, []))
    print("post:", postorder(root, []))
  output: |-
    pre:  [4, 2, 1, 3, 6, 5, 7]
    in:   [1, 2, 3, 4, 5, 6, 7]
    post: [1, 3, 2, 5, 7, 6, 4]
  description: Ba cách duyệt theo chiều sâu đặt cạnh nhau.
  variants:
    - lang: javascript
      file: dfs.js
      source: |-
        class TreeNode {
          constructor(val, left = null, right = null) {
            this.val = val; this.left = left; this.right = right;
          }
        }

        function preorder(node, out = []) {   // visit, left, right
          if (node) { out.push(node.val); preorder(node.left, out); preorder(node.right, out); }
          return out;
        }

        function inorder(node, out = []) {    // left, visit, right -> sorted for a BST
          if (node) { inorder(node.left, out); out.push(node.val); inorder(node.right, out); }
          return out;
        }

        function postorder(node, out = []) {  // left, right, visit
          if (node) { postorder(node.left, out); postorder(node.right, out); out.push(node.val); }
          return out;
        }

        const root = new TreeNode(4,
          new TreeNode(2, new TreeNode(1), new TreeNode(3)),
          new TreeNode(6, new TreeNode(5), new TreeNode(7)));
        console.log("pre: ", preorder(root).join(" "));
        console.log("in:  ", inorder(root).join(" "));
        console.log("post:", postorder(root).join(" "));
      output: |-
        pre:  4 2 1 3 6 5 7
        in:   1 2 3 4 5 6 7
        post: 1 3 2 5 7 6 4
    - lang: cpp
      file: dfs.cpp
      source: |-
        #include <iostream>
        using namespace std;

        struct TreeNode {
            int val;
            TreeNode* left;
            TreeNode* right;
            TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
        };

        void preorder(TreeNode* n) {    // visit, left, right
            if (!n) return;
            cout << n->val << " "; preorder(n->left); preorder(n->right);
        }

        void inorder(TreeNode* n) {     // left, visit, right -> sorted for a BST
            if (!n) return;
            inorder(n->left); cout << n->val << " "; inorder(n->right);
        }

        void postorder(TreeNode* n) {   // left, right, visit
            if (!n) return;
            postorder(n->left); postorder(n->right); cout << n->val << " ";
        }

        int main() {
            TreeNode* root = new TreeNode(4,
                new TreeNode(2, new TreeNode(1), new TreeNode(3)),
                new TreeNode(6, new TreeNode(5), new TreeNode(7)));
            cout << "pre:  "; preorder(root); cout << endl;
            cout << "in:   "; inorder(root); cout << endl;
            cout << "post: "; postorder(root); cout << endl;
        }
      output: |-
        pre:  4 2 1 3 6 5 7 
        in:   1 2 3 4 5 6 7 
        post: 1 3 2 5 7 6 4
complexity:
  - op: Mọi cách duyệt DFS
    time: O(n)
    space: O(h) ngăn xếp lời gọi
videos:
  - title: Depth-first search in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=Urx87-NMm6c
  - title: "Binary tree traversal: Preorder, Inorder, Postorder"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=gm8DUJJhmY4
practice:
  - title: Binary Tree Inorder Traversal
    url: https://leetcode.com/problems/binary-tree-inorder-traversal/
    difficulty: easy
  - title: Binary Tree Preorder Traversal
    url: https://leetcode.com/problems/binary-tree-preorder-traversal/
    difficulty: easy
  - title: Kth Smallest Element in a BST
    url: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
    difficulty: medium
reflectionPrompt: Bạn sẽ dùng cách duyệt nào để xóa an toàn mọi nút của cây, và vì sao?
---

Cả ba cách duyệt là cùng một hàm đệ quy; chỉ khác thời điểm "thăm" nút. **Tiền thứ tự** thăm nút trước (hữu ích để sao chép cây). **Trung thứ tự** thăm nút giữa hai cây con, in BST ra theo **thứ tự tăng dần**. **Hậu thứ tự** thăm nút sau cả hai con (hữu ích để xóa cây hoặc tính kích thước từ dưới lên).

Mỗi nút được thăm một lần, nên mọi cách duyệt đều tốn O(n) thời gian. Đệ quy dùng ngăn xếp lời gọi nên bộ nhớ phụ là O(h). Bạn cũng có thể viết DFS dạng lặp với ngăn xếp của riêng mình.
