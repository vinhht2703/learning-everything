#include <algorithm>
#include <functional>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

void siftDown(vector<int>& arr, int i, int n) {
    while (true) {
        int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
        if (l < n && arr[l] < arr[smallest]) smallest = l;
        if (r < n && arr[r] < arr[smallest]) smallest = r;
        if (smallest == i) return;
        swap(arr[i], arr[smallest]);
        i = smallest;
    }
}

void heapify(vector<int>& arr) {
    // leaves are already heaps: start at the last parent and walk back to the root
    for (int i = arr.size() / 2 - 1; i >= 0; i--) siftDown(arr, i, arr.size());
}

int main() {
    vector<int> arr = {9, 5, 7, 2, 4, 1, 8};
    heapify(arr);
    for (int v : arr) cout << v << " ";
    cout << endl;

    vector<int> nums = {9, 5, 7, 2, 4, 1, 8};
    make_heap(nums.begin(), nums.end(), greater<int>());   // the standard library equivalent
    cout << "min: " << nums.front() << endl;
}
