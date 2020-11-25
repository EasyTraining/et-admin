export const tableColumns = [
  {
    title: "题库名称",
    dataIndex: "name",
  },
  {
    title: "题库状态",
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "题库来源",
    dataIndex: "from",
  },
  {
    title: "题目数",
    dataIndex: "questions_count",
  },
  {
    title: "创建时间",
    dataIndex: "create_at",
    scopedSlots: { customRender: "create_at" },
  },
  {
    title: "更新时间",
    dataIndex: "update_at",
    scopedSlots: { customRender: "update_at" },
  },
  {
    title: "操作",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];

export const modalRules = {
  name: [{ required: true, message: "请填写类型名称" }],
};
