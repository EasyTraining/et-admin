export const tableColumns = [
  {
    title: "菜单名称",
    width: 220,
    dataIndex: "title",
  },
  {
    title: "菜单编码",
    dataIndex: "name",
  },
  {
    title: "更新人",
    width: 120,
    dataIndex: "updated_name",
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 150,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
