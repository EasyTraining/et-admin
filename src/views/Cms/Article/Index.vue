<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.title" style="width: 200px" placeholder="文章标题关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <p>
      <router-link to="/cms/article/add">
        <a-button type="primary" icon="plus">添加文章</a-button>
      </router-link>
    </p>

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
      <template slot="enable" slot-scope="text, record">
        <a-switch
          v-model="record.enable"
          checked-children="已启用"
          un-checked-children="已停用"
          @change="switchStatus(record)"
        />
      </template>
      <template slot="action" slot-scope="text, record">
        <router-link :to="'/cms/article/detail/' + record.id">查看</router-link>
        <a-divider type="vertical" />
        <router-link :to="'/cms/article/edit/' + record.id">编辑</router-link>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "CmsArticleIndex",
  data() {
    return {
      mounting: false,
      loading: false,

      tableQuery: {
        title: "",
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
        title: "",
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
          url: "/cms/article",
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

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "DELETE",
          url: `/cms/article/${id}`,
        });
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

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/cms/article/${id}/enable`,
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
  },
};
</script>
