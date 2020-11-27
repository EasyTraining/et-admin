<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.id ? '编辑用户' : '新增用户'"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form-model ref="form" :model="formData" :rules="formRules" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
      <a-form-model-item label="所属部门" prop="org_id">
        <a-tree-select
          v-model="formData.org_id"
          :tree-data="orgTreeData"
          :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          style="width: 100%"
          search-placeholder="请选择所属部门"
        />
      </a-form-model-item>
      <a-form-model-item label="登录账号" prop="account">
        <a-input v-model="formData.account" :max-length="30" placeholder="请填写登录账号" />
      </a-form-model-item>
      <a-form-model-item v-if="formData.id === ''" label="登录密码" prop="password">
        <a-input v-model="formData.password" :max-length="30" placeholder="请填写登录密码" />
      </a-form-model-item>
      <a-form-model-item label="用户昵称" prop="nick_name">
        <a-input v-model="formData.nick_name" :max-length="10" placeholder="请填写用户昵称" />
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="phone">
        <a-input v-model="formData.phone" :max-length="11" placeholder="请填写手机号码" />
      </a-form-model-item>
      <a-form-model-item label="启用状态" prop="enable">
        <a-switch v-model="formData.enable" checked-children="已启用" un-checked-children="已停用" />
      </a-form-model-item>
      <a-form-model-item label="用户简介" prop="desc">
        <a-textarea
          v-model="formData.desc"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写用户简介"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _, sha256 } from "@/utils";

const formRules = {
  org_id: [{ required: true, message: "请选择所属部门" }],
  account: [{ required: true, message: "请填写登录账号" }],
  password: [{ required: true, message: "请填写登录密码" }],
  nick_name: [{ required: true, message: "请填写用户昵称" }],
  phone: [{ required: true, message: "请填写手机号码" }],
};

export default {
  name: "UpdateModal",
  props: ["id", "visible"],
  data() {
    return {
      orgTreeData: [],
      menuTreeData: [],
      formData: {
        id: "",
        org_id: "",
        account: "",
        password: "",
        nick_name: "",
        phone: "",
        enable: true,
        desc: "",
      },
      formRules,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.id) {
        this.fetchDetail();
      }
    },
  },
  async mounted() {
    await this.fetchOrgTreeData();
  },

  methods: {
    async fetchDetail() {
      const hide = this.$message.loading("正在接受数据...", 0);
      try {
        const res = await this.$http({ method: "GET", url: `/system/user/${this.id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.formData = _.pick(res.data, Object.keys(this.formData));
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        hide();
      }
    },

    async fetchOrgTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/system/search/org/tree` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.orgTreeData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async onOk() {
      this.loading = true;
      try {
        const { id, password, ...rest } = this.formData;
        const res = id
          ? await this.$http({ method: "PUT", url: `/system/user/${id}`, data: rest })
          : await this.$http({
              method: "POST",
              url: "/system/user",
              data: { ...rest, hashed_pwd: sha256(password) },
            });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        this.$emit("refresh", _.cloneDeep(this.formData));
        this.onCancel();
        await this.fetchOrgTreeData();
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
        org_id: "",
        account: "",
        password: "",
        nick_name: "",
        phone: "",
        enable: true,
        desc: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
