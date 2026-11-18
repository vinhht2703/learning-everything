class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val > root.val) root.right = insert(root.right, val);
  else if (val < root.val) root.left = insert(root.left, val);
  return root;
}

function minNode(root) {
  while (root.left) root = root.left;
  return root;
}

function remove(root, val) {
  if (!root) return null;
  if (val > root.val) root.right = remove(root.right, val);
  else if (val < root.val) root.left = remove(root.left, val);
  else if (!root.left) return root.right;      // 0 or 1 child
  else if (!root.right) return root.left;
  else {                                       // 2 children: copy successor
    const successor = minNode(root.right);
    root.val = successor.val;
    root.right = remove(root.right, successor.val);
  }
  return root;
}

const inorder = (r) => (r ? [...inorder(r.left), r.val, ...inorder(r.right)] : []);

let root = null;
for (const v of [8, 3, 10, 1, 6, 14, 4]) root = insert(root, v);
root = remove(root, 3);
console.log(inorder(root), root.left.val);
