<template>
  <span>
    <a href="javascript:;" @click="showModal">查看</a>

    <a-modal
      title="员工信息"
      placement="right"
      :keyboard="false"
      :width="800"
      centered
      :visible="visible"
      :footer="null"
      @cancel="closeModal"
    >
      <employee-detail :id="id" />
    </a-modal>
  </span>
</template>

<script>
import EmployeeDetail from "@/components/EmployeeDetail";

export default {
  name: "DetailBtn",
  props: ["id"],
  components: { EmployeeDetail },
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
