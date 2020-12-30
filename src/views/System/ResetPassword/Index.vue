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
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="showResetModal(record)">重置密码</a>
      </template>
    </a-table>

    <reset-modal
      :id="currentId"
      :visible="resetVisible"
      @cancel="closeResetModal"
      @refresh="fetchTableData"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import ResetModal from "./components/ResetModal";

export default {
  name: "ResetPassword",
  components: { ResetModal },
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

      resetVisible: false,
      currentId: null,
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

    showResetModal({ id }) {
      this.currentId = id;
      this.resetVisible = true;
    },

    closeResetModal() {
      this.currentId = "";
      this.resetVisible = false;
    },
  },
};
</script>
