#include <iostream>
#include <unordered_map>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int fibMemo(int n, unordered_map<int, int>& memo) {
    if (n <= 1) return n;
    if (!memo.count(n)) memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

int main() {
    unordered_map<int, int> memo;
    cout << fib(10) << " " << fibMemo(10, memo) << endl;
}
