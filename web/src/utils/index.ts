/** @description: 根据id查找树节点 */

type TreeNode = {
  children?: TreeNode[];
  id: string;
  name: string;
};
export function findNodeById(tree: TreeNode[], id: string | number): TreeNode | null {
  for (const node of tree) {
    if (node.id === id) {
      return node; // 找到目标节点
    }
    if (node.children) {
      const result = findNodeById(node.children, id); // 递归查找子节点
      if (result) {
        return result;
      }
    }
  }
  return null; // 未找到
}
