// JavaScript's Map keeps insertion order, not sorted order.
// A BST-backed map keeps keys sorted:
class TreeMap {
  #root = null;

  put(key, value) {
    const put = (node) => {
      if (!node) return { key, value, left: null, right: null };
      if (key < node.key) node.left = put(node.left);
      else if (key > node.key) node.right = put(node.right);
      else node.value = value;               // same key: update
      return node;
    };
    this.#root = put(this.#root);
  }

  *entries(node = this.#root) {             // in-order = sorted by key
    if (!node) return;
    yield* this.entries(node.left);
    yield [node.key, node.value];
    yield* this.entries(node.right);
  }
}

const ages = new TreeMap();
for (const [name, age] of [["Mai", 31], ["An", 24], ["Tuan", 28], ["Binh", 35], ["An", 25]]) {
  ages.put(name, age);
}
console.log([...ages.entries()].map(([k, v]) => `${k}=${v}`).join(", "));
