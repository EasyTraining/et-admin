export const tableColumns = [
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
    scopedSlots: { customRender: "action" },
  },
];
