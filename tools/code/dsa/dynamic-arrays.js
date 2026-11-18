class DynamicArray {
  constructor() {
    this.capacity = 2;
    this.length = 0;
    this.arr = new Array(this.capacity).fill(0);
  }

  push(value) {
    if (this.length === this.capacity) this.resize();
    this.arr[this.length] = value;
    this.length++;
  }

  resize() {
    this.capacity *= 2;
    const newArr = new Array(this.capacity).fill(0);
    for (let i = 0; i < this.length; i++) newArr[i] = this.arr[i];
    this.arr = newArr;
  }
}

const d = new DynamicArray();
for (let v = 0; v < 5; v++) d.push(v);
console.log(d.length, d.capacity);
