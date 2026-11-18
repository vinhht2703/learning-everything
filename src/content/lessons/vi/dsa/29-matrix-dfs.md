---
id: matrix-dfs
order: 29
section: ĐỒ THỊ
title: DFS trên ma trận
summary: Khám phá lưới bằng quay lui
duration: 22 phút
description: Tìm kiếm theo chiều sâu trên lưới đi theo một lối xa nhất có thể rồi quay lui. Nó có thể đếm mọi đường đi hoặc loang khắp một vùng.
goal: Viết DFS trên lưới với kiểm tra biên, tập đã thăm và quay lui.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Mỗi ô là một đỉnh có tối đa bốn đỉnh kề
formula: dfs(r, c) = 0 nếu ra ngoài / tường / đã thăm · 1 nếu tới đích · Σ dfs(các ô kề)
takeaways:
  - label: Kiểm tra biên trước
    text: Kiểm tra giới hạn hàng/cột trước khi đọc lưới.
  - label: Tập đã thăm
    text: Tránh đi vòng tròn.
  - label: Bỏ đánh dấu hay không?
    text: Bỏ đánh dấu để đếm đường; giữ đánh dấu để loang.
widget: grid-dfs
widgetTitle: Đếm mọi đường đi qua lưới
widgetDescription: Nhấp ô để đặt tường rồi chạy. Xanh dương là đường đang khám phá; xanh lá là đường vừa tìm được.
code:
  file: count_paths.py
  lang: python
  source: |-
    # Count the paths from the top-left to the bottom-right corner.
    # Moves: up, down, left, right. 1 = wall. A path may not revisit a cell.
    grid = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 0],
    ]

    def count_paths(grid, r, c, visited):
        rows, cols = len(grid), len(grid[0])
        if min(r, c) < 0 or r == rows or c == cols or grid[r][c] == 1 or (r, c) in visited:
            return 0                                 # off the grid, a wall, or already on this path
        if r == rows - 1 and c == cols - 1:
            return 1                                 # reached the goal
        visited.add((r, c))                          # choose
        total = (count_paths(grid, r + 1, c, visited) + count_paths(grid, r - 1, c, visited) +
                 count_paths(grid, r, c + 1, visited) + count_paths(grid, r, c - 1, visited))
        visited.remove((r, c))                       # un-choose (backtrack)
        return total

    print(count_paths(grid, 0, 0, set()))
  output: "2"
  description: Đếm đường đi đơn từ góc trên trái đến góc dưới phải bằng quay lui.
  variants:
    - lang: javascript
      file: count_paths.js
      source: |-
        // Count the paths from the top-left to the bottom-right corner.
        // Moves: up, down, left, right. 1 = wall. A path may not revisit a cell.
        const grid = [
          [0, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 1],
          [0, 1, 0, 0],
        ];

        function countPaths(grid, r, c, visited) {
          const rows = grid.length, cols = grid[0].length, key = `${r},${c}`;
          if (Math.min(r, c) < 0 || r === rows || c === cols || grid[r][c] === 1 || visited.has(key)) return 0;
          if (r === rows - 1 && c === cols - 1) return 1;          // reached the goal
          visited.add(key);                                         // choose
          const total = countPaths(grid, r + 1, c, visited) + countPaths(grid, r - 1, c, visited) +
                        countPaths(grid, r, c + 1, visited) + countPaths(grid, r, c - 1, visited);
          visited.delete(key);                                      // un-choose (backtrack)
          return total;
        }

        console.log(countPaths(grid, 0, 0, new Set()));
      output: "2"
    - lang: cpp
      file: count_paths.cpp
      source: |-
        #include <iostream>
        #include <vector>
        using namespace std;

        // Count the paths from the top-left to the bottom-right corner.
        // Moves: up, down, left, right. 1 = wall. A path may not revisit a cell.
        int countPaths(const vector<vector<int>>& grid, int r, int c, vector<vector<bool>>& visited) {
            int rows = grid.size(), cols = grid[0].size();
            if (r < 0 || c < 0 || r == rows || c == cols || grid[r][c] == 1 || visited[r][c]) return 0;
            if (r == rows - 1 && c == cols - 1) return 1;         // reached the goal
            visited[r][c] = true;                                  // choose
            int total = countPaths(grid, r + 1, c, visited) + countPaths(grid, r - 1, c, visited) +
                        countPaths(grid, r, c + 1, visited) + countPaths(grid, r, c - 1, visited);
            visited[r][c] = false;                                 // un-choose (backtrack)
            return total;
        }

        int main() {
            vector<vector<int>> grid = {
                {0, 0, 0, 0},
                {1, 1, 0, 0},
                {0, 0, 0, 1},
                {0, 1, 0, 0},
            };
            vector<vector<bool>> visited(4, vector<bool>(4, false));
            cout << countPaths(grid, 0, 0, visited) << endl;
        }
      output: "2"
complexity:
  - op: Đếm mọi đường đi
    time: O(4^(r·c))
    space: O(r·c)
  - op: Loang / đếm đảo
    time: O(r·c)
    space: O(r·c)
videos:
  - title: Depth First Search Algorithm | Graph Theory
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=7fujbpJ0LB4
  - title: NUMBER OF ISLANDS - Leetcode 200 - Python
    channel: NeetCode
    url: https://www.youtube.com/watch?v=pV2kpPD66nE
    note: giải bài chi tiết
practice:
  - title: Flood Fill
    url: https://leetcode.com/problems/flood-fill/
    difficulty: easy
  - title: Number of Islands
    url: https://leetcode.com/problems/number-of-islands/
    difficulty: medium
  - title: Max Area of Island
    url: https://leetcode.com/problems/max-area-of-island/
    difficulty: medium
reflectionPrompt: Thay đổi nào biến bài "đếm mọi đường" thành "đếm số đảo"?
---

Xem mỗi ô trống là một đỉnh nối với bốn ô kề. Hàm đệ quy kiểm tra **trường hợp cơ sở** trước: ra khỏi lưới, gặp tường, hoặc đã nằm trên đường hiện tại → 0; tới đích → 1. Ngược lại đánh dấu ô, đệ quy theo bốn hướng, cộng kết quả, rồi **bỏ đánh dấu** ô trước khi trả về để các đường khác dùng được. Đó chính là mẫu chọn/khám phá/bỏ chọn như mê cung cây.

Đếm mọi đường đi đơn tốn thời gian hàm mũ, khoảng O(4^(hàng·cột)) trong trường hợp xấu nhất, vì DFS thực sự liệt kê tất cả. Nếu chỉ cần *đến được* các ô (loang màu, đếm đảo), hãy giữ đánh dấu thay vì bỏ: khi đó mỗi ô được thăm một lần và việc tìm kiếm là O(hàng · cột).
