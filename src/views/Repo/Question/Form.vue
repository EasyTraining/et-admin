<template>
  <div>
    <a-tabs>
      <a-tab-pane key="1" tab="单题导入" />
    </a-tabs>
    <a-card size="small" v-if="info">
      <manual-tab :info="info" />
    </a-card>
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
        const res = await this.$http({ method: "GET", url: `/repo/library/${this.libraryId}` });
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
  },
};
</script>
