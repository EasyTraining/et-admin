export const tableColumns = [
  {
    title: "菜单编码",
    dataIndex: "name",
  },
  {
    title: "菜单名称",
    dataIndex: "title",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 190,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
