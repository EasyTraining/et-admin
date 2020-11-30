export const tableColumns = [
  {
    title: "序号",
    dataIndex: "sort",
    width: 100,
  },
  {
    title: "章节名称",
    dataIndex: "name",
  },
  {
    title: "教学目标",
    dataIndex: "target",
  },
  {
    title: "章节备注",
    dataIndex: "remark",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];
