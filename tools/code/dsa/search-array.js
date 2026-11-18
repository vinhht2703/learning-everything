function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < target) low = mid + 1;        // right half
    else if (arr[mid] > target) high = mid - 1;  // left half
    else return mid;
  }
  return -1;
}

const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(nums, 9), binarySearch(nums, 4));
