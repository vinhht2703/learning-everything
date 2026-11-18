def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] < target:
            low = mid + 1           # target is in the right half
        elif arr[mid] > target:
            high = mid - 1          # target is in the left half
        else:
            return mid
    return -1

nums = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(nums, 9), binary_search(nums, 4))
