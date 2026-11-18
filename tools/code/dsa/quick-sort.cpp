#include <iostream>
#include <utility>
#include <vector>
using namespace std;

void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int pivot = arr[hi];                // last element as pivot
    int left = lo;
    for (int i = lo; i < hi; i++) {
        if (arr[i] < pivot) swap(arr[left++], arr[i]);  // smaller items go left
    }
    swap(arr[left], arr[hi]);           // pivot to its final spot
    quickSort(arr, lo, left - 1);
    quickSort(arr, left + 1, hi);
}

int main() {
    vector<int> nums = {6, 2, 4, 1, 3, 5};
    quickSort(nums, 0, nums.size() - 1);
    for (int x : nums) cout << x << " ";
    cout << endl;
}
