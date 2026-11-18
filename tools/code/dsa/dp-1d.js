// Climbing Stairs: you can climb 1 or 2 steps at a time. How many ways to reach step n?
// ways(n) = ways(n - 1) + ways(n - 2)  -- the same recurrence as Fibonacci.

function waysMemo(n, memo = new Map()) {     // top-down: recursion + cache
  if (n <= 1) return 1;
  if (!memo.has(n)) memo.set(n, waysMemo(n - 1, memo) + waysMemo(n - 2, memo));
  return memo.get(n);
}

function waysTable(n) {                      // bottom-up: fill a table from the base cases
  const dp = new Array(n + 1).fill(1);
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp;
}

function waysTwoVars(n) {                    // only the last two values are needed: O(1) space
  let a = 1, b = 1;
  for (let i = 0; i < n - 1; i++) [a, b] = [b, a + b];
  return b;
}

console.log(waysMemo(10), waysTable(10).join(" "), waysTwoVars(10));
