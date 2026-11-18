#include <iostream>
#include <vector>
using namespace std;

vector<int> merge(const vector<int>& left, const vector<int>& right) {
    vector<int> out;
    size_t i = 0, j = 0;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) out.push_back(left[i++]);  // <= keeps it stable
        else out.push_back(right[j++]);
    }
    while (i < left.size()) out.push_back(left[i++]);
    while (j < right.size()) out.push_back(right[j++]);
    return out;
}

vector<int> mergeSort(const vector<int>& arr) {
    if (arr.size() <= 1) return arr;
    size_t mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid), right(arr.begin() + mid, arr.end());
    return merge(mergeSort(left), mergeSort(right));
}

int main() {
    for (int x : mergeSort({38, 27, 43, 3, 9, 82, 10})) cout << x << " ";
    cout << endl;
}
