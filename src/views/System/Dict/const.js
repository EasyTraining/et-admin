export const tableColumns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "描述",
    dataIndex: "remark",
  },
  {
    title: "状态",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
  },
];

export const formRules = {
  code: [{ required: true, message: "请填写字典编码" }],
  name: [{ required: true, message: "请填写字典名称" }],
};