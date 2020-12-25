export const tableColumns = [
  {
    title: "用户昵称",
    dataIndex: "name",
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
    title: "手机号码",
    dataIndex: "phone",
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
