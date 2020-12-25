<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-select v-model="tableQuery.klass_id" style="width: 200px" placeholder="请选择班级">
          <a-select-option v-for="klass in klassList" :key="klass.id" :value="klass.id">
            {{ klass.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter__item">
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="章节名称关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <p>
      <a-button type="primary" icon="plus" @click="onAdd">添加章节</a-button>
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
        <a href="javascript:;">课件管理</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <update-modal
      v-if="tableQuery.klass_id"
      :visible="updateModalVisible"
      :klass-id="tableQuery.klass_id"
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
  name: "CourseIndex",
  components: { UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      klassList: [],

      tableQuery: {
        klass_id: "",
        name: "",
      },
      tableColumns,
      tableData: [],

      updateModalVisible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchKlassList();
  },
  methods: {
    search() {
      this.fetchTableData();
    },

    reset() {
      this.tableQuery.name = "";
      this.search();
    },

    onKlassChange() {
      this.fetchTableData();
    },

    onAdd() {
      this.updateModalVisible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.updateModalVisible = true;
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/teach/course/${id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: `/school/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.klassList = res.data || [];
        if (this.klassList.length) {
          this.tableQuery.klass_id = this.klassList[0].id;
          await this.fetchTableData();
        }
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/teach/course",
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

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/teach/course/${id}/enable`,
          data: { enable },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        await this.fetchTableData();
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
