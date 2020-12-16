<template>
  <div>
    <p>
      <router-link :to="'/repo/library/' + info.id + '/questions/add'">
        <a-button type="primary" icon="plus">创建试题</a-button>
      </router-link>
    </p>

    <a-table
      size="small"
      :columns="tableColumns"
      row-key="id"
      :data-source="info.questions"
      :loading="loading"
      :pagination="false"
    >
      <div slot="index" slot-scope="text, record, index">{{ index + 1 }}</div>
      <div slot="type" slot-scope="text, record, index">
        {{ record.type | questionTypeToLabel }}
      </div>
      <div slot="name" slot-scope="text, record, index">
        <div class="rich-wrapper" v-html="record.name"></div>
      </div>
      <div slot="level" slot-scope="text, record, index">
        {{ record.level | levelToLabel }}
      </div>
      <template slot="action" slot-scope="text, record">
        <router-link :to="'/repo/library/' + id + '/questions/edit/' + record.id">
          编辑
        </router-link>
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
        const res = await this.$http({ method: "GET", url: `/repo/library/${this.id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.info = res.data;
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
          url: `/repo/library/${this.id}/question/${id}`,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchDetail();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less">
.rich-wrapper {
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
