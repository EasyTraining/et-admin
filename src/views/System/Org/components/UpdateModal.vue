<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData._id ? '编辑部门' : '新增部门'"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form-model ref="form" :model="formData" :rules="formRules" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
      <a-form-model-item label="上级部门" prop="parent_id" extra="留空代表顶级部门">
        <a-tree-select
          v-model="formData.parent_id"
          :tree-data="treeData"
          :replace-fields="{ title: 'name', key: '_id', value: '_id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          style="width: 100%"
          search-placeholder="请选择上级部门"
        />
      </a-form-model-item>
      <a-form-model-item label="部门名称" prop="name">
        <a-input v-model="formData.name" :max-length="100" placeholder="请填写部门名称" />
      </a-form-model-item>
      <a-form-model-item label="启用状态" prop="enable">
        <a-switch v-model="formData.enable" checked-children="已启用" un-checked-children="已停用" />
      </a-form-model-item>
      <a-form-model-item label="部门简介" prop="desc">
        <a-textarea
          v-model="formData.desc"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写部门简介"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  name: [{ required: true, message: "请填写部门名称" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      treeData: [],
      formData: {
        _id: "",
        parent_id: "",
        name: "",
        enable: true,
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
  async mounted() {
    await this.fetchTreeData();
  },

  methods: {
    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/system/search/org/tree` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.treeData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async onOk() {
      this.loading = true;
      try {
        const { _id, ...rest } = this.formData;
        const res = _id
          ? await this.$http({ method: "PUT", url: `/system/org/${_id}`, data: rest })
          : await this.$http({ method: "POST", url: "/system/org", data: rest });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        this.$emit("ok", _.cloneDeep(this.formData));
        this.onCancel();
        await this.fetchTreeData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    onCancel() {
      this.$emit("cancel", null);
      this.formData = {
        _id: "",
        parent_id: "",
        name: "",
        enable: true,
        desc: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
