<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.work_code" style="width: 200px" placeholder="员工工号关键字" />
      </div>
      <div class="filter__item">
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="员工姓名关键字" />
      </div>
      <div class="filter__item">
        <a-input v-model="tableQuery.phone" style="width: 200px" placeholder="员工手机号码关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

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
  name: "EmployeeIndex",
  data() {
    return {
      mounting: false,
      loading: false,

      tableQuery: {
        name: "",
        phone: "",
        work_code: "",
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
        name: "",
        phone: "",
        work_code: "",
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
          url: "/hr/employee",
          params: { current, pageSize, ...this.tableQuery },
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
