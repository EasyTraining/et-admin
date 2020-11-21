export const tableColumns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "描述",
    dataIndex: "desc",
  },
  {
    title: "更新时间",
    dataIndex: "update_at",
  },
  {
    title: "操作",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];

export const modalRules = {
  parent: [{ required: true, message: "请选择父节点" }],
  menu: [{ required: true, message: "请选择菜单" }],
  name: [{ required: true, message: "请填写名称" }],
};
