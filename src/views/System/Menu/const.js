export const tableColumns = [
  {
    title: "菜单名称",
    dataIndex: "title",
  },
  {
    title: "菜单编码",
    dataIndex: "name",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
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
