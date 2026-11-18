#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> names = {"Lee", "Ari", "Sam", "Jo"};
    sort(names.begin(), names.end());  // O(n log n)
    for (const string& name : names) cout << name << " ";
    cout << endl;
}
