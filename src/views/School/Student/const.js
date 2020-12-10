export const tableColumns = [
  {
    title: "姓名",
    width: 100,
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "手机号码",
    dataIndex: "phone",
  },
  {
    title: "所属班级",
    dataIndex: "klass_name",
  },
  {
    title: "紧急联系人",
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
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];

export const formRules = {
  name: [{ required: true, message: "必填项" }],
  klass_id: [{ required: true, message: "必填项" }],
  phone: [{ required: true, message: "必填项" }],
  email: [{ required: true, message: "必填项" }],
  id_card: [{ required: true, message: "必填项" }],

  account: [{ required: true, message: "必填项" }],
  password: [{ required: true, message: "必填项" }],

  sos_name: [{ required: true, message: "必填项" }],
  sos_phone: [{ required: true, message: "必填项" }],
};
