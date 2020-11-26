<template>
  <div class="card-container" v-if="info">
    <a-tabs type="card">
      <a-tab-pane key="1" tab="复制导入">
        <paste-tab :info="info" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="单题导入">
        <manual-tab :info="info" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import PasteTab from "./components/PasteTab";
import ManualTab from "./components/ManualTab";

export default {
  name: "QuestionForm",
  components: { PasteTab, ManualTab },
  data() {
    return {
      loading: false,
      libraryId: "",
      questionId: "",
      info: null,
    };
  },
  async mounted() {
    const { libraryId, questionId } = this.$route.params;
    this.libraryId = libraryId;
    this.questionId = questionId;
    await this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/exam/library/${this.libraryId}` });
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
  },
};
</script>

<style lang="less">
.card-container {
  overflow: hidden;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
