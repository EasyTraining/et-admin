<template>
  <div>
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-card :loading="loading" size="small">
        <a-form-model-item label="课程名称" prop="name">
          <a-input v-model="formData.name" :max-length="300" placeholder="请填写课程名称" />
        </a-form-model-item>
        <a-form-model-item label="预览图" prop="banner_img">
          <single-image-upload v-model="formData.banner_img" />
        </a-form-model-item>
        <a-form-model-item label="课程摘要" prop="summary">
          <a-textarea
            v-model="formData.summary"
            :max-length="300"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请填写课程摘要"
          />
        </a-form-model-item>
        <a-form-model-item label="课程介绍" prop="introduction">
          <rich-editor v-model="formData.introduction" placeholder="请填写课程介绍" />
        </a-form-model-item>
        <a-form-model-item label="学员数" prop="student_count">
          <a-input-number v-model="formData.student_count" placeholder="请填写学员数" />
        </a-form-model-item>
        <a-form-model-item label="点赞数" prop="star_count">
          <a-input-number v-model="formData.star_count" placeholder="请填写点赞数" />
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
import { _ } from "@/utils";
import { formRules } from "./const";

export default {
  name: "CourseForm",
  data() {
    return {
      loading: false,
      submitting: false,

      id: "",
      klass_id: "",

      formData: {
        name: "",
        banner_img: "",
        summary: "",
        introduction: "",
        student_count: 0,
        star_count: 0,
      },
      formRules,
    };
  },
  async mounted() {
    this.id = this.$route.params.id;
    this.klass_id = this.$route.query.klass_id;
    if (this.id) {
      await this.fetchDetail();
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/teach/course/${this.id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.formData = _.pick(res.data, Object.keys(this.formData));
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        if (this.id) {
          this.update();
        } else {
          this.create();
        }
      });
    },

    async create() {
      this.submitting = true;
      try {
        const res = await this.$http({
          method: "POST",
          url: "/teach/course",
          data: { ...this.formData, klass_id: this.klass_id },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.$router.push(`/teach/course/edit/${res.data.id}?klass_id=${this.klass_id}`);
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },

    async update() {
      this.submitting = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/teach/course/${this.id}`,
          data: this.formData,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.fetchDetail();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
