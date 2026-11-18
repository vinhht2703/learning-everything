class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder(node, out):
    if node:
        out.append(node.val)        # visit, then left, then right
        preorder(node.left, out)
        preorder(node.right, out)
    return out

def inorder(node, out):
    if node:
        inorder(node.left, out)     # left, visit, right -> sorted for a BST
        out.append(node.val)
        inorder(node.right, out)
    return out

def postorder(node, out):
    if node:
        postorder(node.left, out)   # left, right, then visit
        postorder(node.right, out)
        out.append(node.val)
    return out

root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(6, TreeNode(5), TreeNode(7)))
print("pre: ", preorder(root, []))
print("in:  ", inorder(root, []))
print("post:", postorder(root, []))
