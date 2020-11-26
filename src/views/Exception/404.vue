<template>
  <a-result status="404" title="404" sub-title="抱歉, 页面不存在.">
    <template #extra>
      <a-button type="primary" @click="cancel">返回原页面</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "Exception404",
  methods: {
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>
