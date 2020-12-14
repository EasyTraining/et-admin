export const tableColumns = [
  {
    title: "试卷名称",
    dataIndex: "name",
  },
  {
    title: "题目数",
    width: 200,
    dataIndex: "count",
    scopedSlots: { customRender: "count" },
  },
  {
    title: "试卷备注",
    dataIndex: "remark",
  },
  {
    title: "试卷状态",
    width: 120,
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
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
    scopedSlots: { customRender: "name" },
  },
  {
    title: "分数",
    dataIndex: "grade",
    width: 100,
    scopedSlots: { customRender: "grade" },
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
    title: "操作",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];
