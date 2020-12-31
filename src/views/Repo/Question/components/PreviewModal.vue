<template>
  <a-modal
    :keyboard="false"
    :width="1000"
    centered
    :visible="visible"
    :confirm-loading="submitting"
    title="试题预览"
    :footer="null"
    @cancel="onCancel"
  >
    <question-preview :question="question" />
  </a-modal>
</template>

<script>
export default {
  name: "PreviewModal",
  props: ["visible", "question"],
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    onCancel() {
      this.$emit("cancel", null);
    },
  },
};
</script>
