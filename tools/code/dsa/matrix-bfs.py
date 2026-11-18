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
