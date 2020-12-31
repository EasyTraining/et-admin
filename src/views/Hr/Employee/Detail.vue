<template>
  <div>
    <employee-detail :id="id" />

    <footer-tool-bar>
      <a-button @click="goBack">返回</a-button>
      <a-button type="primary" @click="toEdit">编辑</a-button>
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
  async mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    toEdit() {
      this.$router.push(`/hr/employee/edit/${this.id}`);
    },
  },
};
</script>
