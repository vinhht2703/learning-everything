class DynamicArray:
    def __init__(self):
        self.capacity = 2
        self.length = 0
        self.arr = [0] * self.capacity

    def push(self, value):
        if self.length == self.capacity:
            self.resize()
        self.arr[self.length] = value
        self.length += 1

    def resize(self):
        self.capacity *= 2
        new_arr = [0] * self.capacity
        for i in range(self.length):
            new_arr[i] = self.arr[i]
        self.arr = new_arr

d = DynamicArray()
for v in range(5):
    d.push(v)
print(d.length, d.capacity)
