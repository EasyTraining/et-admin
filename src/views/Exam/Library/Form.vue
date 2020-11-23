<template>
  <div>
    <a-page-header v-if="!mounting" :title="formData.id ? '编辑题库' : '添加题库'" />

    <a-form-model ref="form" :model="formData" :rules="formRules" :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }">
      <a-card :loading="mounting" size="small" title="基本信息">
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="formData.name" placeholder="请填写名称" />
        </a-form-model-item>
        <a-form-model-item label="来源" prop="from">
          <a-input v-model="formData.from" placeholder="请填写来源" />
        </a-form-model-item>
      </a-card>

      <a-card :loading="mounting" size="small" title="题目列表">
        <question-table :data-source="formData.questions" @change="onQuestionsChange" />
      </a-card>
    </a-form-model>

    <br />
    <p>
      <a-button :loading="submitting" type="default" @click="cancel">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </p>
  </div>
</template>

<script>
import { _, removeUuid, attachUuid } from "@/utils";
import { formRules } from "./const";
import QuestionTable from "./components/QuestionTable";

export default {
  name: "LibraryForm",
  components: { QuestionTable },
  data() {
    return {
      mounting: false,
      submitting: false,
      enums: {
        dataTypeList: [],
      },

      editedId: "",
      formData: {
        _id: "",
        name: "",
        from: "",
        questions: [],
      },
      formRules,
    };
  },
  async mounted() {
    this.mounting = true;
    this.editedId = this.$route.params._id;
    if (this.editedId) {
      await this.fetchDetail();
    }
    this.mounting = false;
  },
  methods: {
    onQuestionsChange(questions) {
      this.formData.questions = questions;
    },

    async fetchDetail() {
      try {
        const res = await this.$http({ method: "GET", url: `/paperLibrary/${this.editedId}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const formData = res.data;
        this.formData = formData;
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    cancel() {
      this.$router.go(-1);
    },

    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        const fd = _.cloneDeep(this.formData);
        fd.attributes = removeUuid(fd.attributes);
        this.submitting = true;
        try {
          const res = await this.$http({ method: "POST", url: "/devicetype", data: fd });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          if (this.editedId) {
            await this.fetchDetail();
          } else {
            await this.$router.replace(`/exam/library/edit/${res.data.id}`);
          }
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>
