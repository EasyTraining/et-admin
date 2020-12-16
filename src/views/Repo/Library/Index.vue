<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="setModalVisible(true)">创建题库</a-button>
    </p>

    <a-table
      size="small"
      row-key="id"
      :columns="tableColumns"
      :data-source="tableData"
      :loading="loading"
      :pagination="tablePager"
      :scroll="{ x: 1300 }"
      @change="onTableChange"
    >
      <template slot="count" slot-scope="text, record">
        <type-counter :count="record.count" />
      </template>
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;">考点</a>
        <a-divider type="vertical" />
        <router-link :to="'/repo/library/' + record.id + '/questions'">试题</router-link>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="showEditModal(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal
      :keyboard="false"
      :width="600"
      centered
      v-model="modalVisible"
      :title="modalForm.id ? '编辑题库' : '创建题库'"
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
        <a-form-model-item label="题库备注" prop="remark">
          <a-textarea
            v-model="modalForm.remark"
            :max-length="300"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请填写题库备注"
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
import TypeCounter from "./components/TypeCounter";

export default {
  name: "LibraryIndex",
  components: { TypeCounter },
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
        const res = await this.$http({ method: "GET", url: "/repo/library" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        const { total, data } = res.data;
        this.tableData = data;
        this.tablePager.total = total;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/repo/library/${id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.warning(e.message);
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
            ? await this.$http({ method: "PUT", url: `/repo/library/${id}`, data: rest })
            : await this.$http({ method: "POST", url: "/repo/library", data: rest });
          if (res.code !== 200) {
            this.$message.warning(res.message);
            return;
          }
          this.$message.success(res.message);
          this.setModalVisible(false);
          await this.fetchTableData();
        } catch (e) {
          this.$message.warning(e.message);
        }
      });
    },
  },
};
</script>
