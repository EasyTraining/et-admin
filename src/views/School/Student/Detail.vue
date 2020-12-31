<template>
  <div>
    <student-detail :id="id" />

    <footer-tool-bar>
      <a-button @click="goBack">返回</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
