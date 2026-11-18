---
id: matrix-bfs
order: 30
section: GRAPHS
title: Matrix BFS
summary: Shortest path in a grid
duration: 14 min
description: Breadth-first search spreads out from the start one layer at a time, so the first time it reaches a cell is along a shortest path.
goal: Find the shortest path length in an unweighted grid with a queue.
eyebrow: THE BIG IDEA
conceptTitle: Ripples on a pond
formula: layer d = every cell exactly d steps away → first arrival = shortest
takeaways:
  - label: Layers
    text: Process len(queue) cells per distance level.
  - label: Mark on enqueue
    text: Prevents adding the same cell twice.
  - label: Unweighted only
    text: Weighted graphs need Dijkstra instead.
widget: grid-bfs
widgetTitle: Watch BFS spread through a grid
widgetDescription: Numbers show each cell’s distance from S. Add walls and replay to see the shortest path change.
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
  description: Shortest path length in a grid using BFS layers.
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
  - op: Shortest path (unweighted grid)
    time: O(r·c)
    space: O(r·c)
videos:
  - title: Breadth First Search Algorithm | Shortest Path | Graph Theory
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=oDqjPvD54Ss
  - title: Shortest Path in a Binary Matrix - Leetcode 1091 - Python
    channel: NeetCodeIO
    url: https://www.youtube.com/watch?v=YnxUdAO7TAo
    note: solution walkthrough
practice:
  - title: Shortest Path in Binary Matrix
    url: https://leetcode.com/problems/shortest-path-in-binary-matrix/
    difficulty: medium
  - title: Rotting Oranges
    url: https://leetcode.com/problems/rotting-oranges/
    difficulty: medium
reflectionPrompt: Why can BFS stop as soon as it reaches the goal, while path-counting DFS cannot?
---

Put the start cell in a queue and mark it visited. Repeatedly process the whole current queue as one **layer**: every cell in it is the same distance from the start. Add their unvisited neighbours to the next layer and increase the distance. The moment the goal comes out of the queue, the current distance is the answer.

Because BFS explores in order of distance, it finds **shortest paths in unweighted graphs** (every move costs 1). Each cell enters the queue at most once, so the time is O(rows · cols). DFS would also reach the goal, but not necessarily by the shortest route. Remember parents if you need the path itself, not just its length.
