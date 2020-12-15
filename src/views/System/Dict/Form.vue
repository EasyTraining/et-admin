<template>
  <div>
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-card :loading="mounting" title="字典信息">
        <a-form-model-item label="字典编码" prop="code" extra="字典的唯一识别码, 不可重复">
          <a-input v-model="formData.code" placeholder="请填写字典编码" />
        </a-form-model-item>
        <a-form-model-item label="字典名称" prop="name">
          <a-input v-model="formData.name" placeholder="请填写字典名称" />
        </a-form-model-item>
        <a-form-model-item label="启用状态" prop="enable">
          <a-switch
            v-model="formData.enable"
            checked-children="已启用"
            un-checked-children="已停用"
          />
        </a-form-model-item>
        <a-form-model-item label="字典备注" prop="remark">
          <a-textarea
            v-model="formData.remark"
            :max-length="300"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请填写字典备注"
          />
        </a-form-model-item>
      </a-card>

      <a-card :loading="mounting" title="字典选项">
        <option-table :data-source="formData.options" @change="onOptionTableChange" />
      </a-card>
    </a-form-model>

    <footer-tool-bar>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { _ } from "@/utils";
import { formRules } from "./const";
import OptionTable from "./components/OptionTable";

export default {
  name: "DeviceTypeForm",
  components: { OptionTable },
  data() {
    return {
      mounting: false,
      submitting: false,

      editedId: "",
      formData: {
        code: "",
        name: "",
        enable: true,
        remark: "",
        options: [],
      },
      formRules,
    };
  },
  async mounted() {
    this.mounting = true;
    this.editedId = this.$route.params.id;
    if (this.editedId) {
      await this.fetchDetail();
    }
    this.mounting = false;
  },
  methods: {
    async fetchDetail() {
      try {
        const res = await this.$http({ method: "GET", url: `/system/dict/${this.editedId}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.formData = _.pick(res.data, Object.keys(this.formData));
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    onOptionTableChange(options) {
      this.formData.options = options;
    },

    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        const fd = _.cloneDeep(this.formData);
        if (fd.options.length === 0) {
          this.$message.warn("字典选项不能为空");
          return;
        }
        this.submitting = true;
        try {
          const res = this.editedId
            ? await this.$http({ method: "PUT", url: `/system/dict/${this.editedId}`, data: fd })
            : await this.$http({ method: "POST", url: "/system/dict", data: fd });
          if (res.code !== 200) {
            this.$message.warning(res.message);
            return;
          }
          this.$message.success("操作成功");
          if (this.editedId) {
            await this.fetchDetail();
          } else {
            await this.$router.replace(`/system/dict/edit/${res.data.id}`);
          }
        } catch (e) {
          this.$message.warning(e.message);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>
