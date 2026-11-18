#include <iostream>
#include <vector>
using namespace std;

// A min-heap stored in a plain vector (index 0 is the root).
int parent(int i) { return (i - 1) / 2; }
int leftChild(int i) { return 2 * i + 1; }
int rightChild(int i) { return 2 * i + 2; }

bool isMinHeap(const vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); i++)
        if (arr[parent(i)] > arr[i]) return false;   // a parent bigger than its child
    return true;
}

int main() {
    vector<int> heap = {1, 3, 2, 7, 4, 5, 6};
    cout << boolalpha;
    cout << "root (minimum): " << heap[0] << endl;
    cout << "children of index 1: " << heap[leftChild(1)] << " " << heap[rightChild(1)] << endl;
    cout << "parent of index 5: " << heap[parent(5)] << endl;
    cout << "valid min-heap: " << isMinHeap(heap) << " " << isMinHeap({3, 1, 2}) << endl;
}
