class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node(0); // left dummy
    this.tail = new Node(0); // right dummy
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addBack(val) {
    const node = new Node(val), last = this.tail.prev;
    last.next = node; node.prev = last;
    node.next = this.tail; this.tail.prev = node;
  }

  removeBack() {
    const last = this.tail.prev;
    last.prev.next = this.tail;
    this.tail.prev = last.prev;
    return last.val;
  }
}

const dll = new DoublyLinkedList();
for (const v of [1, 2, 3]) dll.addBack(v);
console.log(dll.removeBack());
