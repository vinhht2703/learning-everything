// Separate chaining: each bucket is an array of [key, value] pairs.
// A simple string hash keeps the example self-contained.
function hashString(s) {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

class HashMap {
  constructor(capacity = 4) {
    this.buckets = Array.from({ length: capacity }, () => []);
    this.size = 0;
  }
  bucket(key) { return this.buckets[hashString(key) % this.buckets.length]; }

  put(key, value) {
    const b = this.bucket(key);
    const pair = b.find((p) => p[0] === key);
    if (pair) { pair[1] = value; return; }       // existing key: update
    b.push([key, value]);
    this.size++;
    if (this.size / this.buckets.length > 0.75) this.resize();
  }

  get(key) {
    const pair = this.bucket(key).find((p) => p[0] === key);
    return pair ? pair[1] : null;
  }

  resize() {
    const pairs = this.buckets.flat();
    this.buckets = Array.from({ length: this.buckets.length * 2 }, () => []);
    for (const [k, v] of pairs) this.bucket(k).push([k, v]);
  }
}

const m = new HashMap();
["apple", "banana", "cherry", "date", "elderberry"].forEach((fruit, i) => m.put(fruit, i));
m.put("apple", 100);
console.log(m.get("apple"), m.get("date"), m.get("fig"));
console.log("buckets:", m.buckets.length, "items:", m.size);
