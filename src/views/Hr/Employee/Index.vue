<template>
  <div>
    <p>
      <router-link to="/hr/employee/add">
        <a-button type="primary" icon="plus">添加员工</a-button>
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
        <router-link :to="'/hr/employee/detail/' + record.id">查看</router-link>
        <a-divider type="vertical" />
        <router-link :to="'/hr/employee/edit/' + record.id">编辑</router-link>
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
