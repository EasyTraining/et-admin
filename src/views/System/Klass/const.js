export const tableColumns = [
  {
    title: "班级名称",
    dataIndex: "name",
  },
  {
    title: "班主任",
    dataIndex: "leader_name",
  },
  {
    title: "班级描述",
    dataIndex: "description",
  },
  {
    title: "邀请码",
    dataIndex: "invite_code",
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
