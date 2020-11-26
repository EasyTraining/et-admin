<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="onAdd">新增部门</a-button>
    </p>

    <a-card :loading="mounting">
      <a-table
        :columns="tableColumns"
        row-key="_id"
        :data-source="tableData"
        :loading="loading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="已启用"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
        </template>
        <template slot="update_at" slot-scope="text, record">
          <span>{{ record.update_at | date }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="onRemove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <update-modal :visible="visible" :initial-values="editedRecord" @cancel="closeModal" @ok="onModalOk" />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import UpdateModal from "./components/UpdateModal";

export default {
  name: "OrgIndex",
  components: { UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      tableColumns,
      tableData: [],
      tablePager: {
        current: 1,
        pageSize: 30,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
      },

      visible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchTableData();
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    onAdd() {
      this.visible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.visible = true;
    },

    async onRemove({ _id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/system/org/${_id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/system/org" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const { total, data } = res.data;
        this.tableData = data;
        this.tablePager.total = total;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async switchStatus({ _id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "PUT", url: `/system/org/${_id}/enable`, data: { enable } });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.visible = false;
      this.editedRecord = null;
    },

    async onModalOk() {
      await this.fetchTableData();
    },
  },
};
</script>
