<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.user_name" style="width: 200px" placeholder="用户名称关键字" />
      </div>
      <div class="filter__item">
        <a-input v-model="tableQuery.ip" style="width: 200px" placeholder="IP关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <a-table
      size="small"
      row-key="id"
      :columns="tableColumns"
      :data-source="tableData"
      :loading="loading"
      :pagination="tablePager"
      :scroll="{ x: 1100 }"
      @change="onTableChange"
    >
      <template slot="browser" slot-scope="text, record">
        {{ record.browser_name }} {{ record.browser_version }}
      </template>
    </a-table>
  </div>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "SystemLogIndex",
  data() {
    return {
      loading: false,

      tableQuery: {
        user_name: "",
        ip: "",
      },
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
    search() {
      this.tablePager.current = 1;
      this.fetchTableData();
    },

    reset() {
      this.tableQuery = {
        user_name: "",
        ip: "",
      };
      this.search();
    },

    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({
          method: "GET",
          url: "/log/login",
          params: {
            current,
            pageSize,
            ...this.tableQuery,
          },
        });
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
