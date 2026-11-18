def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

def fib_memo(n, memo):
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

print(fib(10), fib_memo(10, {}))
