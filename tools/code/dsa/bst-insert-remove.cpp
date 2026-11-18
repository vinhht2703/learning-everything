#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left = nullptr;
    TreeNode* right = nullptr;
    TreeNode(int v) : val(v) {}
};

TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val > root->val) root->right = insert(root->right, val);
    else if (val < root->val) root->left = insert(root->left, val);
    return root;
}

TreeNode* minNode(TreeNode* root) {
    while (root->left) root = root->left;
    return root;
}

TreeNode* remove(TreeNode* root, int val) {
    if (!root) return nullptr;
    if (val > root->val) root->right = remove(root->right, val);
    else if (val < root->val) root->left = remove(root->left, val);
    else if (!root->left) { TreeNode* r = root->right; delete root; return r; }   // 0 or 1 child
    else if (!root->right) { TreeNode* l = root->left; delete root; return l; }
    else {                                                // 2 children: copy successor
        TreeNode* successor = minNode(root->right);
        root->val = successor->val;
        root->right = remove(root->right, successor->val);
    }
    return root;
}

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreeNode* root = nullptr;
    for (int v : {8, 3, 10, 1, 6, 14, 4}) root = insert(root, v);
    root = remove(root, 3);
    inorder(root);
    cout << "| left child of root: " << root->left->val << endl;
}
