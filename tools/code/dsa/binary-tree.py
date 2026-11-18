class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def height(node):
    if not node:
        return 0
    return 1 + max(height(node.left), height(node.right))

def count_leaves(node):
    if not node:
        return 0
    if not node.left and not node.right:
        return 1
    return count_leaves(node.left) + count_leaves(node.right)

#        1
#      /   \
#     2     3
#    / \     \
#   4   5     6
root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3, None, TreeNode(6)))
print(height(root), count_leaves(root))
