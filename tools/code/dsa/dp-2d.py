# Unique paths: move only right or down from the top-left to the bottom-right. 1 = obstacle.
grid = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
]

def unique_paths(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                dp[r][c] = 0                       # nobody can stand on an obstacle
            elif r == 0 and c == 0:
                dp[r][c] = 1
            else:                                  # arrive from above + arrive from the left
                dp[r][c] = (dp[r - 1][c] if r > 0 else 0) + (dp[r][c - 1] if c > 0 else 0)
    return dp

table = unique_paths(grid)
for row in table:
    print(row)
print("paths:", table[-1][-1])
