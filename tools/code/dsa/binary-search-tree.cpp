#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

bool search(TreeNode* root, int target) {
    if (!root) return false;
    if (target > root->val) return search(root->right, target);  // bigger → right
    if (target < root->val) return search(root->left, target);   // smaller → left
    return true;
}

int main() {
    //        8
    //      /   \
    //     3     10
    //    / \      \
    //   1   6      14
    TreeNode* root = new TreeNode(8,
        new TreeNode(3, new TreeNode(1), new TreeNode(6)),
        new TreeNode(10, nullptr, new TreeNode(14)));
    cout << boolalpha << search(root, 6) << " " << search(root, 7) << endl;
}
