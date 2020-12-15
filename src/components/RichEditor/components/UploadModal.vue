<template>
  <a-modal
    title="插入图片"
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    @ok="onOk"
    @cancel="onCancel"
    :body-style="{ padding: 0 }"
  >
  </a-modal>
</template>

<script>
export default {
  name: "UploadModal",
  props: ["visible"],
  data() {
    return {
    };
  },
  methods: {
    onOk() {
      this.$emit("ok", this.formula);
    },

    onCancel() {
      this.$emit("cancel", null);
    },
  },
};
</script>