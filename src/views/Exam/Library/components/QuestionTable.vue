<template>
  <div>
    <p>
      <a-button type="link" icon="plus" style="padding: 0" @click="showAddModal">添加题目</a-button>
    </p>
    <a-table size="small" :columns="tableColumns" :data-source="dataSource">
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;">删除</a>
      </template>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        {{ record.description }}
      </p>
    </a-table>

    <question-modal :visible="modalVisible" @cancel="closeModal" @ok="onModalOk" />
  </div>
</template>

<script>
import QuestionModal from "./QuestionModal";

const tableColumns = [
  { title: "名称", dataIndex: "name" },
  { title: "类型", dataIndex: "type" },
  { title: "难易程度", dataIndex: "level" },
  { title: "对应章节", dataIndex: "from_chapter" },
  { title: "操作", scopedSlots: { customRender: "action" } },
];

export default {
  name: "QuestionTable",
  components: { QuestionModal },
  props: ["dataSource"],
  data() {
    return {
      tableColumns,

      modalVisible: false,
    };
  },
  methods: {
    showAddModal() {
      this.modalVisible = true;
    },

    closeModal() {
      this.modalVisible = false;
    },

    onModalOk() {},
  },
};
</script>
