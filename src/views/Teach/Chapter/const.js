export const tableColumns = [
  {
    title: "章节名称",
    dataIndex: "name",
  },
  {
    title: "章节备注",
    dataIndex: "remark",
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];
