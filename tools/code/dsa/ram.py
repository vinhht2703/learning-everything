base = 1000      # address of nums[0]
size = 4         # bytes per integer
nums = [7, 3, 9, 4]

for i in range(len(nums)):
    print(f"nums[{i}] = {nums[i]} at address {base + i * size}")
