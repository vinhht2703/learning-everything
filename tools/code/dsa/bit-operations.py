a, b = 12, 10                          # 1100 and 1010 in binary
show = lambda n: format(n, "04b")

print("a & b  =", show(a & b), a & b)  # AND: 1 where both are 1
print("a | b  =", show(a | b), a | b)  # OR:  1 where either is 1
print("a ^ b  =", show(a ^ b), a ^ b)  # XOR: 1 where they differ
print("a << 1 =", format(a << 1, "05b"), a << 1)   # shift left = multiply by 2
print("a >> 2 =", show(a >> 2), a >> 2)            # shift right = divide by 4

def count_ones(n):
    count = 0
    while n:
        count += n & 1                 # look at the lowest bit
        n >>= 1                        # drop it
    return count

print("ones in 13:", count_ones(13), "| 13 is odd:", 13 & 1 == 1)
print("single number:", 4 ^ 1 ^ 2 ^ 1 ^ 2)   # pairs cancel out: x ^ x = 0
