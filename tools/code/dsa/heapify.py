def sift_down(arr, i, n):
    while True:
        l, r, smallest = 2 * i + 1, 2 * i + 2, i
        if l < n and arr[l] < arr[smallest]: smallest = l
        if r < n and arr[r] < arr[smallest]: smallest = r
        if smallest == i:
            return
        arr[i], arr[smallest] = arr[smallest], arr[i]
        i = smallest

def heapify(arr):
    # leaves are already heaps: start at the last parent and walk back to the root
    for i in range(len(arr) // 2 - 1, -1, -1):
        sift_down(arr, i, len(arr))
    return arr

print(heapify([9, 5, 7, 2, 4, 1, 8]))

import heapq                     # Python's built-in min-heap does the same
nums = [9, 5, 7, 2, 4, 1, 8]
heapq.heapify(nums)
print(nums, heapq.heappop(nums))
