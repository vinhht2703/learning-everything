def insert_at(arr, length, i, value):
    # shift elements right to open a gap at index i
    for j in range(length - 1, i - 1, -1):
        arr[j + 1] = arr[j]
    arr[i] = value
    return length + 1

arr = [4, 5, 6, 0, 0]    # capacity 5, length 3
length = insert_at(arr, 3, 1, 9)
print(arr[:length])
