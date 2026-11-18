---
id: matrix-dfs
order: 29
section: GRAPHS
title: Matrix DFS
summary: Explore a grid with backtracking
duration: 22 min
description: Depth-first search on a grid explores one route as far as it can, then backtracks. It can count every path or flood a region.
goal: Write grid DFS with bounds checks, a visited set and backtracking.
eyebrow: THE BIG IDEA
conceptTitle: Each cell is a node with up to four neighbours
formula: dfs(r, c) = 0 if out / wall / visited · 1 if goal · Σ dfs(neighbours)
takeaways:
  - label: Bounds first
    text: Check row/column limits before reading the grid.
  - label: Visited set
    text: Prevents walking in circles.
  - label: Unmark or not?
    text: Unmark to count paths; keep marks to flood fill.
widget: grid-dfs
widgetTitle: Count every path through a grid
widgetDescription: Click cells to place walls, then play. Blue is the path being explored; green is the last path found.
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
  description: Count simple paths from the top-left to the bottom-right with backtracking.
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
  - op: Count all paths
    time: O(4^(r·c))
    space: O(r·c)
  - op: Flood fill / islands
    time: O(r·c)
    space: O(r·c)
videos:
  - title: Depth First Search Algorithm | Graph Theory
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=7fujbpJ0LB4
  - title: NUMBER OF ISLANDS - Leetcode 200 - Python
    channel: NeetCode
    url: https://www.youtube.com/watch?v=pV2kpPD66nE
    note: solution walkthrough
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
reflectionPrompt: Which change turns "count all paths" into "count islands"?
---

Treat each open cell as a vertex connected to its four neighbours. The recursive function checks the **base cases** first: off the grid, a wall, or already on the current path → 0; at the goal → 1. Otherwise mark the cell, recurse in all four directions, add up the results, and **unmark** the cell before returning so other paths may use it. That is the same choose/explore/un-choose pattern as the tree maze.

Counting every simple path is exponential, roughly O(4^(rows·cols)) in the worst case, because DFS really enumerates them all. If you only need to *reach* cells (flood fill, number of islands), keep cells marked instead of unmarking: then each cell is visited once and the search is O(rows · cols).
