const a = 12, b = 10;                         // 1100 and 1010 in binary
const show = (n, width = 4) => n.toString(2).padStart(width, "0");

console.log("a & b  =", show(a & b), a & b);  // AND: 1 where both are 1
console.log("a | b  =", show(a | b), a | b);  // OR:  1 where either is 1
console.log("a ^ b  =", show(a ^ b), a ^ b);  // XOR: 1 where they differ
console.log("a << 1 =", show(a << 1, 5), a << 1);   // shift left = multiply by 2
console.log("a >> 2 =", show(a >> 2), a >> 2);      // shift right = divide by 4

function countOnes(n) {
  let count = 0;
  while (n) {
    count += n & 1;                           // look at the lowest bit
    n >>>= 1;                                 // drop it
  }
  return count;
}

console.log("ones in 13:", countOnes(13), "| 13 is odd:", (13 & 1) === 1);
console.log("single number:", 4 ^ 1 ^ 2 ^ 1 ^ 2);   // pairs cancel out: x ^ x = 0
