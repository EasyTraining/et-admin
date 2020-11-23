<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    size="small"
    v-model="visible"
    :title="modalForm._id ? '编辑题目' : '添加题目'"
    @cancel="onModalCancel"
    @ok="onModalOk"
  >
    <a-form-model
      ref="modalForm"
      :model="modalForm"
      :rules="modalRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="名称" prop="title">
        <a-input v-model="modalForm.title" placeholder="请填写名称" />
      </a-form-model-item>
      <a-form-model-item label="标识" prop="name">
        <a-input v-model="modalForm.name" placeholder="请填写标识" />
      </a-form-model-item>
      <a-form-model-item label="附加数据" prop="meta">
        <a-textarea v-model="modalForm.meta" :auto-size="{ minRows: 3, maxRows: 5 }" placeholder="请填写描述" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { modalRules } from "@/views/System/Menu/const";

export default {
  name: "QuestionModal",
  props: ["visible"],
  data() {
    return {
      modalForm: {
        _id: "",
        title: "",
        name: "",
        meta: "",
      },
      modalRules,
    };
  },
  methods: {
    onModalCancel() {
      this.modalForm = {
        _id: "",
        title: "",
        name: "",
        meta: "",
      };
      this.$refs.modalForm.resetFields();
      this.$emit("cancel", null);
    },

    onModalOk() {},
  },
};
</script>
