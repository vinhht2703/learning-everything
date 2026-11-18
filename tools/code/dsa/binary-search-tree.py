class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search(root, target):
    if not root:
        return False
    if target > root.val:
        return search(root.right, target)   # bigger values live on the right
    if target < root.val:
        return search(root.left, target)    # smaller values live on the left
    return True

#        8
#      /   \
#     3     10
#    / \      \
#   1   6      14
root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))
print(search(root, 6), search(root, 7))
