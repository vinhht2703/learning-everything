#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

// Length of the shortest path from the top-left to the bottom-right corner (1 = wall).
int shortestPath(const vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    queue<pair<int, int>> q;
    q.push({0, 0});
    visited[0][0] = true;
    int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    for (int length = 0; !q.empty(); length++) {
        for (int k = q.size(); k > 0; k--) {           // every cell here is `length` steps away
            auto [r, c] = q.front();
            q.pop();
            if (r == rows - 1 && c == cols - 1) return length;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 0 && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
    }
    return -1;                                          // the goal is unreachable
}

int main() {
    vector<vector<int>> grid = {
        {0, 0, 0, 0},
        {1, 1, 0, 0},
        {0, 0, 0, 1},
        {0, 1, 0, 0},
    };
    cout << shortestPath(grid) << endl;
}
