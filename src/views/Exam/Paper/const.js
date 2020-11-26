export const tableColumns = [
  {
    title: "试卷名称",
    dataIndex: "name",
  },
  {
    title: "试卷状态",
    width: 120,
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "题目数",
    width: 100,
    dataIndex: "questions_count",
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "update_at",
    scopedSlots: { customRender: "update_at" },
  },
  {
    title: "操作",
    width: 220,
    scopedSlots: { customRender: "action" },
  },
];

export const modalRules = {
  name: [{ required: true, message: "请填写类型名称" }],
};

export const questionColumns = [
  {
    title: "题号",
    dataIndex: "sort",
    width: 100,
    scopedSlots: { customRender: "sort" },
  },
  {
    title: "题目类型",
    width: 100,
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
  },
  {
    title: "题目",
    dataIndex: "name",
  },
  {
    title: "难易程度",
    dataIndex: "level",
    width: 100,
    scopedSlots: { customRender: "level" },
  },
  {
    title: "章节",
    width: 100,
    dataIndex: "from_chapter",
  },
  {
    title: "所属题库",
    width: 150,
    dataIndex: "library_name",
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
]
