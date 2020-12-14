export const tableColumns = [
  {
    title: "题库名称",
    dataIndex: "name",
  },
  {
    title: "题库状态",
    width: 120,
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "题库来源",
    dataIndex: "from",
  },
  {
    title: "题目数",
    width: 100,
    dataIndex: "questions_count",
  },
  {
    title: "更新时间",
    width: 190,
    dataIndex: "updated_at",
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
