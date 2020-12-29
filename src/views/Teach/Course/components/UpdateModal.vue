<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.id ? '编辑课程' : '添加课程'"
    :confirm-loading="loading"
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
      <a-form-model-item label="课程名称" prop="name">
        <a-input v-model="formData.name" :max-length="100" placeholder="请填写课程名称" />
      </a-form-model-item>
      <a-form-model-item label="课程简介" prop="desc">
        <a-textarea
          v-model="formData.desc"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写课程简介"
        />
      </a-form-model-item>
      <a-form-model-item label="预览图" prop="banner_img">
        <avatar-upload v-model="formData.banner_img" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";
import AvatarUpload from "@/components/AvatarUpload";

const formRules = {
  name: [{ required: true, message: "请填写课程名称" }],
  desc: [{ required: true, message: "请填写课程简介" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible", "klassId"],
  components: { AvatarUpload },
  data() {
    return {
      loading: false,
      treeData: [],
      formData: {
        id: "",
        name: "",
        banner_img: "",
        desc: "",
      },
      formRules,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.initialValues) {
        this.formData = _.cloneDeep(this.initialValues);
      }
    },
  },
  methods: {
    async onOk() {
      this.loading = true;
      try {
        const { id, ...rest } = this.formData;
        const res = id
          ? await this.$http({
              method: "PUT",
              url: `/teach/course/${id}`,
              data: { klass_id: this.klassId, ...rest },
            })
          : await this.$http({
              method: "POST",
              url: "/teach/course",
              data: { klass_id: this.klassId, ...rest },
            });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        this.$emit("ok", _.cloneDeep(this.formData));
        this.onCancel();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    onCancel() {
      this.$emit("cancel", null);
      this.formData = {
        id: "",
        name: "",
        banner_img: "",
        desc: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
