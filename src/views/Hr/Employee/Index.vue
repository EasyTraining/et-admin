<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="onAdd">创建用户</a-button>
    </p>

    <a-table
      size="small"
      :columns="tableColumns"
      row-key="id"
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
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="onReset(record)">重置密码</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="onRemove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <update-modal
      :visible="editModalVisible"
      :id="currentUserId"
      @refresh="fetchTableData"
      @cancel="closeEditModal"
    />
    <reset-modal
      :visible="resetModalVisible"
      :id="currentUserId"
      @refresh="fetchTableData"
      @cancel="closeResetModal"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import UpdateModal from "./components/UpdateModal";
import ResetModal from "./components/ResetModal";

export default {
  name: "SystemEmployeeIndex",
  components: { UpdateModal, ResetModal },
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

      currentUserId: "",
      resetModalVisible: false,
      editModalVisible: false,
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
      this.editModalVisible = true;
    },

    onEdit({ id }) {
      this.currentUserId = id;
      this.editModalVisible = true;
    },

    closeEditModal() {
      this.editModalVisible = false;
      this.editedRecord = null;
    },

    onReset({ id }) {
      this.currentUserId = id;
      this.resetModalVisible = true;
    },

    closeResetModal() {
      this.currentUserId = "";
      this.resetModalVisible = false;
    },

    async onRemove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/hr/employee/${id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/hr/employee" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        const { total, data } = res.data;
        this.tableData = data;
        this.tablePager.total = total;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/hr/employee/${id}/enable`,
          data: { enable },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        await this.fetchTableData();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async onModalOk() {
      await this.fetchTableData();
    },
  },
};
</script>
