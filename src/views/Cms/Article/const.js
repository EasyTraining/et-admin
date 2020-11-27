export const tableColumns = [
  {
    title: "文章标题",
    dataIndex: "title",
  },
  {
    title: "文章描述",
    dataIndex: "description",
  },
  {
    title: "已读数",
    dataIndex: "read_count",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
