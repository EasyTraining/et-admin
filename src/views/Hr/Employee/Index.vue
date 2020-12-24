<template>
  <div>
    <p>
      <router-link to="/hr/join-in">
        <a-button type="primary" icon="plus">办理入职</a-button>
      </router-link>
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
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "SystemEmployeeIndex",
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

    onReset({ id }) {
      this.currentUserId = id;
      this.resetModalVisible = true;
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
  },
};
</script>
