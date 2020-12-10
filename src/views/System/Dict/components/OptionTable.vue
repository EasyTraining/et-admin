<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="onAdd">创建选项</a-button>
    </p>

    <a-table row-key="uuid" :columns="tableColumns" :data-source="tableData" :pagination="false">
      <template slot="enable" slot-scope="text, record">
        <a-tag v-if="record.enable" color="#87d068">已启用</a-tag>
        <a-tag v-else>已停用</a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="onRemove(record)">删除</a>
      </template>
    </a-table>

    <update-modal
      :visible="visible"
      :initial-values="editedRecord"
      @cancel="closeModal"
      @ok="onModalOk"
    />
  </div>
</template>

<script>
import { _, attachUuid, removeUuid } from "@/utils";
import UpdateModal from "./UpdateModal";

const tableColumns = [
  {
    title: "排序",
    dataIndex: "sort",
    width: 100,
  },
  {
    title: "选项名",
    dataIndex: "key",
  },
  {
    title: "选项值",
    dataIndex: "value",
  },
  {
    title: "启用状态",
    dataIndex: "enable",
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "操作",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "OptionTable",
  props: ["dataSource"],
  components: { UpdateModal },
  data() {
    return {
      tableColumns,
      tableData: [],

      visible: false,
      editedRecord: null,
    };
  },
  watch: {
    dataSource(newVal) {
      this.tableData = attachUuid(_.cloneDeep(newVal));
    },
  },
  mounted() {
    if (this.dataSource) {
      this.tableData = attachUuid(_.cloneDeep(this.dataSource));
    }
  },
  methods: {
    onSort() {
      this.tableData = this.tableData.sort((a, b) => a.sort - b.sort);
    },

    onAdd() {
      this.visible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.visible = true;
    },

    onRemove(record) {
      this.tableData = this.tableData.filter((item) => item.uuid !== record.uuid);
      this.onSort();
      this.emitChange();
    },

    closeModal() {
      this.visible = false;
      this.editedRecord = null;
    },

    onModalOk(record) {
      const uuids = this.tableData.map((item) => item.uuid);
      if (uuids.includes(record.uuid)) {
        this.tableData = this.tableData.map((item) => {
          if (item.uuid === record.uuid) {
            item = record;
          }
          return item;
        });
      } else {
        this.tableData.push(record);
      }
      this.onSort();
      this.emitChange();
    },

    emitChange() {
      const options = removeUuid(_.cloneDeep(this.tableData)).map((item) => {
        if (item.id === "") delete item.id;
        return item;
      });
      this.$emit("change", options);
    },
  },
};
</script>
