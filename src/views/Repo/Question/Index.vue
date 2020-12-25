<template>
  <div>
    <p>
      <router-link :to="'/repo/library/' + info.id + '/questions/add'">
        <a-button type="primary" icon="plus">添加试题</a-button>
      </router-link>
      <a-button style="margin-left: 15px" @click="showImportModal">批量导入</a-button>
      <a-popconfirm placement="right" title="删除以后无法恢复, 是否继续?" @confirm="multipleRemove">
        <a-button style="margin-left: 15px" :disabled="selectedIds.length === 0">
          批量删除
        </a-button>
      </a-popconfirm>
      <a-button
        style="margin-left: 15px"
        :disabled="selectedIds.length === 0"
        @click="multipleExport"
      >
        批量导出
      </a-button>
      <span v-if="selectedIds.length > 0" style="margin-left: 15px">
        已选择 {{ selectedIds.length }} 道题
      </span>
    </p>

    <a-table
      size="small"
      row-key="id"
      :columns="tableColumns"
      :row-selection="{
        selectedRowKeys: selectedIds,
        columnWidth: 30,
        onChange: onSelect,
      }"
      :data-source="info.questions"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 1200 }"
    >
      <div slot="name" slot-scope="text, record">
        <div class="rich-wrapper" v-html="record.name"></div>
      </div>
      <div slot="type" slot-scope="text, record">
        {{ record.type | questionTypeToLabel }}
      </div>
      <div slot="level" slot-scope="text, record">
        {{ record.level | levelToLabel }}
      </div>
      <div slot="points" slot-scope="text, record">
        <a-tag v-for="item in record.points" :key="item">{{ item }}</a-tag>
      </div>
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="showPreviewModal(record)">预览</a>
        <a-divider type="vertical" />
        <router-link :to="'/repo/library/' + id + '/questions/edit/' + record.id">
          编辑
        </router-link>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <import-modal :visible="importModalVisible" @cancel="closeImportModal" />
    <preview-modal
      :visible="previewModalVisible"
      :question="curQuestion"
      @cancel="closePreviewModal"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import ImportModal from "./components/ImportModal";
import PreviewModal from "./components/PreviewModal";

export default {
  name: "QuestionIndex",
  components: { ImportModal, PreviewModal },
  data() {
    return {
      loading: false,
      id: "",
      info: {},

      selectedIds: [],
      tableColumns,
      tableData: [],

      curQuestion: null,

      importModalVisible: false,
      previewModalVisible: false,
    };
  },
  async mounted() {
    const { libraryId } = this.$route.params;
    this.id = libraryId;
    await this.fetchDetail();
  },
  methods: {
    async onSelect(selectedIds) {
      this.selectedIds = selectedIds;
    },

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

    async multipleRemove() {
      this.loading = true;
      const ids = this.selectedIds.join(",");
      try {
        const res = await this.$http({
          method: "DELETE",
          url: `/repo/library/${this.id}/questions/${ids}`,
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

    async multipleExport() {
      this.$message.info("功能开发中...");
    },

    showImportModal() {
      this.importModalVisible = true;
    },

    closeImportModal() {
      this.importModalVisible = false;
    },

    showPreviewModal(question) {
      this.curQuestion = question;
      this.previewModalVisible = true;
    },

    closePreviewModal() {
      this.previewModalVisible = false;
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
