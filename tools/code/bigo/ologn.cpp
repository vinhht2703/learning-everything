#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& values, int target) {
    int low = 0, high = values.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (values[mid] == target) return mid;
        if (values[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    cout << binarySearch({2, 4, 6, 8, 10}, 8) << endl;
}
