const base = 1000;   // address of nums[0]
const size = 4;      // bytes per integer
const nums = [7, 3, 9, 4];

for (let i = 0; i < nums.length; i++) {
  console.log(`nums[${i}] = ${nums[i]} at address ${base + i * size}`);
}
