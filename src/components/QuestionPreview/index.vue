<template>
  <div class="preview" v-if="question">
    <div class="preview__title" v-html="question.name"></div>

    <div v-if="question.type === 'RADIO'" class="preview__options">
      <div class="option" v-for="(opt, index) in question.options" :key="index">
        <div class="option__ctrl">
          <a-radio disabled />
          <span>{{ opt.code }}.</span>
        </div>
        <div v-html="opt.name"></div>
      </div>
    </div>
    <div v-if="question.type === 'CHECKBOX'" class="preview__options">
      <div class="option" v-for="(opt, index) in question.options" :key="index">
        <div class="option__ctrl">
          <a-checkbox disabled />
          <span>{{ opt.code }}.</span>
        </div>
        <div v-html="opt.name"></div>
      </div>
    </div>
    <div v-if="question.type === 'SORT'" class="preview__options">
      <div class="option" v-for="(opt, index) in question.options" :key="index">
        <div class="option__ctrl">{{ opt.code }}.</div>
        <div v-html="opt.name"></div>
      </div>
    </div>

    <a-divider dashed />
    <div class="row">
      <div class="row__label">正确答案:</div>
      <div v-if="question.type === 'BOOLEAN'" class="row__value">
        <span v-if="question.real_answer === '1'">正确</span>
        <span v-if="question.real_answer === '0'">错误</span>
      </div>
      <div v-else class="row__value" v-html="question.real_answer"></div>
    </div>
    <div class="row">
      <div class="row__label">答案解析:</div>
      <div class="row__value">
        <a-alert type="info">
          <div slot="message" class="rich-wrapper" v-html="question.explain || '无'" />
        </a-alert>
      </div>
    </div>
    <div class="row">
      <div class="row__label">对应考点:</div>
      <div class="row__value">
        <template v-if="question.points && question.points.length">
          <a-tag v-for="item in question.points" :key="item">
            {{ item }}
          </a-tag>
        </template>
        <span v-else>无</span>
      </div>
    </div>
    <div class="row">
      <div class="row__label">对应章节:</div>
      <div class="row__value">{{ question.from_chapter || "无" }}</div>
    </div>
    <div class="row">
      <div class="row__label">难易程度:</div>
      <div class="row__value">{{ question.level | levelToLabel }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionPreview",
  props: ["question"],
};
</script>

<style lang="less" scoped>
.row {
  position: relative;
  padding-left: 80px;
  min-height: 25px;
  margin-bottom: 20px;

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    width: 80px;
  }
}

.preview {
  &__answer {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  &__options {
    margin-bottom: 30px;

    .option {
      position: relative;
      padding-left: 50px;

      &__ctrl {
        width: 50px;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;

        .ant-checkbox-wrapper {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
