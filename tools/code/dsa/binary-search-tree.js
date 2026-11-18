class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function search(root, target) {
  if (!root) return false;
  if (target > root.val) return search(root.right, target); // bigger → right
  if (target < root.val) return search(root.left, target);  // smaller → left
  return true;
}

//        8
//      /   \
//     3     10
//    / \      \
//   1   6      14
const root = new TreeNode(8,
  new TreeNode(3, new TreeNode(1), new TreeNode(6)),
  new TreeNode(10, null, new TreeNode(14)));
console.log(search(root, 6), search(root, 7));
