export const tableColumns = [
  {
    title: "部门名称",
    dataIndex: "name",
  },
  {
    title: "用户数",
    dataIndex: "user_count",
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
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
