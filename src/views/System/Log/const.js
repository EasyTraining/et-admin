export const tableColumns = [
  {
    title: "用户名称",
    dataIndex: "user_name",
  },
  {
    title: "IP",
    dataIndex: "ip",
  },
  {
    title: "浏览器",
    dataIndex: "browser",
    scopedSlots: { customRender: "browser" },
  },
  {
    title: "登录时间",
    width: 190,
    dataIndex: "created_at",
  },
];
