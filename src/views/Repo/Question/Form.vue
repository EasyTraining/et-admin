<template>
  <a-card :loading="loading" size="small">
    <a-form-model
      ref="form"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="试题类型" prop="type">
        <a-radio-group v-model="formData.type" @change="onTypeChange" button-style="solid">
          <a-radio-button v-for="(val, key) in enums.questionMap" :key="key" :value="key">
            {{ val }}
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="试题" prop="name">
        <rich-editor v-model="formData.name" placeholder="请填写试题" />
      </a-form-model-item>

      <template v-if="formData.type === 'RADIO'">
        <a-form-model-item label="试题选项" prop="options">
          <div class="option" v-for="(item, index) in formData.options" :key="index">
            <div class="option__code">{{ item.code }}、</div>
            <div class="option__control">
              <rich-editor v-model="item.name" placeholder="请填写试题选项" />
            </div>
            <div class="option__del">
              <a-button type="link" icon="delete" @click="removeOption(index)" />
            </div>
          </div>
          <a-button
            v-if="formData.options.length < 10"
            icon="plus"
            type="link"
            style="margin-left: 14px"
            @click="addOption"
          >
            创建选项
          </a-button>
        </a-form-model-item>
        <a-form-model-item label="答案" prop="real_answer">
          <a-radio-group v-model="formData.real_answer">
            <a-radio v-for="(item, index) in formData.options" :key="index" :value="item.code">
              {{ item.code }}
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'CHECKBOX'">
        <a-form-model-item label="试题选项" prop="options">
          <div class="option" v-for="(item, index) in formData.options" :key="index">
            <div class="option__code">{{ item.code }}、</div>
            <div class="option__control">
              <rich-editor v-model="item.name" placeholder="请填写试题选项" />
            </div>
            <div class="option__del">
              <a-button type="link" icon="delete" @click="removeOption(index)" />
            </div>
          </div>
          <a-button
            v-if="formData.options.length < 10"
            icon="plus"
            type="link"
            style="margin-left: 14px"
            @click="addOption"
          >
            创建选项
          </a-button>
        </a-form-model-item>
        <a-form-model-item label="答案" prop="real_answer">
          <a-checkbox-group v-model="formData.real_answer">
            <a-checkbox v-for="(item, index) in formData.options" :key="index" :value="item.code">
              {{ item.code }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'BOOLEAN'">
        <a-form-model-item label="答案" prop="real_answer">
          <a-radio-group v-model="formData.real_answer">
            <a-radio value="1">正确</a-radio>
            <a-radio value="0">错误</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'BLANK'">
        <a-form-model-item label="答案" prop="real_answer">
          <a-input v-model="formData.real_answer" placeholder="请填写答案" :max-length="100" />
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'SORT'">
        <a-form-model-item label="试题选项" prop="options">
          <div class="option" v-for="(item, index) in formData.options" :key="index">
            <div class="option__code">{{ item.code }}、</div>
            <div class="option__control">
              <rich-editor v-model="item.name" placeholder="请填写试题选项" />
            </div>
            <div class="option__del">
              <a-button type="link" icon="delete" @click="removeOption(index)" />
            </div>
          </div>
          <a-button
            v-if="formData.options.length < 10"
            icon="plus"
            type="link"
            style="margin-left: 14px"
            @click="addOption"
          >
            创建选项
          </a-button>
        </a-form-model-item>
        <a-form-model-item
          label="答案"
          prop="real_answer"
          extra="格式大写，长度等于试题选项的个数，不能包含重复项"
        >
          <rich-editor v-model="formData.real_answer" placeholder="请填写答案" :max-length="100" />
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'ANSWER'">
        <a-form-model-item label="答案" prop="real_answer">
          <rich-editor v-model="formData.real_answer" placeholder="请填写答案" :max-length="100" />
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'ESSAY_QUESTION'">
        <a-form-model-item label="答案" prop="real_answer">
          <rich-editor v-model="formData.real_answer" placeholder="请填写答案" :max-length="100" />
        </a-form-model-item>
      </template>

      <template v-if="formData.type === 'CALC'">
        <a-form-model-item label="答案" prop="real_answer">
          <rich-editor v-model="formData.real_answer" placeholder="请填写答案" :max-length="100" />
        </a-form-model-item>
      </template>

      <a-form-model-item label="解析" prop="explain">
        <rich-editor v-model="formData.explain" placeholder="请填写解析" :max-length="300" />
      </a-form-model-item>
      <a-form-model-item label="考点" prop="points" extra="小提示: 如需新增考点, 输入内容后按回车添加">
        <a-select mode="tags" v-model="formData.points" placeholder="请选择考点">
          <a-select-option v-for="item in points" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="对应章节" prop="from_chapter">
        <a-input v-model="formData.from_chapter" placeholder="请填写对应章节" :max-length="300" />
      </a-form-model-item>
      <a-form-model-item label="难易程度" prop="level">
        <a-radio-group v-model="formData.level">
          <a-radio v-for="(val, key) in enums.levelMap" :key="key" :value="key">{{ val }}</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>

    <footer-tool-bar>
      <a-button :loading="submitting" @click="goBack">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </a-card>
</template>

<script>
import RichEditor from "@/components/RichEditor";
import { levelMap, questionMap } from "@/utils/const";
import { _ } from "@/utils";
import { formRules } from "./const";
import * as Util from "./util";

export default {
  name: "QuestionForm",
  components: { RichEditor },
  data() {
    return {
      loading: false,
      submitting: false,

      libraryId: "", // 题库ID
      questionId: "", // 试题ID
      info: null, // 题库信息
      points: [], // 考点

      enums: {
        questionMap,
        levelMap,
      },

      formData: {
        name: "",
        type: "",
        options: [],
        real_answer: "",
        explain: "",
        points: [],
        from_chapter: "",
        level: "EASY",
      },
      formRules: formRules,
    };
  },
  async mounted() {
    const { libraryId, questionId } = this.$route.params;
    this.libraryId = libraryId;
    this.questionId = questionId;
    await this.fetchPoints();
    await this.fetchDetail();

    if (questionId) {
      // 回填表单
      this.questionId = questionId;
      const question = this.info.questions.find((item) => item.id === questionId);
      this.formData = _.pick(question, Object.keys(this.formData));
    } else {
      // 设置默认值
      const defaultType = "RADIO";
      this.formData.type = defaultType;
      this.formData.options = Util.getOptions(defaultType);
    }
  },
  methods: {
    onTypeChange(evt) {
      const type = evt.target.value;
      this.formData.real_answer = Util.getRealAnswer(type);
      this.formData.options = Util.getOptions(type);
    },

    addOption() {
      const newOptions = [...this.formData.options, { code: "", name: "" }];
      this.formData.options = Util.regenerateCodes(newOptions);
    },

    removeOption(index) {
      const newOptions = this.formData.options.filter((item, i) => i !== index);
      this.formData.options = Util.regenerateCodes(newOptions);
    },

    goBack() {
      this.$router.go(-1);
    },

    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/repo/library/${this.libraryId}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.info = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchPoints() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: `/repo/library_util/points/${this.libraryId}`,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.points = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.submitting = true;
        const fd = _.cloneDeep(this.formData);
        if (fd.type === "CHECKBOX") {
          fd.real_answer = fd.real_answer.join(",");
        }
        try {
          let promise;
          if (this.questionId) {
            promise = this.$http({
              method: "PUT",
              url: `/repo/library/${this.libraryId}/question/${this.questionId}`,
              data: fd,
            });
          } else {
            promise = this.$http({
              method: "POST",
              url: `/repo/library/${this.libraryId}/question`,
              data: fd,
            });
          }
          const res = await promise;
          if (res.code !== 200) {
            this.$message.warning(res.message);
            return;
          }
          this.$message.success(res.message);
          await this.$router.push(`/repo/library/${this.libraryId}/questions`);
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

<style lang="less" scoped>
.option {
  position: relative;
  padding: 0 50px 0 30px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &__code {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30px;
    display: flex;
    align-items: center;
  }

  &__control {
  }

  &__del {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
