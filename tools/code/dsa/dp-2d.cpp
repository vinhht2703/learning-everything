#include <iostream>
#include <vector>
using namespace std;

// Unique paths: move only right or down from the top-left to the bottom-right. 1 = obstacle.
vector<vector<long long>> uniquePaths(const vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<long long>> dp(rows, vector<long long>(cols, 0));
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) dp[r][c] = 0;                       // obstacle
            else if (r == 0 && c == 0) dp[r][c] = 1;
            else dp[r][c] = (r > 0 ? dp[r - 1][c] : 0) + (c > 0 ? dp[r][c - 1] : 0);  // above + left
        }
    }
    return dp;
}

int main() {
    vector<vector<int>> grid = {
        {0, 0, 0, 0},
        {0, 1, 0, 0},
        {0, 0, 0, 1},
        {1, 0, 0, 0},
    };
    auto table = uniquePaths(grid);
    for (auto& row : table) {
        for (long long v : row) cout << v << " ";
        cout << endl;
    }
    cout << "paths: " << table.back().back() << endl;
}
