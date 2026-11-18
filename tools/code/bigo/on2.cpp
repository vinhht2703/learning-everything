#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {3, 5, 8};
    for (size_t i = 0; i < values.size(); i++) {
        for (size_t j = i + 1; j < values.size(); j++) {
            cout << values[i] << " " << values[j] << endl;
        }
    }
}
