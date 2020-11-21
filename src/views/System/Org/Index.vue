<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="setModalVisible(true)">添加组织架构</a-button>
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
      :title="modalForm.id ? '编辑组织架构' : '添加组织架构'"
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
        <a-form-model-item label="父节点" prop="parent">
          <a-tree-select
            v-model="modalForm.parent"
            :tree-data="orgTreeData"
            :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            allow-clear
            tree-default-expand-all
            style="width: 100%"
            search-placeholder="请选择父节点"
          />
        </a-form-model-item>
        <a-form-model-item label="菜单" prop="menu">
          <a-alert message="必配菜单: 控制台、个人中心" banner />
          <a-tree-select
            v-model="modalForm.menu"
            :tree-data="menuTreeData"
            :replace-fields="{ title: 'title', key: 'id', value: 'id' }"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            allow-clear
            tree-default-expand-all
            tree-checkable
            style="width: 100%"
            search-placeholder="请选择菜单"
          />
        </a-form-model-item>
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="modalForm.name" placeholder="请填写名称" />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="desc">
          <a-textarea v-model="modalForm.desc" :auto-size="{ minRows: 3, maxRows: 5 }" placeholder="请填写描述" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { _ } from "@/utils";
import { tableColumns, modalRules } from "./const";

export default {
  name: "OrgIndex",
  data() {
    return {
      mounting: false,

      tableColumns,
      tableData: [],
      loading: false,

      modalVisible: false,
      orgTreeData: [],
      menuTreeData: [],
      modalForm: {
        id: "",
        parent: undefined,
        name: "",
        desc: "",
      },
      modalRules,
    };
  },
  async mounted() {
    this.mounting = true;
    await this.fetchOrgTreeData();
    await this.fetchMenuTreeData();
    await this.fetchList();
    this.mounting = false;
  },
  methods: {
    async fetchOrgTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/role/tree" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.orgTreeData = [res.data];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchMenuTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/menu/tree" });
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
        const res = await this.$http({ method: "POST", url: "/role/get", data: fd });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        const tableData = (res.data || []).filter((item) => item.name !== "组织架构");
        this.tableData = tableData;
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
          const fd = _.cloneDeep(this.modalForm);
          if (!fd.id) delete fd.id;
          const res = await this.$http({ method: "POST", url: "/role", data: fd });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          this.setModalVisible(false);
          await this.fetchOrgTreeData();
          await this.fetchList();
        } catch (e) {
          this.$message.error(e.message);
        }
      });
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/role?id=${id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.fetchOrgTreeData();
        await this.fetchList();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
