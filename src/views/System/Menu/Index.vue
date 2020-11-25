<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="setModalVisible(true)">新增菜单</a-button>
    </p>

    <a-card :loading="mounting">
      <a-table :columns="tableColumns" row-key="id" :data-source="tableData" :loading="loading">
        <template slot="action" slot-scope="text, record">
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
      :title="modalForm.id ? '编辑菜单' : '新增菜单'"
      @cancel="setModalVisible(false)"
      @ok="onModalOk"
    >
      <a-form-model
        ref="modalForm"
        :model="modalForm"
        :rules="modalRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="上级菜单" prop="parent">
          <a-tree-select
            v-model="modalForm.parent"
            :tree-data="menuTreeData"
            :replace-fields="{ title: 'title', key: 'id', value: 'id' }"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            allow-clear
            tree-default-expand-all
            style="width: 100%"
            search-placeholder="请选择上级菜单"
          />
        </a-form-model-item>
        <a-form-model-item label="名称" prop="title">
          <a-input v-model="modalForm.title" placeholder="请填写名称" />
        </a-form-model-item>
        <a-form-model-item label="标识" prop="name">
          <a-input v-model="modalForm.name" placeholder="请填写标识" />
        </a-form-model-item>
        <a-form-model-item label="附加数据" prop="meta">
          <a-textarea v-model="modalForm.meta" :auto-size="{ minRows: 3, maxRows: 5 }" placeholder="请填写描述" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { _ } from "@/utils";
import { tableColumns, modalRules } from "./const";

export default {
  name: "MenuIndex",
  data() {
    return {
      mounting: false,
      loading: false,

      // 表格
      tableColumns,
      tableData: [],

      // 弹窗
      modalVisible: false,
      menuTreeData: [],
      modalForm: {
        id: "",
        parent: undefined,
        title: "",
        name: "",
        meta: "",
      },
      modalRules,
    };
  },
  async mounted() {
    this.mounting = true;
    await this.fetchTreeData();
    await this.fetchList();
    this.mounting = false;
  },
  methods: {
    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/system/menu/tree" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.menuTreeData = [res.data];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchList() {
      this.loading = true;
      try {
        const fd = { current: 1, pagesize: 1000 };
        const res = await this.$http({ method: "POST", url: "/system/menu/get", data: fd });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const tableData = (res.data || []).filter((item) => item.title !== "菜单目录");
        this.tableData = tableData;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/system/menu?id=${id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.fetchList();
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
          parent: undefined,
          title: "",
          name: "",
          meta: "",
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
          const fd = _.cloneDeep(this.modalForm);
          if (!fd.id) delete fd.id;
          const res = await this.$http({ method: "POST", url: "/system/menu", data: fd });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          this.setModalVisible(false);
          await this.fetchList();
        } catch (e) {
          this.$message.error(e.message);
        }
      });
    },
  },
};
</script>
