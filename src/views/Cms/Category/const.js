export const tableColumns = [
  {
    title: "分类名称",
    dataIndex: "name",
  },
  {
    title: "分类描述",
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
