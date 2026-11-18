#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

void levelOrder(TreeNode* root) {
    queue<TreeNode*> q;
    if (root) q.push(root);
    int level = 0;
    while (!q.empty()) {
        cout << "level " << level++ << ": ";
        for (int i = q.size(); i > 0; i--) {   // everything queued is one level
            TreeNode* node = q.front(); q.pop();
            cout << node->val << " ";
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << endl;
    }
}

int main() {
    TreeNode* root = new TreeNode(4,
        new TreeNode(2, new TreeNode(1), new TreeNode(3)),
        new TreeNode(6, new TreeNode(5), new TreeNode(7)));
    levelOrder(root);
}
