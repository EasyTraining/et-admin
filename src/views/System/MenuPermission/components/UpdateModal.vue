<template>
  <a-modal
    :keyboard="false"
    :width="800"
    centered
    :visible="visible"
    title="设置菜单权限"
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
      <a-form-model-item label="部门名称" prop="name">
        {{ formData.name }}
      </a-form-model-item>
      <a-form-model-item label="可见菜单" prop="menu_names">
        <a-tree-select
          v-model="formData.menu_names"
          :tree-data="menuTreeData"
          :replace-fields="{ title: 'title', key: 'id', value: 'name' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          tree-checkable
          style="width: 100%"
          placeholder="请选择可见菜单"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  menu_names: [{ required: true, message: "请选择可见菜单" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      menuTreeData: [],

      formData: {
        id: "",
        name: "",
        menu_names: [],
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
  mounted() {
    this.fetchMenuTreeData();
  },

  methods: {
    async fetchMenuTreeData() {
      try {
        const res = await this.$http({ method: "GET", url: `/system/menu_util/tree` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.menuTreeData = res.data || [];
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async onOk() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          const { id, menu_names } = this.formData;
          const res = await this.$http({
            method: "PUT",
            url: `/hr/org/${id}`,
            data: { menu_names },
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
        name: "",
        menu_names: [],
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
