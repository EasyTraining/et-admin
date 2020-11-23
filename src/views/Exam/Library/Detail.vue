<template>
  <div class="device-detail-page">
    <a-page-header title="题库详情" />

    <a-card :loading="loading">
      <a-descriptions title="基本信息" :column="3">
        <a-descriptions-item label="系统编号">{{ info.topic }}</a-descriptions-item>
        <a-descriptions-item label="名称">{{ info.name }}</a-descriptions-item>
      </a-descriptions>

      <br />
      <a-descriptions title="属性列表" :column="3" v-if="info.attributes">
        <a-descriptions-item v-for="(item, index) in info.attributes" :key="index" :label="item.key">
          {{ item.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "LibraryDetail",
  data() {
    return {
      loading: false,
      _id: "",
      info: {},
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    if (id) {
      this._id = id;
      await this.fetchDetail();
    }
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/paperLibrary/${this._id}` });
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
