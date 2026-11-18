class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function preorder(node, out = []) {   // visit, left, right
  if (node) { out.push(node.val); preorder(node.left, out); preorder(node.right, out); }
  return out;
}

function inorder(node, out = []) {    // left, visit, right -> sorted for a BST
  if (node) { inorder(node.left, out); out.push(node.val); inorder(node.right, out); }
  return out;
}

function postorder(node, out = []) {  // left, right, visit
  if (node) { postorder(node.left, out); postorder(node.right, out); out.push(node.val); }
  return out;
}

const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7)));
console.log("pre: ", preorder(root).join(" "));
console.log("in:  ", inorder(root).join(" "));
console.log("post:", postorder(root).join(" "));
