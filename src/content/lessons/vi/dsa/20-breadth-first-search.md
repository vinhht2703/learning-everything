---
id: breadth-first-search
order: 20
section: CÂY
title: Tìm kiếm theo chiều rộng (BFS)
summary: Theo từng tầng bằng hàng đợi
duration: 11 phút
description: Tìm kiếm theo chiều rộng thăm cây theo từng tầng, dùng hàng đợi để nhớ các nút tiếp theo.
goal: Cài đặt duyệt theo tầng bằng hàng đợi và nhóm các nút theo tầng.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đi rộng trước
formula: lấy nút ra → ghi nhận → đưa các con vào hàng đợi
takeaways:
  - label: Hàng đợi
    text: Thứ tự FIFO đảm bảo thăm theo từng tầng.
  - label: Kích thước tầng
    text: Ghi lại len(queue) để biết tầng kết thúc ở đâu.
  - label: Gần nhất trước
    text: BFS tìm ra đáp án nông nhất trước tiên.
widget: tree-bfs
widgetTitle: Xem hàng đợi điều khiển BFS
widgetDescription: Nút cam đang chờ trong hàng đợi; nút xanh đã xong. Để ý các tầng được tạo dần.
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
  description: Duyệt theo tầng, trả về một danh sách cho mỗi tầng.
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
  - op: Duyệt theo tầng
    time: O(n)
    space: O(n) hàng đợi
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
reflectionPrompt: Vì sao DFS là lựa chọn kém để tìm lá nông nhất trong một cây rất sâu?
---

Bắt đầu với gốc trong hàng đợi. Liên tục lấy nút ở đầu, ghi nhận nó, rồi thêm các con của nó vào cuối. Vì hàng đợi vào trước ra trước, mọi nút ở tầng 1 được xử lý trước bất kỳ nút nào ở tầng 2. Để nhóm theo tầng, hãy xử lý đúng số nút mà hàng đợi đang có khi bắt đầu tầng đó.

BFS là lựa chọn tự nhiên cho các câu hỏi "gần nhất" hoặc "nông nhất", như độ sâu nhỏ nhất của cây hay góc nhìn từ bên phải. Nó thăm mỗi nút một lần, O(n), và hàng đợi có thể chứa cả một tầng cùng lúc, tới khoảng n/2 nút.
