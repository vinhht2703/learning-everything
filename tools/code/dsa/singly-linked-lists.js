class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new ListNode(-1); // dummy node
    this.tail = this.head;
  }

  append(val) {
    this.tail.next = new ListNode(val);
    this.tail = this.tail.next;
  }

  toArray() {
    const out = [];
    for (let cur = this.head.next; cur; cur = cur.next) out.push(cur.val);
    return out;
  }
}

const lst = new LinkedList();
for (const v of [1, 2, 3]) lst.append(v);
console.log(lst.toArray());
