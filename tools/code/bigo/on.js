function findMax(values) {
  let largest = values[0];
  for (const value of values) {
    if (value > largest) largest = value;
  }
  return largest;
}

console.log(findMax([4, 9, 2, 7]));
