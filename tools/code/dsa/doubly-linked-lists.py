class Node:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = Node(0)          # left dummy
        self.tail = Node(0)          # right dummy
        self.head.next = self.tail
        self.tail.prev = self.head

    def add_back(self, val):
        node, last = Node(val), self.tail.prev
        last.next, node.prev = node, last
        node.next, self.tail.prev = self.tail, node

    def remove_back(self):
        last = self.tail.prev
        last.prev.next = self.tail
        self.tail.prev = last.prev
        return last.val

dll = DoublyLinkedList()
for v in [1, 2, 3]:
    dll.add_back(v)
print(dll.remove_back())
