export const tableColumns = [
  {
    title: "姓名",
    width: 120,
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
    title: "更新人",
    width: 120,
    dataIndex: "updated_name",
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
];
