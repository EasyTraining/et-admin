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

    <a-table
      v-if="!loading"
      size="small"
      row-key="id"
      default-expand-all-rows
      :columns="tableColumns"
      :data-source="tableData"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 1100 }"
    >
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="onEdit(record)">设置</a>
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
import { tableColumns } from "./const";
import UpdateModal from "./components/UpdateModal";

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
    search() {
      this.fetchTableData();
    },

    reset() {
      this.tableQuery = {
        name: "",
      };
      this.search();
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
