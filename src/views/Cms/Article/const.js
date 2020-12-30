export const tableColumns = [
  {
    title: "文章标题",
    dataIndex: "title",
  },
  {
    title: "已读数",
    width: 100,
    dataIndex: "read_count",
  },
  {
    title: "文章备注",
    dataIndex: "desc",
  },
  {
    title: "启用状态",
    width: 120,
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
  {
    title: "操作",
    width: 180,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];

export const formRules = {
  category_id: [{ required: true, message: "必填项" }],
  title: [{ required: true, message: "必填项" }],
  sub_title: [{ required: true, message: "必填项" }],
  enable: [{ required: true, message: "必填项" }],
  sort: [{ required: true, message: "必填项" }],
  author: [{ required: true, message: "必填项" }],
  content: [{ required: true, message: "必填项" }],
};
