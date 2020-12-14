<template>
  <div>
    <a-tabs v-model="curKlassId" @change="onKlassChange">
      <a-tab-pane v-for="klass in klassList" :key="klass.id" :tab="klass.name" />
    </a-tabs>

    <p style="margin-top: 15px">
      <a-button type="primary" icon="plus" @click="onAdd">创建章节</a-button>
      <a-button icon="bars" @click="showTreeModal">查看树形结构</a-button>
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
          <a href="javascript:;">课件管理</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="onRemove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <tree-modal
      v-if="curKlassId"
      :visible="treeModalVisible"
      :klass-id="curKlassId"
      @cancel="closeTreeModal"
    />
    <update-modal
      v-if="curKlassId"
      :visible="updateModalVisible"
      :klass-id="curKlassId"
      :initial-values="editedRecord"
      @cancel="closeUpdateModal"
      @ok="onUpdateModalOk"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import UpdateModal from "./components/UpdateModal";
import TreeModal from "./components/TreeModal";

export default {
  name: "CourseIndex",
  components: { UpdateModal, TreeModal },
  data() {
    return {
      mounting: false,
      loading: false,

      curKlassId: undefined,
      klassList: [],

      tableColumns,
      tableData: [],

      updateModalVisible: false,
      editedRecord: null,

      treeModalVisible: false,
    };
  },
  async mounted() {
    await this.fetchKlassList();
  },
  methods: {
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

    async onRemove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/teach/course/${id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: `/school/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.klassList = res.data || [];
        if (this.klassList.length) {
          this.curKlassId = this.klassList[0].id;
          await this.fetchTableData();
        }
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/teach/course",
          params: { klass_id: this.curKlassId },
        });
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

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/teach/course/${id}/enable`,
          data: { enable },
        });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
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

    showTreeModal() {
      this.treeModalVisible = true;
    },

    closeTreeModal() {
      this.treeModalVisible = false;
    },
  },
};
</script>
