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
