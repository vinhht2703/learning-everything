#include <iostream>
#include <utility>
using namespace std;

const int SECRET = 63;

// 1: secret is higher, -1: secret is lower, 0: correct
int guess(int n) { return (SECRET > n) - (SECRET < n); }

pair<int, int> findSecret(int low, int high) {
    int tries = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        tries++;
        int result = guess(mid);
        if (result > 0) low = mid + 1;
        else if (result < 0) high = mid - 1;
        else return {mid, tries};
    }
    return {-1, tries};
}

int main() {
    auto [number, tries] = findSecret(1, 100);
    cout << "found " << number << " in " << tries << " guesses" << endl;
}
