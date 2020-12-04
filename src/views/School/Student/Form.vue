<template>
  <div>
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-card title="基本信息">
        <a-form-model-item label="所属班级" prop="klass_id">
          <a-input v-model="formData.klass_id" :max-length="4" placeholder="请填写所属班级" />
        </a-form-model-item>
        <a-form-model-item label="真实姓名" prop="name">
          <a-input v-model="formData.name" :max-length="4" placeholder="请填写真实姓名" />
        </a-form-model-item>
        <a-form-model-item label="手机号码" prop="phone">
          <a-input v-model="formData.phone" :max-length="11" placeholder="请填写手机号码" />
        </a-form-model-item>
        <a-form-model-item label="启用状态" prop="enable">
          <a-switch
            v-model="formData.enable"
            checked-children="已启用"
            un-checked-children="已停用"
          />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea
            v-model="formData.remark"
            :max-length="300"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请填写备注"
          />
        </a-form-model-item>
      </a-card>

      <a-card title="登录信息"></a-card>
    </a-form-model>

    <footer-tool-bar>
      <a-button :loading="submitting" @click="goBack">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { _ } from "@/utils";
import { formRules } from "./const";

export default {
  name: "StudentForm",
  data() {
    return {
      loading: false,
      submitting: false,

      formData: {},
      formRules,
    };
  },
  async mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        const fd = _.cloneDeep(this.formData);
        this.submitting = true;
        try {
          const res = this.editedId
            ? await this.$http({ method: "PUT", url: `/cms/article/${this.editedId}`, data: fd })
            : await this.$http({ method: "POST", url: "/cms/article", data: fd });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          if (this.editedId) {
            await this.fetchDetail();
          } else {
            await this.$router.replace(`/cms/article/edit/${res.data.id}`);
          }
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>
