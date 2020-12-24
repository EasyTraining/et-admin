export const deptTableColumns = [
  {
    title: "部门名称",
    dataIndex: "name",
  },
  {
    title: "成员数",
    dataIndex: "employee_count",
  },
  {
    title: "可见菜单数",
    dataIndex: "menu_names_count",
  },
  {
    title: "部门备注",
    dataIndex: "remark",
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
