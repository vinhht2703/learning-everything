#include <iostream>
#include <vector>
using namespace std;

void bucketSort(vector<int>& arr) {
    int counts[3] = {0, 0, 0};    // one bucket per possible value: 0, 1, 2
    for (int n : arr) counts[n]++;
    int i = 0;
    for (int value = 0; value < 3; value++)
        for (int k = 0; k < counts[value]; k++) arr[i++] = value;
}

int main() {
    vector<int> arr = {2, 0, 2, 1, 1, 0};
    bucketSort(arr);
    for (int x : arr) cout << x << " ";
    cout << endl;
}
