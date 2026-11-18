const SECRET = 63;

// 1: secret is higher, -1: secret is lower, 0: correct
const guess = (n) => Math.sign(SECRET - n);

function findSecret(low, high) {
  let tries = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    tries++;
    const result = guess(mid);
    if (result > 0) low = mid + 1;
    else if (result < 0) high = mid - 1;
    else return [mid, tries];
  }
}

const [number, tries] = findSecret(1, 100);
console.log(`found ${number} in ${tries} guesses`);
