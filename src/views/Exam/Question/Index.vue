<template>
  <div>
    <p>
      <router-link :to="'/exam/library/' + info.id + '/questions/add'">
        <a-button type="primary" icon="plus">新增题目</a-button>
      </router-link>
    </p>

    <a-card :body-style="{ padding: 0 }">
      <a-table
        :columns="tableColumns"
        row-key="id"
        :data-source="info.questions"
        :loading="loading"
        :pagination="false"
      >
        <span slot="index" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="type" slot-scope="text, record, index">{{ record.type | questionTypeToLabel }}</span>
        <template slot="action" slot-scope="text, record">
          <router-link :to="'/exam/library/' + id + '/questions/edit/' + record.id">编辑</router-link>
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
  name: "QuestionIndex",
  data() {
    return {
      loading: false,
      id: "",
      info: {},

      tableColumns,
      tableData: [],
    };
  },
  async mounted() {
    const { libraryId } = this.$route.params;
    this.id = libraryId;
    await this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/exam/library/${this.id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.info = res.data;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/exam/library/${this.id}/question/${id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchDetail();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
