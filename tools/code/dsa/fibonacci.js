function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (!memo.has(n)) memo.set(n, fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
  return memo.get(n);
}

console.log(fib(10), fibMemo(10));
