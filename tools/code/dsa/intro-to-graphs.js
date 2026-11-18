// The same undirected graph, three ways.  Edges: A-B, A-C, B-C, C-D
const nodes = ["A", "B", "C", "D"];
const edges = [["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"]];

// 1. Adjacency matrix: matrix[i][j] = 1 if there is an edge
const index = Object.fromEntries(nodes.map((n, i) => [n, i]));
const matrix = nodes.map(() => nodes.map(() => 0));
for (const [a, b] of edges) matrix[index[a]][index[b]] = matrix[index[b]][index[a]] = 1;

// 2. Adjacency list: node -> neighbours
const adj = Object.fromEntries(nodes.map((n) => [n, []]));
for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }

for (const row of matrix) console.log(row);
console.log(adj);
console.log("degree of C:", adj.C.length, "| B-D connected?", matrix[index.B][index.D] === 1);
