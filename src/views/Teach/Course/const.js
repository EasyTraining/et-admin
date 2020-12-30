export const tableColumns = [
  {
    title: "课程名称",
    dataIndex: "name",
  },
  {
    title: "课程简介",
    dataIndex: "desc",
  },
  {
    title: "章节数",
    dataIndex: "chapter_count",
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
    width: 180,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
