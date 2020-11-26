<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is reporting an error.">
    <template #extra>
      <a-button type="primary" @click="cancel">返回原页面</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "Exception500",
  methods: {
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>
