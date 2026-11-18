class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const height = (node) => (node ? 1 + Math.max(height(node.left), height(node.right)) : 0);

function countLeaves(node) {
  if (!node) return 0;
  if (!node.left && !node.right) return 1;
  return countLeaves(node.left) + countLeaves(node.right);
}

//        1
//      /   \
//     2     3
//    / \     \
//   4   5     6
const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6)));
console.log(height(root), countLeaves(root));
