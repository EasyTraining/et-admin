<template>
  <div>
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-card :loading="loading" size="small" title="企业名称与Logo设置">
        <a-form-model-item label="企业名称" prop="company_name">
          <a-input v-model="formData.company_name" :max-length="4" placeholder="请填写姓名" />
        </a-form-model-item>
        <a-form-model-item
          label="企业Logo"
          prop="company_logo"
          extra="建议上传图片尺寸为640*640，大小不超过1M"
        >
          <single-image-upload v-model="formData.company_logo" />
        </a-form-model-item>
      </a-card>

      <a-card :loading="loading" size="small" title="个性配置">
        <a-form-model-item
          label="登录页背景图"
          prop="login_background_img"
          extra="用于后台系统登录页"
        >
          <single-image-upload v-model="formData.login_background_img" />
        </a-form-model-item>
      </a-card>
    </a-form-model>

    <footer-tool-bar>
      <a-button :loading="submitting" @click="goBack">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { setSiteCfg } from "@/utils";
import { formRules } from "./const";

export default {
  name: "SystemConfig",
  data() {
    return {
      loading: false,
      submitting: false,

      code: "SYSTEM_GLOBAL",
      existed: false,
      formData: {
        company_name: "",
        company_logo: "",
        login_background_img: "",
      },
      formRules,
    };
  },
  async mounted() {
    await this.fetchDetail();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/system/cfg/${this.code}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        if (res.data) {
          const { json } = res.data;
          this.existed = true;
          this.formData = JSON.parse(json);
        } else {
          this.existed = false;
        }
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        if (this.existed) {
          this.update();
        } else {
          this.create();
        }
      });
    },

    async create() {
      this.submitting = true;
      try {
        const json = JSON.stringify(this.formData);
        const res = await this.$http({
          method: "POST",
          url: "/system/cfg",
          data: { code: this.code, json },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        setSiteCfg(this.formData);
        window.location.reload();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },

    async update() {
      this.submitting = true;
      try {
        const json = JSON.stringify(this.formData);
        const res = await this.$http({
          method: "PUT",
          url: `/system/cfg/${this.code}`,
          data: { json },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        setSiteCfg(this.formData);
        window.location.reload();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
