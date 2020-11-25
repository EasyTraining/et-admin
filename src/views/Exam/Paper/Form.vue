<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/">控制台</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <router-link to="/exam/paper">试卷管理</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ paperName }}</a-breadcrumb-item>
      <a-breadcrumb-item>题目管理</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page__actions">
      <a-button type="primary" icon="plus" @click="modalVisible = true">新增题目</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </div>
    <a-card>
      <a-table :columns="tableColumns" row-key="_id" :data-source="tableData" :loading="loading" :pagination="false">
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
        <div class="actions" slot="action" slot-scope="text, record, index">
          <a href="javascript:;" @click="remove(record)">删除</a>
        </div>
      </a-table>
    </a-card>

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
            <a-tab-pane v-for="library in libraryList" :key="library._id" :tab="library.name">
              <div class="question" v-for="question in library.questions" :key="question._id">
                <div class="question__ckb">
                  <a-checkbox v-model="question.checked" />
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
import { questionColumns } from "./const";
import { _ } from "@/utils";

export default {
  name: "PaperForm",
  data() {
    return {
      loading: false,
      submitting: false,

      paperId: "",
      paperName: "",

      tableColumns: questionColumns,
      tableData: [],

      modalVisible: false,
      libraryList: [],
      activeLibraryId: "",
    };
  },
  async mounted() {
    const { paperId } = this.$route.params;
    this.paperId = paperId;
    await this.fetchLibraryList();
    await this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/exam/paper/${this.paperId}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const { name, questions } = res.data;
        const selectedQuestionIds = questions.map((item) => item._id);
        this.libraryList = this.libraryList.map((library) => {
          library.questions = (library.questions || []).map((question) => {
            question.checked = selectedQuestionIds.includes(question._id);
            return question;
          });
          return library;
        });
        this.paperName = name;
        this.tableData = questions;
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
        if (this.libraryList.length) {
          this.activeLibraryId = this.libraryList[0]._id;
        }
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    sort() {
      this.tableData = this.tableData.sort((a, b) => a.sort - b.sort);
    },

    remove({ _id }) {
      this.tableData = this.tableData.filter((item) => item._id !== _id);
      this.libraryList = this.libraryList.map((library) => {
        library.questions = (library.questions || []).map((question) => {
          if (question._id === _id) {
            question.checked = false;
          }
          return question;
        });
        return library;
      });
    },

    setQuestions() {
      const questions = [];
      this.libraryList.forEach((library) => {
        (library.questions || []).forEach((question) => {
          const { checked, ...rest } = question;
          if (checked) {
            questions.push({
              ...rest,
              library_name: library.name,
              sort: question.sort || 1,
            });
          }
        });
      });
      this.tableData = questions;
      this.modalVisible = false;
    },

    cancel() {
      this.$router.go(-1);
    },

    async submit() {
      this.submitting = true;
      const questions = _.cloneDeep(this.tableData).map((item) => _.omit(item, ["_id"]));
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/exam/paper/${this.paperId}/questions`,
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
