<template>
  <a-modal
    :keyboard="false"
    :width="800"
    centered
    :visible="visible"
    :title="formData.id ? '编辑广播' : '发布广播'"
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
      <a-form-model-item label="是否置顶" prop="is_top">
        <a-switch v-model="formData.is_top" checked-children="是" un-checked-children="否" />
      </a-form-model-item>
      <a-form-model-item label="广播内容" prop="content">
        <a-textarea
          v-model="formData.content"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写广播内容"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  content: [{ required: true, message: "请填写广播内容" }],
};

export default {
  name: "BroadcastModal",
  props: ["initialValues", "klassId", "visible"],
  data() {
    return {
      formData: {
        id: "",
        is_top: false,
        content: "",
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
    onOk() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          const { id, ...rest } = this.formData;
          const res = id
            ? await this.$http({
                method: "PUT",
                url: `/school/klass/${this.klassId}/broadcast/${id}`,
                data: rest,
              })
            : await this.$http({
                method: "POST",
                url: `/school/klass/${this.klassId}/broadcast`,
                data: rest,
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
      });
    },

    onCancel() {
      this.$emit("cancel", null);
      this.formData = {
        id: "",
        is_top: false,
        content: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
