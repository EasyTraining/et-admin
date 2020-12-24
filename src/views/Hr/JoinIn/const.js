export const tableColumns = [
  {
    title: "姓名",
    width: 120,
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "手机号码",
    width: 150,
    dataIndex: "phone",
  },
  {
    title: "所属班级",
    width: 150,
    dataIndex: "klass_name",
  },
  {
    title: "紧急联系人",
    width: 200,
    dataIndex: "sos_name",
    scopedSlots: { customRender: "sos_name" },
  },
  {
    title: "启用状态",
    width: 120,
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "上次登录",
    width: 190,
    dataIndex: "last_login_at",
  },
  {
    title: "操作",
    width: 200,
    fixed: "right",
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
