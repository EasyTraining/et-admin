<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="onAdd">创建部门</a-button>
      <!-- <a-button icon="bars" @click="showTreeModal">查看树形结构</a-button> -->
    </p>

    <a-card :loading="mounting" :body-style="{ padding: 0 }">
      <a-table
        :columns="tableColumns"
        row-key="id"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      >
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="已启用"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
        </template>
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="已启用"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
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

    <tree-modal :visible="treeModalVisible" @cancel="closeTreeModal" />
    <update-modal
      :visible="updateModalVisible"
      :initial-values="editedRecord"
      @cancel="closeUpdateModal"
      @ok="onUpdateModalOk"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import UpdateModal from "./components/UpdateModal";
import TreeModal from "./components/TreeModal";

export default {
  name: "OrgIndex",
  components: { TreeModal, UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      tableColumns,
      tableData: [],

      treeModalVisible: false,
      updateModalVisible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchTableData();
  },
  methods: {
    onAdd() {
      this.updateModalVisible = true;
    },

    async onEdit({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/system/org/${id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.editedRecord = res.data;
        this.updateModalVisible = true;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async onRemove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/system/org/${id}` });
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
        this.tableData = res.data;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/system/org/${id}/enable`,
          data: { enable },
        });
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

    showTreeModal() {
      this.treeModalVisible = true;
    },

    closeTreeModal() {
      this.treeModalVisible = false;
    },

    closeUpdateModal() {
      this.updateModalVisible = false;
      this.editedRecord = null;
    },

    async onUpdateModalOk() {
      await this.fetchTableData();
    },
  },
};
</script>
