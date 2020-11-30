<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :title="formData.id ? '编辑章节' : '新增章节'"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form-model ref="form" :model="formData" :rules="formRules" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
      <a-form-model-item label="所属课程" prop="course_id">
        <a-tree-select
          v-model="formData.course_id"
          :tree-data="courseTreeData"
          :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          style="width: 100%"
          placeholder="请选择所属课程"
        />
      </a-form-model-item>
      <a-form-model-item label="章节序号" prop="sort" extra="值越小越靠前">
        <a-input-number v-model="formData.sort" style="width: 100%" :min="1" placeholder="请填写章节序号" />
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
      <a-form-model-item label="启用状态" prop="enable">
        <a-switch v-model="formData.enable" checked-children="已启用" un-checked-children="已停用" />
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
  course_id: [{ required: true, message: "请选择所属课程" }],
  sort: [{ required: true, message: "请填写章节序号" }],
  name: [{ required: true, message: "请填写章节名称" }],
  target: [{ required: true, message: "请填写教学目标" }],
};

export default {
  name: "UpdateModal",
  props: ["initialValues", "visible"],
  data() {
    return {
      courseTreeData: [],
      formData: {
        id: "",
        course_id: "",
        name: "",
        target: "",
        enable: true,
        attachments: [],
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
    await this.fetchCourseTreeData();
  },

  methods: {
    async fetchCourseTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/teach/search/course/tree" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.courseTreeData = res.data || [];
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
          ? await this.$http({ method: "PUT", url: `/teach/chapter/${id}`, data: rest })
          : await this.$http({ method: "POST", url: "/teach/chapter", data: rest });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        this.$emit("ok", _.cloneDeep(this.formData));
        this.onCancel();
        await this.fetchCourseTreeData();
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
