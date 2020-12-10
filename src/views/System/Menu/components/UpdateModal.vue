<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.id ? '编辑菜单' : '创建菜单'"
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
      <a-form-model-item label="上级菜单" prop="parent_id" extra="留空代表顶级菜单">
        <a-tree-select
          v-model="formData.parent_id"
          :tree-data="treeData"
          :replace-fields="{ title: 'title', key: 'id', value: 'id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          style="width: 100%"
          placeholder="请选择上级菜单"
        />
      </a-form-model-item>
      <a-form-model-item label="菜单编码" prop="name">
        <a-input v-model="formData.name" :max-length="100" placeholder="请填写菜单编码" />
      </a-form-model-item>
      <a-form-model-item label="菜单名称" prop="title">
        <a-input v-model="formData.title" :max-length="100" placeholder="请填写菜单名称" />
      </a-form-model-item>
      <a-form-model-item label="启用状态" prop="enable">
        <a-switch
          v-model="formData.enable"
          checked-children="已启用"
          un-checked-children="已停用"
        />
      </a-form-model-item>
      <a-form-model-item label="菜单附加数据" prop="meta">
        <a-textarea
          v-model="formData.meta"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写菜单附加数据"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  name: [{ required: true, message: "请填写菜单编码" }],
  title: [{ required: true, message: "请填写菜单名称" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      treeData: [],
      formData: {
        id: "",
        parent_id: "",
        name: "",
        title: "",
        enable: true,
        meta: "",
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
        const res = await this.$http({ method: "GET", url: `/system/menu_util/tree` });
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
        const { id, ...rest } = this.formData;
        const res = id
          ? await this.$http({ method: "PUT", url: `/system/menu/${id}`, data: rest })
          : await this.$http({ method: "POST", url: "/system/menu", data: rest });
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
        id: "",
        parent_id: "",
        name: "",
        title: "",
        enable: true,
        meta: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
