export const tableColumns = [
  {
    title: "文件名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "扩展名",
    width: 120,
    dataIndex: "ext",
  },
  {
    title: "文件大小",
    width: 120,
    dataIndex: "size",
    scopedSlots: { customRender: "size" },
  },
  {
    title: "上传人",
    width: 120,
    dataIndex: "created_name",
  },
  {
    title: "上传时间",
    width: 190,
    dataIndex: "created_at",
  },
  {
    title: "操作",
    width: 120,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
