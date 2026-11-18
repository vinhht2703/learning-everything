---
id: breadth-first-search
order: 20
section: TREES
title: Breadth-first search
summary: Level by level with a queue
duration: 11 min
description: Breadth-first search visits the tree level by level, using a queue to remember which nodes come next.
goal: Implement level-order traversal with a queue and group nodes by level.
eyebrow: THE BIG IDEA
conceptTitle: Go wide first
formula: dequeue a node → record it → enqueue its children
takeaways:
  - label: Queue
    text: FIFO order guarantees level-by-level visits.
  - label: Level size
    text: Snapshot len(queue) to know where a level ends.
  - label: Shortest first
    text: BFS finds the shallowest answer first.
widget: tree-bfs
widgetTitle: Watch the queue drive BFS
widgetDescription: Orange nodes are waiting in the queue; blue nodes are done. Note the levels being built.
code:
  file: bfs.py
  lang: python
  source: |-
    from collections import deque

    class TreeNode:
        def __init__(self, val, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    def level_order(root):
        levels, queue = [], deque([root] if root else [])
        while queue:
            level = []
            for _ in range(len(queue)):     # everything currently queued is one level
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            levels.append(level)
        return levels

    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(6, TreeNode(5), TreeNode(7)))
    print(level_order(root))
  output: "[[4], [2, 6], [1, 3, 5, 7]]"
  description: Level-order traversal returning one list per level.
  variants:
    - lang: javascript
      file: bfs.js
      source: |-
        class TreeNode {
          constructor(val, left = null, right = null) {
            this.val = val; this.left = left; this.right = right;
          }
        }

        function levelOrder(root) {
          const levels = [];
          let queue = root ? [root] : [];
          while (queue.length) {
            levels.push(queue.map((n) => n.val));         // everything queued is one level
            const next = [];
            for (const n of queue) {
              if (n.left) next.push(n.left);
              if (n.right) next.push(n.right);
            }
            queue = next;
          }
          return levels;
        }

        const root = new TreeNode(4,
          new TreeNode(2, new TreeNode(1), new TreeNode(3)),
          new TreeNode(6, new TreeNode(5), new TreeNode(7)));
        console.log(JSON.stringify(levelOrder(root)));
      output: "[[4],[2,6],[1,3,5,7]]"
    - lang: cpp
      file: bfs.cpp
      source: |-
        #include <iostream>
        #include <queue>
        using namespace std;

        struct TreeNode {
            int val;
            TreeNode* left;
            TreeNode* right;
            TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
        };

        void levelOrder(TreeNode* root) {
            queue<TreeNode*> q;
            if (root) q.push(root);
            int level = 0;
            while (!q.empty()) {
                cout << "level " << level++ << ": ";
                for (int i = q.size(); i > 0; i--) {   // everything queued is one level
                    TreeNode* node = q.front(); q.pop();
                    cout << node->val << " ";
                    if (node->left) q.push(node->left);
                    if (node->right) q.push(node->right);
                }
                cout << endl;
            }
        }

        int main() {
            TreeNode* root = new TreeNode(4,
                new TreeNode(2, new TreeNode(1), new TreeNode(3)),
                new TreeNode(6, new TreeNode(5), new TreeNode(7)));
            levelOrder(root);
        }
      output: |-
        level 0: 4 
        level 1: 2 6 
        level 2: 1 3 5 7
complexity:
  - op: Level-order traversal
    time: O(n)
    space: O(n) queue
videos:
  - title: Breadth-first search in 4 minutes
    channel: Michael Sambol
    url: https://www.youtube.com/watch?v=HZ5YTanv5QE
  - title: "Binary tree: Level Order Traversal"
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=86g8jAQug04
  - title: Binary tree traversal - breadth-first and depth-first strategies
    channel: mycodeschool
    url: https://www.youtube.com/watch?v=9RHO6jU--GU
practice:
  - title: Binary Tree Level Order Traversal
    url: https://leetcode.com/problems/binary-tree-level-order-traversal/
    difficulty: medium
  - title: Binary Tree Right Side View
    url: https://leetcode.com/problems/binary-tree-right-side-view/
    difficulty: medium
reflectionPrompt: Why would DFS be a poor choice for finding the shallowest leaf in a very deep tree?
---

Start with the root in a queue. Repeatedly take the front node, record it, and add its children to the back. Because a queue is first-in-first-out, every node on level 1 is processed before any node on level 2. To group by level, process exactly as many nodes as the queue held when the level started.

BFS is the natural choice for "closest" or "shallowest" questions, such as the minimum depth of a tree or the right-side view. It visits every node once, O(n), and the queue can hold a whole level at once, up to about n/2 nodes.
