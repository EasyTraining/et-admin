<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :confirm-loading="submitting"
    title="重置密码"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="员工姓名" prop="name">
        {{ formData.name }}
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="new_pwd">
        <a-input v-model="formData.new_pwd" :max-length="100" placeholder="请填写新密码" />
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="repeat_pwd">
        <a-input v-model="formData.repeat_pwd" :max-length="100" placeholder="请再次填写新密码" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _, sha256 } from "@/utils";

const formRules = {
  new_pwd: [{ required: true, message: "必填项" }],
  repeat_pwd: [{ required: true, message: "必填项" }],
};

export default {
  name: "ResetModal",
  props: ["visible", "id"],
  data() {
    return {
      submitting: false,
      formData: {
        id: "",
        name: "",
        new_pwd: "",
        repeat_pwd: "",
      },
      formRules,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.id) {
        this.fetchDetail();
      }
    },
  },
  methods: {
    async fetchDetail() {
      try {
        const res = await this.$http({ method: "GET", url: `/hr/employee/${this.id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.formData = _.pick(res.data, ["id", "name"]);
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    onCancel() {
      this.formData = {
        id: "",
        name: "",
        new_pwd: "",
        repeat_pwd: "",
      };
      this.$refs.form.resetFields();
      this.$emit("cancel", null);
    },

    onOk() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.submitting = true;
        try {
          const { id, new_pwd, repeat_pwd } = this.formData;
          if (repeat_pwd !== new_pwd) {
            this.$message.warning("两次输入的密码不一致!");
            return;
          }
          const hashed_pwd = sha256(new_pwd);
          const res = await this.$http({
            method: "PUT",
            url: `/hr/employee/${id}/reset_password`,
            data: { hashed_pwd },
          });
          if (res.code !== 200) {
            this.$message.warning(res.message);
            return;
          }
          this.$message.success("操作成功");
          this.$emit("refresh", null);
          this.onCancel();
        } catch (e) {
          this.$message.warning(e.message);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>
