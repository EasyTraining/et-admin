export const tableColumns = [
  {
    title: "班级名称",
    width: 120,
    dataIndex: "name",
  },
  {
    title: "班主任",
    width: 120,
    dataIndex: "leader_name",
  },
  {
    title: "教师",
    width: 120,
    dataIndex: "teachers",
    scopedSlots: { customRender: "teachers" },
  },
  {
    title: "班级描述",
    width: 200,
    dataIndex: "description",
  },
  {
    title: "更新人",
    width: 120,
    dataIndex: "updated_name",
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "updated_at",
  },
  {
    title: "操作",
    width: 150,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
