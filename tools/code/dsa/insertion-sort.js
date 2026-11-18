function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    // swap the new item left until it is in place
    while (j >= 0 && arr[j + 1] < arr[j]) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      j--;
    }
  }
  return arr;
}

console.log(insertionSort([5, 2, 4, 1, 3]));
