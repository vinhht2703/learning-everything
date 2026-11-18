class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def find_path(node, path):
    # a 0 is a wall: this branch cannot be part of the path
    if not node or node.val == 0:
        return False
    path.append(node.val)                     # choose
    if not node.left and not node.right:
        return True                           # reached a leaf: success
    if find_path(node.left, path) or find_path(node.right, path):
        return True                           # explore
    path.pop()                                # un-choose (backtrack)
    return False

#         4
#       /   \
#      0     1
#       \   / \
#        7 2   0
#           \
#            3
root = TreeNode(4, TreeNode(0, None, TreeNode(7)),
                TreeNode(1, TreeNode(2, None, TreeNode(3)), TreeNode(0)))
path = []
print(find_path(root, path), path)
