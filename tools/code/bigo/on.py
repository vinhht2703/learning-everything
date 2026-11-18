def find_max(values):
    largest = values[0]
    for value in values:
        if value > largest:
            largest = value
    return largest

print(find_max([4, 9, 2, 7]))
