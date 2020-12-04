export const tableColumns = [
  {
    title: "学号",
    dataIndex: "code",
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
    title: "所属班级",
    dataIndex: "klass_id",
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
    width: 220,
    scopedSlots: { customRender: "action" },
  },
];

export const formRules = {};
