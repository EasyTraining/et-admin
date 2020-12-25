<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.user_name" style="width: 200px" placeholder="部门名称关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <p>
      <a-button type="primary" icon="plus" @click="onAdd">添加部门</a-button>
    </p>

    <a-table
      v-if="!loading"
      size="small"
      row-key="id"
      default-expand-all-rows
      :columns="tableColumns"
      :data-source="tableData"
      :loading="loading"
      :pagination="false"
    >
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <update-modal
      :visible="updateModalVisible"
      :initial-values="editedRecord"
      @cancel="closeUpdateModal"
      @ok="onUpdateModalOk"
    />
  </div>
</template>

<script>
import { deptTableColumns } from "../const";
import UpdateModal from "./UpdateModal";

export default {
  name: "Dept",
  components: { UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      tableQuery: {
        name: "",
      },
      tableColumns: deptTableColumns,
      tableData: [],

      updateModalVisible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchTableData();
  },
  methods: {
    search() {
      this.fetchTableData();
    },

    reset() {
      this.tableQuery = {
        name: "",
      };
      this.search();
    },

    onAdd() {
      this.updateModalVisible = true;
    },

    async onEdit({ id }) {
      try {
        const res = await this.$http({ method: "GET", url: `/hr/org/${id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.editedRecord = res.data;
        this.updateModalVisible = true;
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async remove({ id }) {
      try {
        const res = await this.$http({ method: "DELETE", url: `/hr/org/${id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/hr/org",
          params: this.tableQuery,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.tableData = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
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
