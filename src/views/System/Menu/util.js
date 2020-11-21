import TreeNodeUtils from "tree-node-utils";

export const treeUtils = new TreeNodeUtils({
  childrenField: "children",
  keyField: "id",
});

export const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export const collectKeys = (arr = [], keys = []) => {
  arr.forEach(({ id, children }) => {
    if (id) {
      keys.push(id);
    }
    if (children) {
      collectKeys(children, keys);
    }
  });
  return keys;
};
