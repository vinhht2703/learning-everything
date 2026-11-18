#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>
using namespace std;

vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> seen;                   // value -> index
    for (int i = 0; i < (int)nums.size(); i++) {
        auto it = seen.find(target - nums[i]);
        if (it != seen.end()) return {it->second, i};
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    // 1. Count things in one pass
    istringstream text("the cat and the hat and the bat");
    unordered_map<string, int> counts;
    vector<string> words;
    for (string w; text >> w;) { counts[w]++; words.push_back(w); }
    cout << "the=" << counts["the"] << " and=" << counts["and"] << " cat=" << counts["cat"] << endl;

    // 2. Two Sum in O(n)
    vector<int> pair = twoSum({2, 7, 11, 15}, 9);
    cout << pair[0] << " " << pair[1] << endl;

    // 3. Sets: fast membership and duplicates
    unordered_set<string> unique(words.begin(), words.end());
    cout << unique.size() << " unique words; " << boolalpha << (unique.count("cat") > 0) << endl;
}
