<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.id ? '编辑班级' : '新增班级'"
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
      <a-form-model-item label="班级名称" prop="name">
        <a-input v-model="formData.name" :max-length="100" placeholder="请填写班级名称" />
      </a-form-model-item>
      <a-form-model-item
        label="学号前缀"
        prop="prefix"
        extra="此前缀会应用在所有学员, 例如: VIP001, VIP002"
      >
        <a-input v-model="formData.prefix" :max-length="20" placeholder="请填写学号前缀" />
      </a-form-model-item>
      <a-form-model-item label="班主任" prop="leader_id">
        <a-select v-model="formData.leader_id" placeholder="请选择班主任">
          <a-select-option v-for="user in userList" :key="user.id" :value="user.id">
            {{ user.nick_name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="班级描述" prop="description">
        <a-textarea
          v-model="formData.description"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写班级描述"
        />
      </a-form-model-item>
      <a-form-model-item label="班级备注" prop="remark">
        <a-textarea
          v-model="formData.remark"
          :max-length="300"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写班级备注"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { _ } from "@/utils";

const formRules = {
  name: [{ required: true, message: "请填写班级名称" }],
  prefix: [{ required: true, message: "请填写学号前缀" }],
  leader_id: [{ required: true, message: "请选择班主任" }],
  description: [{ required: true, message: "请填写班级描述" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      userList: [],
      formData: {
        id: "",
        name: "",
        leader_id: undefined,
        description: "",
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
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await this.$http({ method: "GET", url: "/system/user_util/simple_list" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.userList = res.data;
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async onOk() {
      this.loading = true;
      try {
        const { id, ...rest } = this.formData;
        const res = id
          ? await this.$http({ method: "PUT", url: `/system/klass/${id}`, data: rest })
          : await this.$http({ method: "POST", url: "/system/klass", data: rest });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        this.$emit("ok", _.cloneDeep(this.formData));
        this.onCancel();
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
        name: "",
        leader_id: undefined,
        description: "",
        remark: "",
      };
      this.$refs.form.resetFields();
    },
  },
};
</script>
