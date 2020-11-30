<template>
  <div>
    <a-card>
      <a-tree-select
        v-model="query.course_id"
        :tree-data="courseTreeData"
        :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        allow-clear
        tree-default-expand-all
        style="width: 200px"
        placeholder="请选择所属课程"
      />
      <a-input v-model="query.name" style="width: 200px; margin-left: 15px;" placeholder="名称关键字" />
      <a-input v-model="query.target" style="width: 200px; margin-left: 15px;" placeholder="教学目标关键字" />
      <a-input v-model="query.remark" style="width: 200px; margin-left: 15px;" placeholder="备注关键字" />
      <a-button style="margin-left: 15px" type="primary" icon="search" @click="search">搜索章节</a-button>
      <a-button @click="reset">重置</a-button>
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

      query: {
        name: "",
        target: "",
        remark: "",
        course_id: undefined,
      },
      courseTreeData: [],

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
    await this.fetchCourseTreeData();
    await this.fetchTableData();
  },
  methods: {
    search() {

    },

    reset() {

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

    async onRemove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/teach/chapter/${id}` });
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

    async fetchCourseTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/teach/search/course/tree" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.courseTreeData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/teach/chapter" });
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
        const res = await this.$http({ method: "PUT", url: `/teach/chapter/${id}/enable`, data: { enable } });
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
