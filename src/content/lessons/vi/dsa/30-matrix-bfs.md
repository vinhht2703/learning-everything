---
id: matrix-bfs
order: 30
section: ĐỒ THỊ
title: BFS trên ma trận
summary: Đường ngắn nhất trên lưới
duration: 14 phút
description: Tìm kiếm theo chiều rộng lan ra từ điểm xuất phát theo từng lớp, nên lần đầu nó tới một ô là đi theo đường ngắn nhất.
goal: Tìm độ dài đường ngắn nhất trên lưới không trọng số bằng hàng đợi.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Gợn sóng trên mặt hồ
formula: lớp d = mọi ô cách đúng d bước → lần đến đầu tiên = ngắn nhất
takeaways:
  - label: Lớp
    text: Xử lý len(queue) ô cho mỗi mức khoảng cách.
  - label: Đánh dấu khi đưa vào hàng đợi
    text: Tránh thêm cùng một ô hai lần.
  - label: Chỉ khi không trọng số
    text: Đồ thị có trọng số cần thuật toán Dijkstra.
widget: grid-bfs
widgetTitle: Xem BFS lan khắp lưới
widgetDescription: Các số là khoảng cách của từng ô tới S. Thêm tường rồi chạy lại để thấy đường ngắn nhất thay đổi.
code:
  file: shortest_path.py
  lang: python
  source: |-
    from collections import deque

    # Length of the shortest path from the top-left to the bottom-right corner (1 = wall).
    grid = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 0],
    ]

    def shortest_path(grid):
        rows, cols = len(grid), len(grid[0])
        queue = deque([(0, 0)])
        visited = {(0, 0)}
        length = 0
        while queue:
            for _ in range(len(queue)):            # every cell in the queue is `length` steps away
                r, c = queue.popleft()
                if (r, c) == (rows - 1, cols - 1):
                    return length
                for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0 and (nr, nc) not in visited:
                        visited.add((nr, nc))
                        queue.append((nr, nc))
            length += 1
        return -1                                   # the goal is unreachable

    print(shortest_path(grid))
  output: "6"
  description: Độ dài đường ngắn nhất trên lưới bằng các lớp BFS.
  variants:
    - lang: javascript
      file: shortest_path.js
      source: |-
        // Length of the shortest path from the top-left to the bottom-right corner (1 = wall).
        const grid = [
          [0, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 1],
          [0, 1, 0, 0],
        ];

        function shortestPath(grid) {
          const rows = grid.length, cols = grid[0].length;
          let queue = [[0, 0]];
          const visited = new Set(["0,0"]);
          for (let length = 0; queue.length; length++) {
            const next = [];
            for (const [r, c] of queue) {              // every cell here is `length` steps away
              if (r === rows - 1 && c === cols - 1) return length;
              for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && !visited.has(`${nr},${nc}`)) {
                  visited.add(`${nr},${nc}`);
                  next.push([nr, nc]);
                }
              }
            }
            queue = next;
          }
          return -1;                                    // the goal is unreachable
        }

        console.log(shortestPath(grid));
      output: "6"
    - lang: cpp
      file: shortest_path.cpp
      source: |-
        #include <iostream>
        #include <queue>
        #include <utility>
        #include <vector>
        using namespace std;

        // Length of the shortest path from the top-left to the bottom-right corner (1 = wall).
        int shortestPath(const vector<vector<int>>& grid) {
            int rows = grid.size(), cols = grid[0].size();
            vector<vector<bool>> visited(rows, vector<bool>(cols, false));
            queue<pair<int, int>> q;
            q.push({0, 0});
            visited[0][0] = true;
            int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
            for (int length = 0; !q.empty(); length++) {
                for (int k = q.size(); k > 0; k--) {           // every cell here is `length` steps away
                    auto [r, c] = q.front();
                    q.pop();
                    if (r == rows - 1 && c == cols - 1) return length;
                    for (auto& d : dirs) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 0 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            q.push({nr, nc});
                        }
                    }
                }
            }
            return -1;                                          // the goal is unreachable
        }

        int main() {
            vector<vector<int>> grid = {
                {0, 0, 0, 0},
                {1, 1, 0, 0},
                {0, 0, 0, 1},
                {0, 1, 0, 0},
            };
            cout << shortestPath(grid) << endl;
        }
      output: "6"
complexity:
  - op: Đường ngắn nhất (lưới không trọng số)
    time: O(r·c)
    space: O(r·c)
videos:
  - title: Breadth First Search Algorithm | Shortest Path | Graph Theory
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=oDqjPvD54Ss
  - title: Shortest Path in a Binary Matrix - Leetcode 1091 - Python
    channel: NeetCodeIO
    url: https://www.youtube.com/watch?v=YnxUdAO7TAo
    note: giải bài chi tiết
practice:
  - title: Shortest Path in Binary Matrix
    url: https://leetcode.com/problems/shortest-path-in-binary-matrix/
    difficulty: medium
  - title: Rotting Oranges
    url: https://leetcode.com/problems/rotting-oranges/
    difficulty: medium
reflectionPrompt: Vì sao BFS dừng ngay khi tới đích được, còn DFS đếm đường thì không?
---

Đưa ô xuất phát vào hàng đợi và đánh dấu đã thăm. Liên tục xử lý toàn bộ hàng đợi hiện tại như một **lớp**: mọi ô trong đó cách điểm xuất phát cùng một khoảng. Thêm các ô kề chưa thăm vào lớp tiếp theo và tăng khoảng cách. Ngay khi đích ra khỏi hàng đợi, khoảng cách hiện tại là đáp án.

Vì BFS khám phá theo thứ tự khoảng cách, nó tìm được **đường ngắn nhất trên đồ thị không trọng số** (mỗi bước đi tốn 1). Mỗi ô vào hàng đợi tối đa một lần, nên thời gian là O(hàng · cột). DFS cũng tới được đích, nhưng không nhất thiết theo đường ngắn nhất. Hãy lưu nút cha nếu bạn cần chính con đường, không chỉ độ dài.
