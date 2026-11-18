from collections import deque

# Directed edges, e.g. "you can fly from A to B".
edges = [["A", "B"], ["B", "C"], ["B", "E"], ["C", "E"], ["E", "D"]]

adj = {}
for src, dst in edges:
    adj.setdefault(src, []).append(dst)
    adj.setdefault(dst, [])

def count_paths(node, target, visited):
    # DFS with backtracking: how many different routes reach the target?
    if node in visited:
        return 0
    if node == target:
        return 1
    visited.add(node)
    total = sum(count_paths(n, target, visited) for n in adj[node])
    visited.remove(node)
    return total

def shortest(node, target):
    # BFS: fewest edges from node to target
    queue, visited, length = deque([node]), {node}, 0
    while queue:
        for _ in range(len(queue)):
            cur = queue.popleft()
            if cur == target:
                return length
            for n in adj[cur]:
                if n not in visited:
                    visited.add(n)
                    queue.append(n)
        length += 1
    return -1

print(adj)
print("paths A->E:", count_paths("A", "E", set()), "| shortest A->D:", shortest("A", "D"))
