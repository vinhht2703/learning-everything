#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;   // avoids overflow on huge arrays
        if (arr[mid] < target) low = mid + 1;
        else if (arr[mid] > target) high = mid - 1;
        else return mid;
    }
    return -1;
}

int main() {
    vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
    cout << binarySearch(nums, 9) << " " << binarySearch(nums, 4) << endl;
}
