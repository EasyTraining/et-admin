<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="setModalVisible(true)">新增试卷</a-button>
    </p>

    <a-card :body-style="{ padding: 0 }">
      <a-table
        :columns="tableColumns"
        row-key="id"
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
          <router-link :to="'/teach/paper/' + record.id + '/questions'">题目管理</router-link>
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
      :title="modalForm.id ? '编辑试卷' : '新增试卷'"
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
        <a-form-model-item label="试卷名称" prop="name">
          <a-input v-model="modalForm.name" :max-length="100" placeholder="请填写试卷名称" />
        </a-form-model-item>
        <a-form-model-item label="试卷备注" prop="remark">
          <a-textarea
            v-model="modalForm.remark"
            :max-length="300"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请填写试卷备注"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { _ } from "@/utils";
import { tableColumns } from "./const";
import { modalRules } from "./const";

export default {
  name: "PaperIndex",
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
        id: "",
        name: "",
        remark: "",
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
        const res = await this.$http({ method: "GET", url: "/teach/paper", params: { current, pageSize } });
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

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/teach/paper/${id}` });
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

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "PUT", url: `/teach/paper/${id}/enable`, data: { enable } });
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
          id: "",
          name: "",
          remark: "",
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
          const { id, ...rest } = this.modalForm;
          const res = id
            ? await this.$http({ method: "PUT", url: `/teach/paper/${id}`, data: rest })
            : await this.$http({ method: "POST", url: "/teach/paper", data: rest });
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
