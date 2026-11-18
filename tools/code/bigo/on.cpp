#include <iostream>
#include <vector>
using namespace std;

int findMax(const vector<int>& values) {
    int largest = values[0];
    for (int value : values) {
        if (value > largest) largest = value;
    }
    return largest;
}

int main() {
    cout << findMax({4, 9, 2, 7}) << endl;
}
