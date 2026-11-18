// 1. Count things in one pass
const words = "the cat and the hat and the bat".split(" ");
const counts = new Map();
for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
console.log(counts);

// 2. Two Sum: remember what you've seen -> O(n) instead of O(n^2)
function twoSum(nums, target) {
  const seen = new Map();             // value -> index
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];
    seen.set(nums[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9));

// 3. Sets: fast membership and duplicates
const unique = new Set(words);
console.log(unique.size, "unique words;", unique.has("cat"));
