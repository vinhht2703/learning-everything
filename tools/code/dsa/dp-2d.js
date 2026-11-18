// Unique paths: move only right or down from the top-left to the bottom-right. 1 = obstacle.
const grid = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
];

function uniquePaths(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dp = grid.map((row) => row.map(() => 0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) dp[r][c] = 0;              // nobody can stand on an obstacle
      else if (r === 0 && c === 0) dp[r][c] = 1;
      else dp[r][c] = (r > 0 ? dp[r - 1][c] : 0) + (c > 0 ? dp[r][c - 1] : 0);  // above + left
    }
  }
  return dp;
}

const table = uniquePaths(grid);
for (const row of table) console.log(row);
console.log("paths:", table.at(-1).at(-1));
