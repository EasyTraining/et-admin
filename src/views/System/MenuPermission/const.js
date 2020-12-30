export const tableColumns = [
  {
    title: "部门名称",
    width: 400,
    dataIndex: "name",
  },
  {
    title: "成员数",
    dataIndex: "employee_count",
  },
  {
    title: "部门备注",
    dataIndex: "remark",
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
