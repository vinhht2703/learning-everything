// Hash map (key -> node) + doubly linked list (most recent at the right).
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.left = { key: null }; this.right = { key: null };   // dummy ends
    this.left.next = this.right; this.right.prev = this.left;
  }
  remove(node) { node.prev.next = node.next; node.next.prev = node.prev; }
  append(node) {                                             // just before the right dummy
    node.prev = this.right.prev; node.next = this.right;
    this.right.prev.next = node; this.right.prev = node;
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.remove(node);
    this.append(node);                                       // most recently used
    return node.val;
  }
  put(key, val) {
    if (this.map.has(key)) this.remove(this.map.get(key));
    const node = { key, val };
    this.map.set(key, node);
    this.append(node);
    if (this.map.size > this.capacity) {                     // evict the least recently used
      const lru = this.left.next;
      this.remove(lru);
      this.map.delete(lru.key);
    }
  }
  keys() {
    const out = [];
    for (let n = this.left.next; n !== this.right; n = n.next) out.push(n.key);
    return out;
  }
}

const cache = new LRUCache(2);
cache.put(1, "one");
cache.put(2, "two");
console.log(cache.get(1));           // 1 is now the most recent
cache.put(3, "three");               // evicts 2
console.log(cache.get(2), cache.get(3), cache.keys());
