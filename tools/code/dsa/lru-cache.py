class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    """Hash map (key -> node) + doubly linked list (most recent at the right)."""
    def __init__(self, capacity):
        self.capacity = capacity
        self.map = {}
        self.left, self.right = Node(), Node()      # dummy ends: left = least recent
        self.left.next, self.right.prev = self.right, self.left

    def _remove(self, node):
        node.prev.next, node.next.prev = node.next, node.prev

    def _append(self, node):                        # insert just before the right dummy
        node.prev, node.next = self.right.prev, self.right
        self.right.prev.next = self.right.prev = node

    def get(self, key):
        if key not in self.map:
            return -1
        node = self.map[key]
        self._remove(node)
        self._append(node)                          # mark as most recently used
        return node.val

    def put(self, key, val):
        if key in self.map:
            self._remove(self.map[key])
        self.map[key] = Node(key, val)
        self._append(self.map[key])
        if len(self.map) > self.capacity:           # evict the least recently used
            lru = self.left.next
            self._remove(lru)
            del self.map[lru.key]

    def keys(self):
        out, node = [], self.left.next
        while node is not self.right:
            out.append(node.key)
            node = node.next
        return out

cache = LRUCache(2)
cache.put(1, "one")
cache.put(2, "two")
print(cache.get(1))          # 1 is now the most recent
cache.put(3, "three")        # evicts 2, the least recently used
print(cache.get(2), cache.get(3), cache.keys())
