<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="onAdd">新增班级</a-button>
    </p>

    <a-card :loading="mounting" :body-style="{ padding: 0 }">
      <a-table
        :columns="tableColumns"
        row-key="id"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      >
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;">学员管理</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="onEdit(record)">编辑</a>
        </template>
      </a-table>
    </a-card>

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

export default {
  name: "OrgIndex",
  components: { UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      tableColumns,
      tableData: [],

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

    onEdit(record) {
      this.editedRecord = record;
      this.updateModalVisible = true;
    },

    onInvite(record) {
      this.$confirm({
        title: "是否继续?",
        content: "激活码一天内有效",
        onOk: async () => {
          try {
            const res = await this.$http({
              method: "POST",
              url: "/school/klass_util/gen_invite_code",
              data: {
                klass_id: record.id,
              },
            });
            if (res.code !== 200) {
              this.$message.error(res.message);
              return;
            }
            this.$message.success("操作成功");
            await this.fetchTableData();
          } catch (e) {
            this.$message.error(e.message);
          }
        },
        onCancel: () => {},
      });
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/school/klass" });
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
