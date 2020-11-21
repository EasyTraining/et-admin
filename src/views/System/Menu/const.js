export const tableColumns = [
  {
    title: "名称",
    dataIndex: "title",
  },
  {
    title: "标识",
    dataIndex: "name",
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
  parent: [{ required: true, message: "请选择上级菜单" }],
  title: [{ required: true, message: "请填写名称" }],
  name: [{ required: true, message: "请填写标识" }],
};
