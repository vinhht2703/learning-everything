function quickSort(arr, lo, hi) {
  if (lo >= hi) return;
  const pivot = arr[hi];               // last element as pivot
  let left = lo;
  for (let i = lo; i < hi; i++) {
    if (arr[i] < pivot) {              // move smaller items to the left side
      [arr[left], arr[i]] = [arr[i], arr[left]];
      left++;
    }
  }
  [arr[left], arr[hi]] = [arr[hi], arr[left]];   // pivot to its final spot
  quickSort(arr, lo, left - 1);
  quickSort(arr, left + 1, hi);
}

const nums = [6, 2, 4, 1, 3, 5];
quickSort(nums, 0, nums.length - 1);
console.log(nums);
