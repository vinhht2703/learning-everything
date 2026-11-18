# 1. Count things in one pass
words = "the cat and the hat and the bat".split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)

# 2. Two Sum: remember what you've seen -> O(n) instead of O(n^2)
def two_sum(nums, target):
    seen = {}                          # value -> index
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i

print(two_sum([2, 7, 11, 15], 9))

# 3. Sets: fast membership and duplicates
print(len(set(words)), "unique words;", "cat" in set(words))
