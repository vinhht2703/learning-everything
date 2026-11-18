def insertion_sort(arr):
    for i in range(1, len(arr)):
        j = i - 1
        # swap the new item left until it is in place
        while j >= 0 and arr[j + 1] < arr[j]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
            j -= 1
    return arr

print(insertion_sort([5, 2, 4, 1, 3]))
