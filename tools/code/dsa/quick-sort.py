def quick_sort(arr, lo, hi):
    if lo >= hi:
        return
    pivot = arr[hi]                 # last element as pivot
    left = lo
    for i in range(lo, hi):
        if arr[i] < pivot:          # move smaller items to the left side
            arr[left], arr[i] = arr[i], arr[left]
            left += 1
    arr[left], arr[hi] = arr[hi], arr[left]   # pivot to its final spot
    quick_sort(arr, lo, left - 1)
    quick_sort(arr, left + 1, hi)

nums = [6, 2, 4, 1, 3, 5]
quick_sort(nums, 0, len(nums) - 1)
print(nums)
