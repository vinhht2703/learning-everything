# A min-heap stored in a plain list (index 0 is the root).
heap = [1, 3, 2, 7, 4, 5, 6]

def parent(i): return (i - 1) // 2
def left(i):   return 2 * i + 1
def right(i):  return 2 * i + 2

def is_min_heap(arr):
    # every parent must be <= its children
    return all(arr[parent(i)] <= arr[i] for i in range(1, len(arr)))

print("root (minimum):", heap[0])
print("children of index 1:", heap[left(1)], heap[right(1)])
print("parent of index 5:", heap[parent(5)])
print("valid min-heap:", is_min_heap(heap), is_min_heap([3, 1, 2]))
