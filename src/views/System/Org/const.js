export const tableColumns = [
  {
    title: "部门名称",
    dataIndex: "name",
  },
  {
    title: "部门描述",
    dataIndex: "desc",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "update_at",
    scopedSlots: { customRender: "update_at" },
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
