<template>
  <div>
    <div class="page__actions">
      <a-button type="primary" icon="plus" @click="modalVisible = true">新增题目</a-button>
    </div>
    <a-card>
      <a-row :gutter="15">
        <a-col :span="4">
          <a-statistic title="试卷题数" :value="analysis.questionCount">
            <template #suffix>道</template>
          </a-statistic>
        </a-col>
        <a-col :span="4">
          <a-statistic title="试卷总分数" :value="analysis.gradeCount">
            <template #suffix>分</template>
          </a-statistic>
        </a-col>
        <a-col :span="4">
          <a-statistic title="困难题目占比" :value="analysis.hardPercent">
            <template #suffix>%</template>
          </a-statistic>
        </a-col>
      </a-row>
    </a-card>
    <a-card :body-style="{ padding: 0 }">
      <a-table :columns="tableColumns" row-key="id" :data-source="tableData" :loading="loading" :pagination="false">
        <template slot="sort" slot-scope="text, record">
          <a-input-number v-model="record.sort" size="small" :min="1" style="width: 70px" @blur="sort(record)" />
        </template>
        <template slot="type" slot-scope="text, record">
          <span>{{ record.type | questionTypeToLabel }}</span>
        </template>
        <template slot="level" slot-scope="text, record">
          <a-tag v-if="record.level === 'EASY'" color="green">{{ record.level | levelToLabel }}</a-tag>
          <a-tag v-if="record.level === 'NORMAL'" color="blue">{{ record.level | levelToLabel }}</a-tag>
          <a-tag v-if="record.level === 'HARD'" color="red">{{ record.level | levelToLabel }}</a-tag>
        </template>
        <template slot="grade" slot-scope="text, record">
          <a-input-number v-model="record.grade" size="small" :min="1" style="width: 70px" @blur="calcGrade" />
        </template>
        <div class="actions" slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="remove(record)">删除</a>
        </div>
      </a-table>
    </a-card>

    <footer-tool-bar>
      <a-button :loading="submitting" @click="goBack">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>

    <a-modal
      :keyboard="false"
      :width="800"
      centered
      v-model="modalVisible"
      title="新增题目"
      @cancel="modalVisible = false"
      @ok="setQuestions"
    >
      <div class="library__wrap">
        <a-row :gutter="15">
          <a-tabs v-model="activeLibraryId" tab-position="left">
            <a-tab-pane v-for="library in libraryList" :key="library.id" :tab="library.name">
              <div class="question" v-for="question in library.questions" :key="question.id">
                <div class="question__ckb">
                  <a-checkbox :checked="question.checked" @change="selectQuestion($event, library, question)" />
                </div>
                <div class="question__level">
                  <a-tag v-if="question.level === 'EASY'" color="green">{{ question.level | levelToLabel }}</a-tag>
                  <a-tag v-if="question.level === 'NORMAL'" color="blue">{{ question.level | levelToLabel }}</a-tag>
                  <a-tag v-if="question.level === 'HARD'" color="red">{{ question.level | levelToLabel }}</a-tag>
                </div>
                <div class="question__name">{{ question.name }}</div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { _ } from "@/utils";
import { questionColumns } from "./const";
import { calcAnalysis, initLibraryList, setQuestionCheck, uncheckQuestion, getCheckedQuestions } from "./util";

export default {
  name: "PaperForm",
  data() {
    return {
      loading: false,
      submitting: false,

      paperId: "",

      tableColumns: questionColumns,
      tableData: [],

      modalVisible: false,
      libraryList: [],
      activeLibraryId: "",

      analysis: {
        questionCount: 0,
        gradeCount: 0,
      },
    };
  },
  async mounted() {
    const { paperId } = this.$route.params;
    this.paperId = paperId;
    await this.fetchLibraryList();
    await this.fetchDetail();
  },
  methods: {
    sort() {
      this.tableData = this.tableData.sort((a, b) => a.sort - b.sort);
    },

    remove({ id }) {
      this.tableData = this.tableData.filter((item) => item.id !== id);
      this.libraryList = uncheckQuestion(this.libraryList, id);
      this.analysis = calcAnalysis(this.tableData);
    },

    calcGrade() {
      this.analysis = calcAnalysis(this.tableData);
    },

    selectQuestion(evt, library, question) {
      this.libraryList = setQuestionCheck(this.libraryList, library.id, question.id, evt.target.checked);
    },

    setQuestions() {
      this.tableData = getCheckedQuestions(this.libraryList);
      this.analysis = calcAnalysis(this.tableData);
      this.modalVisible = false;
    },

    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/teach/paper/${this.paperId}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const { questions } = res.data;
        this.libraryList = initLibraryList(this.libraryList, questions);
        this.tableData = questions;
        this.analysis = calcAnalysis(this.tableData);
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchLibraryList() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/exam/search/library", params: { enable: true } });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.libraryList = res.data;
        // 默认选择第一个试卷库
        if (this.libraryList.length) {
          this.activeLibraryId = this.libraryList[0].id;
        }
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    async submit() {
      this.submitting = true;
      // 丢弃 id 字段, 由数据库自动生成
      const questions = _.cloneDeep(this.tableData).map(({ id, ...rest }) => rest);
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/teach/paper/${this.paperId}/questions`,
          data: { questions },
        });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchDetail();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.library__wrap {
  max-height: 500px;
  overflow-y: auto;
}

.question {
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 80px;
  padding-right: 10px;
  margin-bottom: 10px;

  &__ckb {
    position: absolute;
    top: 6px;
    left: 0;
  }

  &__level {
    position: absolute;
    top: 5px;
    left: 28px;
  }

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.actions {
  button {
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>
