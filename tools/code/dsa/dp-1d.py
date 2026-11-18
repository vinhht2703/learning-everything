# Climbing Stairs: you can climb 1 or 2 steps at a time. How many ways to reach step n?
# ways(n) = ways(n - 1) + ways(n - 2)  -- the same recurrence as Fibonacci.

def ways_memo(n, memo):              # top-down: recursion + cache
    if n <= 1:
        return 1
    if n not in memo:
        memo[n] = ways_memo(n - 1, memo) + ways_memo(n - 2, memo)
    return memo[n]

def ways_table(n):                   # bottom-up: fill a table from the base cases
    dp = [1] * (n + 1)
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp

def ways_two_vars(n):                # only the last two values are needed: O(1) space
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print(ways_memo(10, {}), ways_table(10), ways_two_vars(10))
