#include <iostream>
#include <utility>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); i++) {
        int j = i - 1;
        // swap the new item left until it is in place
        while (j >= 0 && arr[j + 1] < arr[j]) {
            swap(arr[j], arr[j + 1]);
            j--;
        }
    }
}

int main() {
    vector<int> arr = {5, 2, 4, 1, 3};
    insertionSort(arr);
    for (int x : arr) cout << x << " ";
    cout << endl;
}
