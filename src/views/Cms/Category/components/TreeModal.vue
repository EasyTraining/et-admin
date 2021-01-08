<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    title="分类树形结构"
    :footer="null"
    @cancel="onCancel"
  >
    <a-tree
      show-line
      default-expand-all
      :tree-data="treeData"
      :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
    />
  </a-modal>
</template>

<script>
export default {
  name: "TreeModal",
  props: ["visible"],
  data() {
    return {
      loading: false,
      treeData: [],
    };
  },
  async mounted() {
    await this.fetchTreeData();
  },
  methods: {
    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/cms/category_util/tree" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.treeData = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    onCancel() {
      this.$emit("cancel", null);
    },
  },
};
</script>
