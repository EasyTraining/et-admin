<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="菜单编码关键字" />
      </div>
      <div class="filter__item">
        <a-input v-model="tableQuery.title" style="width: 200px" placeholder="菜单名称关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <p>
      <a-button type="primary" icon="plus" @click="onAdd">添加菜单</a-button>
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
      <template slot="enable" slot-scope="text, record">
        <a-switch
          v-model="record.enable"
          checked-children="已启用"
          un-checked-children="已停用"
          @change="switchStatus(record)"
        />
      </template>
      <template slot="action" slot-scope="text, record">
        <template v-if="record.name !== 'ROOT'">
          <a href="javascript:;" @click="onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>

    <update-modal
      :visible="visible"
      :initial-values="editedRecord"
      @cancel="closeModal"
      @ok="onModalOk"
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

      tableQuery: {
        name: "",
        title: "",
      },
      tableColumns,
      tableData: [],

      visible: false,
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
        title: "",
      };
      this.search();
    },

    onAdd() {
      this.visible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.visible = true;
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/system/menu/${id}` });
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

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/system/menu",
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
          url: `/system/menu/${id}/enable`,
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

    closeModal() {
      this.visible = false;
      this.editedRecord = null;
    },

    async onModalOk() {
      await this.fetchTableData();
    },
  },
};
</script>
