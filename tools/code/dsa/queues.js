// JavaScript has no built-in deque; a linked list gives O(1) at both ends.
class Queue {
  constructor() { this.head = null; this.tail = null; this.size = 0; }

  enqueue(val) {                       // add at the back
    const node = { val, next: null };
    if (this.tail) this.tail.next = node; else this.head = node;
    this.tail = node;
    this.size++;
  }

  dequeue() {                          // remove from the front
    const node = this.head;
    this.head = node.next;
    if (!this.head) this.tail = null;
    this.size--;
    return node.val;
  }
}

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
console.log(queue.dequeue());
console.log(queue.size);
