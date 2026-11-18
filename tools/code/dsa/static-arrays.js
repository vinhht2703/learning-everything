function insertAt(arr, length, i, value) {
  // shift elements right to open a gap at index i
  for (let j = length - 1; j >= i; j--) {
    arr[j + 1] = arr[j];
  }
  arr[i] = value;
  return length + 1;
}

const arr = [4, 5, 6, 0, 0];   // capacity 5, length 3
const length = insertAt(arr, 3, 1, 9);
console.log(arr.slice(0, length));
