<template>
  <span>
    <a href="javascript:;" @click="showModal">
      <slot></slot>
    </a>

    <a-modal
      title="学员信息"
      centered
      :keyboard="false"
      :width="800"
      :visible="visible"
      :footer="null"
      @cancel="closeModal"
    >
      <student-detail :id="id" />
    </a-modal>
  </span>
</template>

<script>
export default {
  name: "DetailBtn",
  props: ["id"],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },

    closeModal() {
      this.visible = false;
    },
  },
};
</script>
