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

export const formRules = {
  account: [{ required: true, message: "必填项" }],
  password: [{ required: true, message: "必填项" }],

  name: [{ required: true, message: "必填项" }],
  org_id: [{ required: true, message: "必填项" }],
  phone: [{ required: true, message: "必填项" }],
  work_code: [{ required: true, message: "必填项" }],
  position: [{ required: true, message: "必填项" }],
};
