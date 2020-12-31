<template>
  <div class="paper">
    <div class="paper__name">《{{ paperInfo.name }}》</div>
    <div class="paper__question">
      <div class="paper__question--type">
        <span>1、单选题</span>
        <small>分值：1</small>
      </div>
      <div class="paper__question--name">
        为提升设计效率为提升设计效率为提升设计效率为提升设计效率为提升设计效率为提升设计效率为提升设计效率为提升设计效率为提升设计效率
      </div>
      <ul class="paper__question--options">
        <li>A：色阶</li>
        <li>B：色阶</li>
        <li>C：色阶</li>
        <li>D：色阶</li>
      </ul>
      <div class="paper__question--answer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaperForm",
  data() {
    return {
      paperId: "",
      paperInfo: {},
    };
  },
  async mounted() {
    const { paperId } = this.$route.params;
    this.paperId = paperId;
    await this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/teach/paper/${this.paperId}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.paperInfo = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
