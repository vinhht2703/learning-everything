class Node:
    def __init__(self, key, value):
        self.key, self.value = key, value
        self.left = self.right = None

class TreeMap:
    """A sorted map built on a binary search tree."""
    def __init__(self):
        self.root = None

    def put(self, key, value):
        def _put(node):
            if not node:
                return Node(key, value)
            if key < node.key:
                node.left = _put(node.left)
            elif key > node.key:
                node.right = _put(node.right)
            else:
                node.value = value      # same key: update the value
            return node
        self.root = _put(self.root)

    def items(self):                    # in-order traversal = sorted by key
        out, stack, cur = [], [], self.root
        while stack or cur:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            out.append((cur.key, cur.value))
            cur = cur.right
        return out

ages = TreeMap()
for name, age in [("Mai", 31), ("An", 24), ("Tuan", 28), ("Binh", 35), ("An", 25)]:
    ages.put(name, age)
print(ages.items())
