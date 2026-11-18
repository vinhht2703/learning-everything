#include <algorithm>
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

int height(TreeNode* node) {
    if (!node) return 0;
    return 1 + max(height(node->left), height(node->right));
}

int countLeaves(TreeNode* node) {
    if (!node) return 0;
    if (!node->left && !node->right) return 1;
    return countLeaves(node->left) + countLeaves(node->right);
}

int main() {
    //        1
    //      /   \
    //     2     3
    //    / \     \
    //   4   5     6
    TreeNode* root = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, nullptr, new TreeNode(6)));
    cout << height(root) << " " << countLeaves(root) << endl;
}
