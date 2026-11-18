function bucketSort(arr) {
  const counts = [0, 0, 0];      // one bucket per possible value: 0, 1, 2
  for (const n of arr) counts[n]++;
  let i = 0;
  counts.forEach((count, value) => {
    for (let k = 0; k < count; k++) arr[i++] = value;  // write buckets back in order
  });
  return arr;
}

console.log(bucketSort([2, 0, 2, 1, 1, 0]));
