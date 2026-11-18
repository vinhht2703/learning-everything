#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> stops = {"A", "B", "C"};  // must start sorted
    int routes = 0;
    do {
        routes++;
    } while (next_permutation(stops.begin(), stops.end()));
    cout << routes << endl;
}
