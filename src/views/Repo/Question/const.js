export const tableColumns = [
  {
    title: "题号",
    width: 80,
    scopedSlots: { customRender: "index" },
  },
  {
    title: "题型",
    width: 100,
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
  },
  {
    title: "难度",
    width: 100,
    dataIndex: "level",
    scopedSlots: { customRender: "level" },
  },
  {
    title: "题目",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "操作",
    width: 150,
    scopedSlots: { customRender: "action" },
  },
];

export const formRules = {
  name: [{ required: true, message: "请填写题目" }],
  type: [{ required: true, message: "请选择题目类型" }],
  options: [{ required: true, message: "请填写题目选项" }],
  real_answer: [{ required: true, message: "请选择答案" }],
};

const defaultOptions = [
  { code: "", name: "" },
  { code: "", name: "" },
  { code: "", name: "" },
  { code: "", name: "" },
];

export const optionsMap = {
  RADIO: defaultOptions,
  CHECKBOX: defaultOptions,
  BOOLEAN: [],
  BLANK: [],
  SORT: defaultOptions,
  ANSWER: [],
  ESSAY_QUESTION: [],
  CALC: [],
};

export const answerMap = {
  RADIO: "",
  CHECKBOX: [],
  BOOLEAN: "1",
  BLANK: "",
  SORT: "",
  ANSWER: "",
  ESSAY_QUESTION: "",
  CALC: "",
};
