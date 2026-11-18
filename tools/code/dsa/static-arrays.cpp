#include <iostream>
using namespace std;

int insertAt(int arr[], int length, int i, int value) {
    // shift elements right to open a gap at index i
    for (int j = length - 1; j >= i; j--) {
        arr[j + 1] = arr[j];
    }
    arr[i] = value;
    return length + 1;
}

int main() {
    int arr[5] = {4, 5, 6};          // capacity 5, length 3
    int length = insertAt(arr, 3, 1, 9);
    for (int k = 0; k < length; k++) cout << arr[k] << " ";
    cout << endl;
}
