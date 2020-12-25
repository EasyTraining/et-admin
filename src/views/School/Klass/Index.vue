<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="班级名称关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <p>
      <a-button type="primary" icon="plus" @click="onAdd">添加班级</a-button>
    </p>

    <a-table
      size="small"
      row-key="id"
      :columns="tableColumns"
      :data-source="tableData"
      :loading="loading"
      :pagination="tablePager"
      @change="onTableChange"
    >
      <template slot="action" slot-scope="text, record">
        <router-link :to="'/school/student?klass_id=' + record.id">学员管理</router-link>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
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
  name: "SchoolKlassIndex",
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
      };
      this.search();
    },

    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    onAdd() {
      this.updateModalVisible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.updateModalVisible = true;
    },

    onInvite(record) {
      this.$confirm({
        title: "是否继续?",
        content: "激活码一天内有效",
        onOk: async () => {
          try {
            const res = await this.$http({
              method: "POST",
              url: "/school/klass_util/gen_invite_code",
              data: {
                klass_id: record.id,
              },
            });
            if (res.code !== 200) {
              this.$message.error(res.message);
              return;
            }
            this.$message.success("操作成功");
            await this.fetchTableData();
          } catch (e) {
            this.$message.error(e.message);
          }
        },
        onCancel: () => {},
      });
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({
          method: "GET",
          url: "/school/klass",
          params: {
            current,
            pageSize,
            ...this.tableQuery,
          },
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

    showTreeModal() {
      this.treeModalVisible = true;
    },

    closeTreeModal() {
      this.treeModalVisible = false;
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
