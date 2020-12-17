export const tableColumns = [
  {
    title: "题库名称",
    width: 200,
    dataIndex: "name",
  },
  {
    title: "题量",
    width: 80,
    dataIndex: "count.TOTAL",
  },
  {
    title: "单选",
    width: 80,
    dataIndex: "count.RADIO",
  },
  {
    title: "多选",
    width: 80,
    dataIndex: "count.CHECKBOX",
  },
  {
    title: "判断",
    width: 80,
    dataIndex: "count.BOOLEAN",
  },
  {
    title: "填空",
    width: 80,
    dataIndex: "count.BLANK",
  },
  {
    title: "排序",
    width: 80,
    dataIndex: "count.SORT",
  },
  {
    title: "简答",
    width: 80,
    dataIndex: "count.ANSWER",
  },
  {
    title: "创建人",
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
    width: 200,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];

export const modalRules = {
  name: [{ required: true, message: "请填写类型名称" }],
};
