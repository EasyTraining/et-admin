export const deptTableColumns = [
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

export const employeeTableColumns = [
  {
    title: "工号",
    dataIndex: "work_code",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "职位",
    dataIndex: "position",
  },
  {
    title: "手机",
    dataIndex: "phone",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
]
