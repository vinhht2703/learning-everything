---
id: tree-maze
order: 22
section: QUAY LUI
title: "Quay lui: mê cung cây"
summary: Chọn, khám phá, bỏ chọn
duration: 14 phút
description: Quay lui xây dựng lời giải từng bước và hoàn tác lựa chọn cuối cùng mỗi khi một đường đi dẫn tới ngõ cụt.
goal: Tìm một đường đi hợp lệ từ gốc đến lá bằng mẫu chọn / khám phá / bỏ chọn.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Thử, và hoàn tác khi bế tắc
formula: chọn → khám phá → bỏ chọn
takeaways:
  - label: Chọn
    text: Thêm lựa chọn hiện tại vào lời giải đang xây.
  - label: Khám phá
    text: Đệ quy vào các quyết định tiếp theo.
  - label: Bỏ chọn
    text: Hoàn tác lựa chọn khi nó không dẫn tới đâu.
widget: tree-maze
widgetTitle: Thoát khỏi mê cung cây
widgetDescription: Xanh dương là đường hiện tại, nút đỏ nét đứt đã bị quay lui, xanh lá là đáp án.
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
  description: Tìm một đường từ gốc đến lá tránh các số 0, với bước quay lui rõ ràng.
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
  - op: Tìm một đường đi
    time: O(n)
    space: O(h)
  - op: Thu thập mọi đường đi
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
    note: bài học dài, chuyên sâu
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
reflectionPrompt: Điều gì thay đổi nếu bạn cần mọi đường đi hợp lệ thay vì chỉ một?
---

Hãy xem cây như một mê cung: các nút có giá trị 0 là tường, và bạn muốn một đường bất kỳ từ gốc đến lá tránh được chúng. Đi xuống bằng DFS. **Chọn** một nút bằng cách thêm nó vào đường đi, **khám phá** các con của nó, và nếu không con nào dẫn tới lá, **bỏ chọn** nó bằng cách lấy nó ra khỏi đường đi trước khi quay về.

Thao tác lấy ra đó chính là phần "quay lui": đường đi luôn chứa đúng lộ trình hiện tại. Cùng mẫu ba bước này giải được bài tập con, hoán vị, Sudoku và N-Queens. Trường hợp xấu nhất, quay lui phải khám phá mọi nhánh nên có thể tốn thời gian hàm mũ; kiểm tra tường sớm (cắt tỉa) giúp bỏ qua cả cây con.
