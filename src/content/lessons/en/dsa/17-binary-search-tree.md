---
id: binary-search-tree
order: 17
section: TREES
title: Binary search trees
summary: Left smaller, right bigger
duration: 15 min
description: A binary search tree (BST) keeps values ordered so that every search can skip half of the remaining tree.
goal: State the BST property and search a BST in O(h).
eyebrow: THE BIG IDEA
conceptTitle: Binary search, shaped as a tree
formula: left subtree < node < right subtree
takeaways:
  - label: BST property
    text: Smaller values left, bigger values right, at every node.
  - label: O(h) search
    text: O(log n) when balanced, O(n) when it degenerates.
  - label: Balanced trees
    text: AVL and red-black trees keep h ≈ log n automatically.
widget: bst-search
widgetTitle: Search a BST
widgetDescription: Enter a value and watch the search go left or right. Faded nodes are never visited.
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
  description: Recursive BST search.
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
  - op: Search (balanced)
    time: O(log n)
    space: O(log n)
  - op: Search (degenerate)
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
reflectionPrompt: What would a BST look like if you inserted 1, 2, 3, 4, 5 in that order?
---

In a BST, every value in a node's left subtree is smaller than the node, and every value in its right subtree is bigger. To search, compare with the root: smaller means go left, bigger means go right. Each step discards a whole subtree.

The cost is the height h of the tree. A **balanced** BST has h ≈ log n, so search is O(log n), just like binary search on an array, but a BST can also insert and delete without shifting elements. If values are inserted in sorted order, the tree degenerates into a linked list and h = n. Self-balancing trees (AVL, red-black) prevent that.
