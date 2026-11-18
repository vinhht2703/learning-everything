class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function findPath(node, path) {
  if (!node || node.val === 0) return false;   // a 0 is a wall
  path.push(node.val);                         // choose
  if (!node.left && !node.right) return true;  // reached a leaf
  if (findPath(node.left, path) || findPath(node.right, path)) return true; // explore
  path.pop();                                  // un-choose (backtrack)
  return false;
}

//         4
//       /   \
//      0     1
//       \   / \
//        7 2   0
//           \
//            3
const root = new TreeNode(4,
  new TreeNode(0, null, new TreeNode(7)),
  new TreeNode(1, new TreeNode(2, null, new TreeNode(3)), new TreeNode(0)));
const path = [];
console.log(findPath(root, path), path);
