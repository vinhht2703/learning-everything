#include <iostream>
using namespace std;

class DynamicArray {
    int capacity = 2;
    int length = 0;
    int* arr = new int[2];

    void resize() {
        capacity *= 2;
        int* newArr = new int[capacity];
        for (int i = 0; i < length; i++) newArr[i] = arr[i];
        delete[] arr;
        arr = newArr;
    }

public:
    ~DynamicArray() { delete[] arr; }

    void push(int value) {
        if (length == capacity) resize();
        arr[length++] = value;
    }

    int size() const { return length; }
    int cap() const { return capacity; }
};

int main() {
    DynamicArray d;
    for (int v = 0; v < 5; v++) d.push(v);
    cout << d.size() << " " << d.cap() << endl;
}
