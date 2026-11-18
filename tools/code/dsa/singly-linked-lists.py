class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = ListNode(-1)   # dummy node
        self.tail = self.head

    def append(self, val):
        self.tail.next = ListNode(val)
        self.tail = self.tail.next

    def to_list(self):
        cur, out = self.head.next, []
        while cur:
            out.append(cur.val)
            cur = cur.next
        return out

lst = LinkedList()
for v in [1, 2, 3]:
    lst.append(v)
print(lst.to_list())
