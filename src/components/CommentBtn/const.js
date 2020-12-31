export const tableColumns = [
  {
    title: "评论人",
    width: 100,
    dataIndex: "created_name",
    scopedSlots: { customRender: "created_name" },
  },
  {
    title: "评论内容",
    dataIndex: "content",
  },
  {
    title: "状态",
    width: 150,
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "评论时间",
    width: 190,
    dataIndex: "created_at",
  },
  {
    title: "操作",
    width: 120,
    scopedSlots: { customRender: "action" },
  },
];
