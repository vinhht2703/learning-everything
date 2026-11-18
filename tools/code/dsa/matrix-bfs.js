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
