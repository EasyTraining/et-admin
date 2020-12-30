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

export const employeeTableColumns = [
  {
    title: "工号",
    dataIndex: "work_code",
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "手机号码",
    dataIndex: "phone",
  },
  {
    title: "部门",
    dataIndex: "org_name",
  },
  {
    title: "职位",
    dataIndex: "position",
  },
  {
    title: "入职时间",
    dataIndex: "join_date",
  },
  {
    title: "操作",
    width: 150,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
