# The same undirected graph, three ways.  Edges: A-B, A-C, B-C, C-D
nodes = ["A", "B", "C", "D"]
edges = [("A", "B"), ("A", "C"), ("B", "C"), ("C", "D")]

# 1. Adjacency matrix: matrix[i][j] = 1 if there is an edge
index = {n: i for i, n in enumerate(nodes)}
matrix = [[0] * len(nodes) for _ in nodes]
for a, b in edges:
    matrix[index[a]][index[b]] = matrix[index[b]][index[a]] = 1

# 2. Adjacency list: node -> neighbours
adj = {n: [] for n in nodes}
for a, b in edges:
    adj[a].append(b)
    adj[b].append(a)

for row in matrix:
    print(row)
print(adj)
print("degree of C:", len(adj["C"]), "| B-D connected?", matrix[index["B"]][index["D"]] == 1)
