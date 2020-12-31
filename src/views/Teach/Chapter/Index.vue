<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="章节名称关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="loading" type="primary" @click="search">查询</a-button>
        <a-button :loading="loading" @click="reset">重置</a-button>
      </div>
    </div>

    <a-card size="small" title="课程信息">
      <a-spin :spinning="mounting">
        <a-descriptions>
          <a-descriptions-item label="班级名称">{{ courseInfo.name }}</a-descriptions-item>
          <a-descriptions-item label="班主任">{{ courseInfo.leader_id }}</a-descriptions-item>
        </a-descriptions>
      </a-spin>
    </a-card>

    <a-card size="small" title="章节管理">
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
        :scroll="{ x: 1100 }"
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
    </a-card>

    <update-modal
      :visible="updateModalVisible"
      :course-id="tableQuery.course_id"
      :initial-values="currentRecord"
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

      courseInfo: {},
      klassList: [],

      tableQuery: {
        course_id: "",
        name: "",
      },
      tableColumns,
      tableData: [],

      updateModalVisible: false,
      currentRecord: null,
    };
  },
  async mounted() {
    this.tableQuery.course_id = this.$route.params.courseId;
    await this.fetchTableData();
  },
  methods: {
    search() {
      this.fetchTableData();
    },

    reset() {
      this.tableQuery.name = "";
      this.search();
    },

    onAdd() {
      this.updateModalVisible = true;
    },

    onEdit(record) {
      this.currentRecord = record;
      this.updateModalVisible = true;
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/teach/chapter",
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

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/teach/chapter/${id}` });
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

    closeUpdateModal() {
      this.updateModalVisible = false;
      this.currentRecord = null;
    },

    async onUpdateModalOk() {
      await this.fetchTableData();
    },
  },
};
</script>
