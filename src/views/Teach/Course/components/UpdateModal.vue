<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.id ? '编辑章节' : '添加章节'"
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
      <a-form-model-item label="上级章节" prop="parent_id">
        <a-tree-select
          v-model="formData.parent_id"
          :tree-data="treeData"
          :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          style="width: 100%"
          placeholder="请选择上级菜单"
        />
      </a-form-model-item>
      <a-form-model-item label="章节名称" prop="name">
        <a-input v-model="formData.name" :max-length="100" placeholder="请填写章节名称" />
      </a-form-model-item>
      <a-form-model-item label="教学目标" prop="target">
        <a-textarea
          v-model="formData.target"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写章节备注"
        />
      </a-form-model-item>
      <a-form-model-item label="章节备注" prop="remark">
        <a-textarea
          v-model="formData.remark"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写章节备注"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  name: [{ required: true, message: "请填写章节名称" }],
  target: [{ required: true, message: "请填写教学目标" }],
};

export default {
  name: "UpdateModal",
  props: ["visible", "initialValues", "klassId"],
  data() {
    return {
      formData: {
        parent_id: undefined,
        id: "",
        name: "",
        target: "",
        attachments: [],
        remark: "",
      },
      formRules,

      treeData: [],
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.fetchTreeData();
        if (this.initialValues) {
          this.formData = _.cloneDeep(this.initialValues);
        }
      }
    },
  },
  methods: {
    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/teach/course_util/tree",
          params: { klass_id: this.klassId },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.treeData = res.data || [];
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async onOk() {
      this.loading = true;
      try {
        const { id, ...rest } = this.formData;
        const res = id
          ? await this.$http({
              method: "PUT",
              url: `/teach/course/${id}`,
              data: rest,
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
        course_id: "",
        name: "",
        enable: true,
        remark: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
