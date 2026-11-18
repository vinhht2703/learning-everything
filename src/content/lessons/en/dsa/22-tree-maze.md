---
id: tree-maze
order: 22
section: BACKTRACKING
title: "Backtracking: tree maze"
summary: Choose, explore, un-choose
duration: 14 min
description: Backtracking builds a solution step by step and undoes the last choice whenever a path leads to a dead end.
goal: Find a valid root-to-leaf path with the choose / explore / un-choose pattern.
eyebrow: THE BIG IDEA
conceptTitle: Try, and undo when stuck
formula: choose → explore → un-choose
takeaways:
  - label: Choose
    text: Add the current option to the partial solution.
  - label: Explore
    text: Recurse into the next decisions.
  - label: Un-choose
    text: Undo the choice when it leads nowhere.
widget: tree-maze
widgetTitle: Escape the tree maze
widgetDescription: Blue is the current path, red dashed nodes were backtracked, green is the answer.
code:
  file: tree_maze.py
  lang: python
  source: |-
    class TreeNode:
        def __init__(self, val, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    def find_path(node, path):
        # a 0 is a wall: this branch cannot be part of the path
        if not node or node.val == 0:
            return False
        path.append(node.val)                     # choose
        if not node.left and not node.right:
            return True                           # reached a leaf: success
        if find_path(node.left, path) or find_path(node.right, path):
            return True                           # explore
        path.pop()                                # un-choose (backtrack)
        return False

    #         4
    #       /   \
    #      0     1
    #       \   / \
    #        7 2   0
    #           \
    #            3
    root = TreeNode(4, TreeNode(0, None, TreeNode(7)),
                    TreeNode(1, TreeNode(2, None, TreeNode(3)), TreeNode(0)))
    path = []
    print(find_path(root, path), path)
  output: True [4, 1, 2, 3]
  description: Find any root-to-leaf path that avoids 0s, with explicit backtracking.
  variants:
    - lang: javascript
      file: tree_maze.js
      source: |-
        class TreeNode {
          constructor(val, left = null, right = null) {
            this.val = val; this.left = left; this.right = right;
          }
        }

        function findPath(node, path) {
          if (!node || node.val === 0) return false;   // a 0 is a wall
          path.push(node.val);                         // choose
          if (!node.left && !node.right) return true;  // reached a leaf
          if (findPath(node.left, path) || findPath(node.right, path)) return true; // explore
          path.pop();                                  // un-choose (backtrack)
          return false;
        }

        //         4
        //       /   \
        //      0     1
        //       \   / \
        //        7 2   0
        //           \
        //            3
        const root = new TreeNode(4,
          new TreeNode(0, null, new TreeNode(7)),
          new TreeNode(1, new TreeNode(2, null, new TreeNode(3)), new TreeNode(0)));
        const path = [];
        console.log(findPath(root, path), path);
      output: true [ 4, 1, 2, 3 ]
    - lang: cpp
      file: tree_maze.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        struct TreeNode {
            int val;
            TreeNode* left;
            TreeNode* right;
            TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
        };

        bool findPath(TreeNode* node, vector<int>& path) {
            if (!node || node->val == 0) return false;     // a 0 is a wall
            path.push_back(node->val);                     // choose
            if (!node->left && !node->right) return true;  // reached a leaf
            if (findPath(node->left, path) || findPath(node->right, path)) return true;  // explore
            path.pop_back();                               // un-choose (backtrack)
            return false;
        }

        int main() {
            TreeNode* root = new TreeNode(4,
                new TreeNode(0, nullptr, new TreeNode(7)),
                new TreeNode(1, new TreeNode(2, nullptr, new TreeNode(3)), new TreeNode(0)));
            vector<int> path;
            bool found = findPath(root, path);
            cout << boolalpha << found << " ";
            for (int v : path) cout << v << " ";
            cout << endl;
        }
      output: true 4 1 2 3
complexity:
  - op: Find one path
    time: O(n)
    space: O(h)
  - op: Collect all paths
    time: O(n · h)
    space: O(h)
videos:
  - title: Backtracking Introduction + Maze Problems - Theory + Code + Tips
    channel: Kunal Kushwaha
    url: https://www.youtube.com/watch?v=zg5v2rlV1tM
  - title: Introduction to Backtracking
    channel: Learn Then Code
    url: https://www.youtube.com/watch?v=79y0iBKb2S4
  - title: Solve Coding Interview Backtracking Problems - Crash Course
    channel: freeCodeCamp.org
    url: https://www.youtube.com/watch?v=A80YzvNwqXA
    note: longer deep dive
practice:
  - title: Path Sum
    url: https://leetcode.com/problems/path-sum/
    difficulty: easy
  - title: Binary Tree Paths
    url: https://leetcode.com/problems/binary-tree-paths/
    difficulty: easy
  - title: Path Sum II
    url: https://leetcode.com/problems/path-sum-ii/
    difficulty: medium
reflectionPrompt: What would change if you needed every valid path instead of just one?
---

Treat the tree as a maze: nodes with value 0 are walls, and you want any path from the root to a leaf that avoids them. Walk down with DFS. **Choose** a node by appending it to the path, **explore** its children, and if neither child leads to a leaf, **un-choose** it by popping it off the path before returning.

That pop is the "back" in backtracking: the path always holds exactly the current route. The same three-step pattern solves subsets, permutations, Sudoku, and N-Queens. In the worst case backtracking explores every branch, so it can be exponential; checking walls early (pruning) skips whole subtrees.
