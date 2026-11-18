from collections import deque

queue = deque()
queue.append("A")        # enqueue at the back
queue.append("B")
queue.append("C")

print(queue.popleft())   # dequeue from the front
print(list(queue))
