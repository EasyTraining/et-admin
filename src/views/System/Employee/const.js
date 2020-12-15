export const tableColumns = [
  {
    title: "用户昵称",
    dataIndex: "nick_name",
  },
  {
    title: "所属部门",
    dataIndex: "org_name",
  },
  {
    title: "手机号码",
    dataIndex: "phone",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 190,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];
