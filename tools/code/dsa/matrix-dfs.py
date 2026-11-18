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
