<template>
  <div>
    <a-card>
      <span>班级：</span>
      <a-select
        v-model="currentKlassId"
        show-search
        placeholder="请选择可见班级"
        style="width: 200px"
        @change="onKlassChange"
      >
        <a-select-option v-for="klass in klassList" :key="klass.id" :value="klass.id">
          {{ klass.name }}
        </a-select-option>
      </a-select>
    </a-card>

    <p style="margin-top: 15px">
      <a-button type="primary" icon="plus" @click="onAdd">新增章节</a-button>
    </p>

    <a-card :loading="mounting" :body-style="{ padding: 0 }">
      <a-table
        :columns="tableColumns"
        row-key="id"
        :data-source="tableData"
        :loading="loading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="已启用"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
        </template>
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

    <update-modal
      :visible="updateModalVisible"
      :klass-id="currentKlassId"
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
  name: "OrgIndex",
  components: { UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      currentKlassId: "",
      klassList: [],

      tableColumns,
      tableData: [],
      tablePager: {
        current: 1,
        pageSize: 30,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
      },

      updateModalVisible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchKlassList();
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    onKlassChange() {
      this.fetchKlassList();
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
        const res = await this.$http({ method: "GET", url: `/system/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.klassList = res.data || [];
        if (this.klassList.length) {
          this.currentKlassId = this.klassList[0].id;
          await this.fetchTableData();
        }
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({
          method: "GET",
          url: "/teach/course",
          params: { current, pageSize, klass_id: this.currentKlassId },
        });
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
  },
};
</script>
