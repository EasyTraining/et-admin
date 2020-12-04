<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
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
      <a-form-model-item label="昵称" prop="nick_name">
        {{ formData.nick_name }}
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input v-model="formData.password" placeholder="请填写密码" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _, sha256 } from "@/utils";

const formRules = {
  password: [{ required: true, message: "请填写密码" }],
};

export default {
  name: "ResetModal",
  props: ["visible", "id"],
  data() {
    return {
      formData: {
        id: "",
        nick_name: "",
        password: "",
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
      const hide = this.$message.loading("正在接受数据...", 0);
      try {
        const res = await this.$http({ method: "GET", url: `/system/employee/${this.id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.formData = _.pick(res.data, ["id", "nick_name"]);
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        hide();
      }
    },

    onCancel() {
      this.$refs.form.resetFields();
      this.$emit("cancel", null);
    },

    onOk() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        const hide = this.$message.loading("正在接受数据...", 0);
        try {
          const { id, password } = this.formData;
          const hashed_pwd = sha256(password);
          const res = await this.$http({
            method: "PUT",
            url: `/system/employee/${id}/reset_password`,
            data: { hashed_pwd },
          });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          this.$emit("refresh", null);
          this.onCancel();
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          hide();
        }
      });
    },
  },
};
</script>
