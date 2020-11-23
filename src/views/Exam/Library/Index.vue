<template>
  <div>
    <p>
      <router-link to="/exam/library/add">
        <a-button type="primary" icon="plus">添加题库</a-button>
      </router-link>
      <a-button style="margin-left: 15px" icon="import">导入题库</a-button>
    </p>

    <a-card>
      <a-table
        :columns="tableColumns"
        row-key="_id"
        :data-source="tableData"
        :loading="loading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="action" slot-scope="text, record">
          <router-link :to="'/exam/library/detail/' + record._id">查看</router-link>
          <a-divider type="vertical" />
          <router-link :to="'/exam/library/edit/' + record._id">编辑</router-link>
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
import { tableColumns } from "./const";

export default {
  name: "LibraryIndex",
  data() {
    return {
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
  mounted() {
    this.fetchTableData();
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
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({ method: "GET", url: "/paperLibrary", params: { current, pageSize } });
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
        const res = await this.$http({ method: "DELETE", url: `/paperLibrary/${_id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
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
