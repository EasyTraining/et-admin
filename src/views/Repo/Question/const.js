export const tableColumns = [
  {
    title: "题干",
    width: 300,
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "题型",
    width: 50,
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
  },
  {
    title: "难度",
    width: 50,
    dataIndex: "level",
    scopedSlots: { customRender: "level" },
  },
  {
    title: "对应考点",
    width: 150,
    dataIndex: "points",
    scopedSlots: { customRender: "points" },
  },
  {
    title: "操作",
    width: 180,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];

export const formRules = {
  name: [{ required: true, message: "请填写试题" }],
  type: [{ required: true, message: "请选择试题类型" }],
  options: [{ required: true, message: "请填写试题选项" }],
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
