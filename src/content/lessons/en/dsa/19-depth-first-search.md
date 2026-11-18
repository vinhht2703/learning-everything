---
id: depth-first-search
order: 19
section: TREES
title: Depth-first search
summary: Pre-, in-, and post-order
duration: 15 min
description: Depth-first search explores one branch all the way down before backing up. The visit order gives three classic traversals.
goal: Write pre-, in-, and post-order traversals and know what each is used for.
eyebrow: THE BIG IDEA
conceptTitle: Go deep first
formula: "pre: N L R · in: L N R · post: L R N"
takeaways:
  - label: Pre-order
    text: "Node, left, right: copy or serialize a tree."
  - label: In-order
    text: "Left, node, right: sorted output for a BST."
  - label: Post-order
    text: "Left, right, node: children before parents."
widget: tree-dfs
widgetTitle: Play a depth-first traversal
widgetDescription: Switch the order and replay. In-order on this BST prints 1 to 7.
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
  description: The three depth-first traversals side by side.
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
  - op: Any DFS traversal
    time: O(n)
    space: O(h) call stack
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
reflectionPrompt: Which traversal would you use to delete every node of a tree safely, and why?
---

All three traversals are the same recursive function; only the moment you "visit" the node changes. **Pre-order** visits the node first (useful for copying a tree). **In-order** visits it between its subtrees, which prints a BST in **sorted order**. **Post-order** visits it after both children (useful for deleting a tree or computing sizes bottom-up).

Each node is visited once, so every traversal is O(n) time. The recursion uses the call stack, so extra space is O(h). You can also write DFS iteratively with your own stack.
