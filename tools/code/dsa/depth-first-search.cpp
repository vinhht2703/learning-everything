#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

void preorder(TreeNode* n) {    // visit, left, right
    if (!n) return;
    cout << n->val << " "; preorder(n->left); preorder(n->right);
}

void inorder(TreeNode* n) {     // left, visit, right -> sorted for a BST
    if (!n) return;
    inorder(n->left); cout << n->val << " "; inorder(n->right);
}

void postorder(TreeNode* n) {   // left, right, visit
    if (!n) return;
    postorder(n->left); postorder(n->right); cout << n->val << " ";
}

int main() {
    TreeNode* root = new TreeNode(4,
        new TreeNode(2, new TreeNode(1), new TreeNode(3)),
        new TreeNode(6, new TreeNode(5), new TreeNode(7)));
    cout << "pre:  "; preorder(root); cout << endl;
    cout << "in:   "; inorder(root); cout << endl;
    cout << "post: "; postorder(root); cout << endl;
}
