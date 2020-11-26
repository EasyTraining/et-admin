<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="setModalVisible(true)">新增题库</a-button>
      <a-button icon="import">导入题库</a-button>
    </p>

    <a-card>
      <a-table
        :columns="tableColumns"
        row-key="_id"
        :data-source="tableData"
        :loading="loading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="启用中"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
        </template>
        <template slot="action" slot-scope="text, record">
          <router-link :to="'/exam/library/' + record._id + '/questions'">题目管理</router-link>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="showEditModal(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <a-modal
      :keyboard="false"
      :width="600"
      centered
      v-model="modalVisible"
      :title="modalForm._id ? '编辑题库' : '新增题库'"
      @cancel="setModalVisible(false)"
      @ok="onModalOk"
    >
      <a-form-model
        ref="modalForm"
        :model="modalForm"
        :rules="modalRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-form-model-item label="题库名称" prop="name">
          <a-input v-model="modalForm.name" :max-length="100" placeholder="请填写题库名称" />
        </a-form-model-item>
        <a-form-model-item label="题库简介" prop="desc">
          <a-textarea
            v-model="modalForm.desc"
            :max-length="300"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请填写题库简介"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { tableColumns } from "./const";
import { modalRules } from "./const";
import { _ } from "@/utils";

export default {
  name: "LibraryIndex",
  data() {
    return {
      loading: false,

      tableColumns,
      tableData: [],
      tablePager: {
        current: 1,
        pageSize: 30,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
      },

      modalVisible: false,
      modalForm: {
        _id: "",
        name: "",
        desc: "",
      },
      modalRules,
    };
  },
  mounted() {
    this.fetchTableData();
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({ method: "GET", url: "/exam/library", params: { current, pageSize } });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const { total, data } = res.data;
        this.tableData = data;
        this.tablePager.total = total;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async remove({ _id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/exam/library/${_id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async switchStatus({ _id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "PUT", url: `/exam/library/${_id}/enable`, data: { enable } });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    setModalVisible(visible) {
      this.modalVisible = visible;
      if (!visible) {
        this.modalForm = {
          _id: "",
          name: "",
          desc: "",
        };
        this.$refs.modalForm.resetFields();
      }
    },

    showEditModal(data) {
      this.modalForm = _.cloneDeep(data);
      this.setModalVisible(true);
    },

    onModalOk() {
      this.$refs.modalForm.validate(async (valid) => {
        if (!valid) return;
        try {
          const { _id, ...rest } = this.modalForm;
          const res = _id
            ? await this.$http({ method: "PUT", url: `/exam/library/${_id}`, data: rest })
            : await this.$http({ method: "POST", url: "/exam/library", data: rest });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.setModalVisible(false);
          await this.fetchTableData();
        } catch (e) {
          this.$message.error(e.message);
        }
      });
    },
  },
};
</script>
