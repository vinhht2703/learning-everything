---
id: binary-tree
order: 16
section: TREES
title: Binary trees
summary: Nodes with up to two children
duration: 11 min
description: "A binary tree is like a linked list where each node can point to two children: left and right."
goal: Name the parts of a tree and compute its height recursively.
eyebrow: THE BIG IDEA
conceptTitle: Every node has at most two children
formula: height(node) = 1 + max(height(left), height(right))
takeaways:
  - label: Root / leaf
    text: The top node / nodes with no children.
  - label: Depth / height
    text: Distance from the root / longest path to a leaf.
  - label: Recursive shape
    text: Each subtree is a smaller binary tree.
widget: tree-anatomy
widgetTitle: Explore a binary tree
widgetDescription: Highlight the root, the leaves, or the longest path. Click a node for its details, or grow the tree.
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
  description: Build a small tree, then compute its height and leaf count recursively.
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
  - op: Visit every node (height, count)
    time: O(n)
    space: O(h) call stack
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
reflectionPrompt: Name something in daily life that is shaped like a tree.
---

The top node is the **root**. Nodes with no children are **leaves**. A node's **depth** is how many edges it is below the root, and the tree's **height** is the number of levels on the longest root-to-leaf path. There are no cycles: every node except the root has exactly one parent.

Trees are naturally recursive: each child is the root of a smaller tree. That is why most tree code is a short recursive function with a base case for an empty tree (`None`), like the height function above.
