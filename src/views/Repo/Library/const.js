export const tableColumns = [
  {
    title: "题库名称",
    dataIndex: "name",
  },
  {
    title: "试题分布",
    dataIndex: "count",
    scopedSlots: { customRender: "count" },
  },
  {
    title: "创建人",
    width: 100,
    dataIndex: "f2",
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
