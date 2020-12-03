<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.uuid ? '编辑选项' : '新增选项'"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 15 }"
    >
      <a-form-model-item label="选项名" prop="key">
        <a-input v-model="formData.key" :max-length="100" placeholder="请填写选项名" />
      </a-form-model-item>
      <a-form-model-item label="选项值" prop="value">
        <a-input v-model="formData.value" :max-length="100" placeholder="请填写选项值" />
      </a-form-model-item>
      <a-form-model-item label="排序" prop="sort" extra="排序值越小, 越靠前">
        <a-input-number
          v-model="formData.sort"
          style="width: 100%"
          :min="1"
          :max="99"
          placeholder="请填写排序"
        />
      </a-form-model-item>
      <a-form-model-item label="启用状态" prop="enable">
        <a-switch
          v-model="formData.enable"
          checked-children="已启用"
          un-checked-children="已停用"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { uuid, _ } from "@/utils";

const formRules = {
  key: [{ required: true, message: "请填写选项名" }],
  value: [{ required: true, message: "请填写选项值" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      formData: {
        uuid: "",
        id: "",
        key: "",
        value: "",
        sort: 1,
        enable: true,
      },
      formRules,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.initialValues) {
        console.log(this.initialValues);
        this.formData = _.cloneDeep(this.initialValues);
      }
    },
  },
  methods: {
    onOk() {
      this.formData.uuid = this.formData.uuid || uuid();
      this.$emit("ok", _.cloneDeep(this.formData));
      this.onCancel();
    },

    onCancel() {
      this.$emit("cancel", null);
      this.formData = {
        uuid: "",
        id: "",
        key: "",
        value: "",
        sort: 1,
        enable: true,
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
