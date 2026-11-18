#include <iostream>
#include <vector>
using namespace std;

// Count the paths from the top-left to the bottom-right corner.
// Moves: up, down, left, right. 1 = wall. A path may not revisit a cell.
int countPaths(const vector<vector<int>>& grid, int r, int c, vector<vector<bool>>& visited) {
    int rows = grid.size(), cols = grid[0].size();
    if (r < 0 || c < 0 || r == rows || c == cols || grid[r][c] == 1 || visited[r][c]) return 0;
    if (r == rows - 1 && c == cols - 1) return 1;         // reached the goal
    visited[r][c] = true;                                  // choose
    int total = countPaths(grid, r + 1, c, visited) + countPaths(grid, r - 1, c, visited) +
                countPaths(grid, r, c + 1, visited) + countPaths(grid, r, c - 1, visited);
    visited[r][c] = false;                                 // un-choose (backtrack)
    return total;
}

int main() {
    vector<vector<int>> grid = {
        {0, 0, 0, 0},
        {1, 1, 0, 0},
        {0, 0, 0, 1},
        {0, 1, 0, 0},
    };
    vector<vector<bool>> visited(4, vector<bool>(4, false));
    cout << countPaths(grid, 0, 0, visited) << endl;
}
