class HashMap:
    """Separate chaining: each bucket is a list of [key, value] pairs."""
    def __init__(self, capacity=4):
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        bucket = self._bucket(key)
        for pair in bucket:
            if pair[0] == key:
                pair[1] = value            # existing key: update
                return
        bucket.append([key, value])
        self.size += 1
        if self.size / len(self.buckets) > 0.75:
            self._resize()                 # keep chains short

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        return None

    def _resize(self):
        pairs = [p for b in self.buckets for p in b]
        self.buckets = [[] for _ in range(len(self.buckets) * 2)]
        for k, v in pairs:
            self._bucket(k).append([k, v])

m = HashMap()
for i, fruit in enumerate(["apple", "banana", "cherry", "date", "elderberry"]):
    m.put(fruit, i)
m.put("apple", 100)
print(m.get("apple"), m.get("date"), m.get("fig"))
print("buckets:", len(m.buckets), "items:", m.size)
