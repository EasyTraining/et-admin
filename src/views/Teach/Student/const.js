export const tableColumns = [
  {
    title: "学号",
    dataIndex: "code",
    width: 100,
  },
  {
    title: "学员姓名",
    dataIndex: "name",
  },
  {
    title: "手机号码",
    dataIndex: "phone",
  },
  {
    title: "最近登录",
    dataIndex: "last_login",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
