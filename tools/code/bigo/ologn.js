function binarySearch(values, target) {
  let low = 0, high = values.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (values[mid] === target) return mid;
    if (values[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

console.log(binarySearch([2, 4, 6, 8, 10], 8));
