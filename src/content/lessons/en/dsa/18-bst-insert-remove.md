---
id: bst-insert-remove
order: 18
section: TREES
title: BST insert and remove
summary: Three removal cases
duration: 22 min
description: Inserting into a BST always adds a new leaf. Removing has three cases, and the hardest one uses the in-order successor.
goal: Insert values and handle all three removal cases correctly.
eyebrow: THE BIG IDEA
conceptTitle: Keep the BST property after every change
formula: "remove: leaf → cut · 1 child → replace · 2 children → copy successor"
takeaways:
  - label: Insert = new leaf
    text: Walk down like a search, attach where you fall off.
  - label: In-order successor
    text: Smallest value in the right subtree.
  - label: O(h)
    text: Both operations follow one root-to-leaf path.
widget: bst-edit
widgetTitle: Insert and remove values
widgetDescription: The in-order line below the tree stays sorted no matter what you change.
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
  description: Insert and remove (with the in-order successor), then print in order.
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
  - op: Insert
    time: O(h)
    space: O(h)
  - op: Remove
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
reflectionPrompt: Why can the in-order successor never have a left child?
---

**Insert**: search for the value; when you fall off the tree, attach a new leaf there. **Remove** has three cases. A leaf is simply cut off. A node with one child is replaced by that child. A node with two children is the tricky one: copy in its **in-order successor** (the smallest value in its right subtree), then remove that successor from the right subtree, where it has at most one child.

All three cases keep the left-smaller/right-bigger rule intact, and each operation walks one path down the tree, so it costs O(h).
