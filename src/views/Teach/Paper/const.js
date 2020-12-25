export const tableColumns = [
  {
    title: "试卷名称",
    width: 200,
    dataIndex: "name",
  },
  {
    title: "题量",
    width: 80,
    dataIndex: "count.TOTAL",
  },
  {
    title: "简单",
    width: 80,
    dataIndex: "count.EASY",
  },
  {
    title: "中等",
    width: 80,
    dataIndex: "count.NORMAL",
  },
  {
    title: "困难",
    width: 80,
    dataIndex: "count.HARD",
  },
  {
    title: "试卷状态",
    width: 120,
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "添加人",
    width: 100,
    dataIndex: "created_name",
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
    title: "试题类型",
    width: 100,
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
  },
  {
    title: "试题",
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
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
