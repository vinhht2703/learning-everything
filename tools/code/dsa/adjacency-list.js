// Directed edges, e.g. "you can fly from A to B".
const edges = [["A", "B"], ["B", "C"], ["B", "E"], ["C", "E"], ["E", "D"]];

const adj = {};
for (const [src, dst] of edges) {
  (adj[src] ??= []).push(dst);
  adj[dst] ??= [];
}

// DFS with backtracking: how many different routes reach the target?
function countPaths(node, target, visited) {
  if (visited.has(node)) return 0;
  if (node === target) return 1;
  visited.add(node);
  const total = adj[node].reduce((sum, n) => sum + countPaths(n, target, visited), 0);
  visited.delete(node);
  return total;
}

// BFS: fewest edges from node to target
function shortest(node, target) {
  let queue = [node];
  const visited = new Set([node]);
  for (let length = 0; queue.length; length++) {
    const next = [];
    for (const cur of queue) {
      if (cur === target) return length;
      for (const n of adj[cur]) if (!visited.has(n)) { visited.add(n); next.push(n); }
    }
    queue = next;
  }
  return -1;
}

console.log(adj);
console.log("paths A->E:", countPaths("A", "E", new Set()), "| shortest A->D:", shortest("A", "D"));
