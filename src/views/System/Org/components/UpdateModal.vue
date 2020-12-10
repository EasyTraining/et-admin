<template>
  <a-modal
    :keyboard="false"
    :width="800"
    centered
    :visible="visible"
    :title="formData.id ? '编辑部门' : '创建部门'"
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
      <a-form-model-item label="上级部门" prop="parent_id" extra="留空代表顶级部门">
        <a-tree-select
          v-model="formData.parent_id"
          :tree-data="orgTreeData"
          :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          style="width: 100%"
          placeholder="请选择上级部门"
        />
      </a-form-model-item>
      <a-form-model-item label="部门名称" prop="name">
        <a-input v-model="formData.name" :max-length="100" placeholder="请填写部门名称" />
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
      <a-form-model-item label="启用状态" prop="enable">
        <a-switch
          v-model="formData.enable"
          checked-children="已启用"
          un-checked-children="已停用"
        />
      </a-form-model-item>
      <a-form-model-item label="部门备注" prop="remark">
        <a-textarea
          v-model="formData.remark"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写部门备注"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  name: [{ required: true, message: "请填写部门名称" }],
  menu_names: [{ required: true, message: "请选择可见菜单" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      orgTreeData: [],
      menuTreeData: [],

      formData: {
        id: "",
        parent_id: "",
        name: "",
        enable: true,
        menu_names: [],
        remark: "",
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
    this.fetchOrgTreeData();
    this.fetchMenuTreeData();
  },

  methods: {
    async fetchOrgTreeData() {
      try {
        const res = await this.$http({ method: "GET", url: `/system/org_util/tree` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.orgTreeData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async fetchMenuTreeData() {
      try {
        const res = await this.$http({ method: "GET", url: `/system/menu_util/tree` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.menuTreeData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async onOk() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          const { id, ...rest } = this.formData;
          const res = id
            ? await this.$http({ method: "PUT", url: `/system/org/${id}`, data: rest })
            : await this.$http({ method: "POST", url: "/system/org", data: rest });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          this.$emit("ok", _.cloneDeep(this.formData));
          this.onCancel();
          await this.fetchOrgTreeData();
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.loading = false;
        }
      });
    },

    onCancel() {
      this.$emit("cancel", null);
      this.formData = {
        id: "",
        parent_id: "",
        name: "",
        enable: true,
        menu_names: [],
        remark: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
