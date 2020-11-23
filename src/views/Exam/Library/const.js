export const tableColumns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "来源",
    dataIndex: "from",
  },
  {
    title: "题目数",
    dataIndex: "questions_count",
  },
  {
    title: "创建时间",
    dataIndex: "create_at",
  },
  {
    title: "更新时间",
    dataIndex: "update_at",
  },
  {
    title: "操作",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];

export const formRules = {
  name: [{ required: true, message: "请填写类型名称" }],
};
