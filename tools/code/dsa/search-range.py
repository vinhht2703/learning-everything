SECRET = 63

def guess(n):
    # 1: secret is higher, -1: secret is lower, 0: correct
    return (SECRET > n) - (SECRET < n)

def find_secret(low, high):
    tries = 0
    while low <= high:
        mid = (low + high) // 2
        tries += 1
        result = guess(mid)
        if result > 0:
            low = mid + 1
        elif result < 0:
            high = mid - 1
        else:
            return mid, tries

number, tries = find_secret(1, 100)
print(f"found {number} in {tries} guesses")
