class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function levelOrder(root) {
  const levels = [];
  let queue = root ? [root] : [];
  while (queue.length) {
    levels.push(queue.map((n) => n.val));         // everything queued is one level
    const next = [];
    for (const n of queue) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    queue = next;
  }
  return levels;
}

const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7)));
console.log(JSON.stringify(levelOrder(root)));
