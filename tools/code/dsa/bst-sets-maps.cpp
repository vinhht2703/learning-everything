#include <iostream>
#include <map>
#include <set>
#include <string>
using namespace std;

int main() {
    // std::map and std::set are balanced binary search trees (red-black trees):
    // insert / find / erase are O(log n) and iteration is in sorted order.
    map<string, int> ages;
    ages["Mai"] = 31;
    ages["An"] = 24;
    ages["Tuan"] = 28;
    ages["Binh"] = 35;
    ages["An"] = 25;            // same key: update the value

    for (const auto& [name, age] : ages) cout << name << "=" << age << " ";
    cout << endl;

    set<int> seen = {5, 1, 4, 1, 3};    // duplicates are dropped
    for (int x : seen) cout << x << " ";
    cout << endl;
}
