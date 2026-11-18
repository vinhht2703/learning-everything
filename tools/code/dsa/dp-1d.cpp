#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

// Climbing Stairs: you can climb 1 or 2 steps at a time. How many ways to reach step n?
// ways(n) = ways(n - 1) + ways(n - 2)  -- the same recurrence as Fibonacci.

long long waysMemo(int n, unordered_map<int, long long>& memo) {   // top-down
    if (n <= 1) return 1;
    if (!memo.count(n)) memo[n] = waysMemo(n - 1, memo) + waysMemo(n - 2, memo);
    return memo[n];
}

vector<long long> waysTable(int n) {                                // bottom-up
    vector<long long> dp(n + 1, 1);
    for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp;
}

long long waysTwoVars(int n) {                                      // O(1) space
    long long a = 1, b = 1;
    for (int i = 0; i < n - 1; i++) { long long c = a + b; a = b; b = c; }
    return b;
}

int main() {
    unordered_map<int, long long> memo;
    cout << waysMemo(10, memo) << " | ";
    for (long long v : waysTable(10)) cout << v << " ";
    cout << "| " << waysTwoVars(10) << endl;
}
