<template>
  <div>
    <a-card :body-style="{ padding: 0 }">
      <a-table
        :columns="tableColumns"
        row-key="id"
        :data-source="tableData"
        :loading="loading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="browser" slot-scope="text, record">
          {{ record.browser_name }} {{ record.browser_version }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "OrgIndex",
  data() {
    return {
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

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/log/login" });
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
  },
};
</script>
