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
    title: "更新人",
    width: 120,
    dataIndex: "updated_name",
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 200,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
