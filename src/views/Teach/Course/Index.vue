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
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="课程名称关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <p>
      <router-link :to="'/teach/course/add?klass_id=' + tableQuery.klass_id">
        <a-button type="primary" icon="plus">添加课程</a-button>
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
      <template slot="action" slot-scope="text, record">
        <comment-btn :target-id="record.id" type="COURSE" />
        <a-divider type="vertical" />
        <a href="javascript:;" @click="toChapterPage(record)">章节</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="toEditPage(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import CommentBtn from "@/components/CommentBtn";
import { tableColumns } from "./const";

export default {
  name: "CourseIndex",
  components: { CommentBtn },
  data() {
    return {
      mounting: false,
      loading: false,

      klassList: [],

      tableQuery: {
        klass_id: undefined,
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

    showCommentDialog() {},

    toChapterPage({ id }) {
      const { klass_id } = this.tableQuery;
      this.$router.push(`/teach/${id}/chapter?klass_id=${klass_id}`);
    },

    toEditPage({ id }) {
      const { klass_id } = this.tableQuery;
      this.$router.push(`/teach/course/edit/${id}?klass_id=${klass_id}`);
    },

    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
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
          await this.search();
        }
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({
          method: "GET",
          url: "/teach/course",
          params: {
            current,
            pageSize,
            ...this.tableQuery,
          },
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
  },
};
</script>
