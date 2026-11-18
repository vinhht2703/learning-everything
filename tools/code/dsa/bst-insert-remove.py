class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val > root.val:
        root.right = insert(root.right, val)
    elif val < root.val:
        root.left = insert(root.left, val)
    return root

def min_node(root):
    while root.left:
        root = root.left
    return root

def remove(root, val):
    if not root:
        return None
    if val > root.val:
        root.right = remove(root.right, val)
    elif val < root.val:
        root.left = remove(root.left, val)
    elif not root.left:
        return root.right          # 0 or 1 child
    elif not root.right:
        return root.left
    else:                          # 2 children: copy the in-order successor
        successor = min_node(root.right)
        root.val = successor.val
        root.right = remove(root.right, successor.val)
    return root

def inorder(root):
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []

root = None
for v in [8, 3, 10, 1, 6, 14, 4]:
    root = insert(root, v)
root = remove(root, 3)
print(inorder(root), root.left.val)
