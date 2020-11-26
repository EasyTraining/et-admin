<template>
  <a-result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
    <template #extra>
      <a-button type="primary" @click="cancel">返回原页面</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "Exception403",
  methods: {
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>
