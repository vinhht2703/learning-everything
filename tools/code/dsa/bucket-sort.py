def bucket_sort(arr):
    counts = [0, 0, 0]          # one bucket per possible value: 0, 1, 2
    for n in arr:
        counts[n] += 1
    i = 0
    for value, count in enumerate(counts):
        for _ in range(count):  # write each bucket back in order
            arr[i] = value
            i += 1
    return arr

print(bucket_sort([2, 0, 2, 1, 1, 0]))
