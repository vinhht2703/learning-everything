#include <iostream>
#include <utility>
#include <vector>
using namespace std;

class MinHeap {
public:
    vector<int> heap;

    void push(int val) {
        heap.push_back(val);                          // add at the end ...
        int i = heap.size() - 1;
        while (i > 0 && heap[(i - 1) / 2] > heap[i]) {
            swap(heap[i], heap[(i - 1) / 2]);         // ... then sift it up
            i = (i - 1) / 2;
        }
    }

    int pop() {
        swap(heap.front(), heap.back());              // last item to the root
        int smallest = heap.back();
        heap.pop_back();
        int i = 0, n = heap.size();
        while (true) {                                // sift the new root down
            int l = 2 * i + 1, r = 2 * i + 2, m = i;
            if (l < n && heap[l] < heap[m]) m = l;
            if (r < n && heap[r] < heap[m]) m = r;
            if (m == i) break;
            swap(heap[i], heap[m]);
            i = m;
        }
        return smallest;
    }
};

int main() {
    MinHeap heap;
    for (int v : {5, 3, 8, 1, 9, 2}) heap.push(v);
    cout << "heap array: ";
    for (int v : heap.heap) cout << v << " ";
    cout << endl << "pops: ";
    for (int k = 0; k < 6; k++) cout << heap.pop() << " ";
    cout << endl;
}
