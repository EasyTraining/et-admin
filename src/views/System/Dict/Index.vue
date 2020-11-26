<template>
  <div>
    <p>
      <router-link to="/system/dict/add">
        <a-button type="primary" icon="plus">新增字典</a-button>
      </router-link>
    </p>

    <a-card :loading="mounting">
      <a-table
        :columns="tableColumns"
        row-key="_id"
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
        <template slot="update_at" slot-scope="text, record">
          <span>{{ record.update_at | date }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <router-link :to="'/system/dict/edit/' + record._id">编辑</router-link>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const tableColumns = [
  {
    title: "字典编码",
    width: 150,
    dataIndex: "code",
  },
  {
    title: "字典名称",
    width: 100,
    dataIndex: "name",
  },
  {
    title: "字典描述",
    dataIndex: "desc",
  },
  {
    title: "启用状态",
    width: 120,
    scopedSlots: { customRender: "enable" },
  },
  {
    title: "更新时间",
    width: 180,
    dataIndex: "update_at",
    scopedSlots: { customRender: "update_at" },
  },
  {
    title: "操作",
    width: 180,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "OrgIndex",
  data() {
    return {
      mounting: false,
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
        const res = await this.$http({ method: "GET", url: "/system/dict" });
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

    async remove({ _id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/system/dict/${_id}` });
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

    async switchStatus({ _id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "PUT", url: `/system/dict/${_id}/enable`, data: { enable } });
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
  },
};
</script>
