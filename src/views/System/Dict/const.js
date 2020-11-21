export const tableColumns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "描述",
    dataIndex: "desc",
  },
  {
    title: "更新时间",
    dataIndex: "update_at",
  },
  {
    title: "状态",
    scopedSlots: { customRender: "status" },
  },
];
