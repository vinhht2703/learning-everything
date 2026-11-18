#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

bool findPath(TreeNode* node, vector<int>& path) {
    if (!node || node->val == 0) return false;     // a 0 is a wall
    path.push_back(node->val);                     // choose
    if (!node->left && !node->right) return true;  // reached a leaf
    if (findPath(node->left, path) || findPath(node->right, path)) return true;  // explore
    path.pop_back();                               // un-choose (backtrack)
    return false;
}

int main() {
    TreeNode* root = new TreeNode(4,
        new TreeNode(0, nullptr, new TreeNode(7)),
        new TreeNode(1, new TreeNode(2, nullptr, new TreeNode(3)), new TreeNode(0)));
    vector<int> path;
    bool found = findPath(root, path);
    cout << boolalpha << found << " ";
    for (int v : path) cout << v << " ";
    cout << endl;
}
