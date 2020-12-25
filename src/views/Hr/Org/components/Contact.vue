<template>
  <div>
    <p>
      <router-link to="/hr/employee/add">
        <a-button type="primary" icon="plus">添加员工</a-button>
      </router-link>
    </p>
    <a-card :loading="mounting">
      <a-row :gutter="15">
        <a-col :span="6">
          <a-tree
            show-line
            default-expand-all
            :tree-data="treeData"
            :replace-fields="{ title: 'name_with_count', key: 'id', value: 'id' }"
            @select="onOrgSelect"
          />
        </a-col>
        <a-col :span="18">
          <a-table
            size="small"
            row-key="id"
            :columns="tableColumns"
            :data-source="tableData"
            :loading="loading"
            :pagination="tablePager"
            @change="onTableChange"
          >
            <template slot="action" slot-scope="text, record">
              <router-link :to="'/hr/employee/detail/' + record.id">查看</router-link>
              <a-divider type="vertical" />
              <router-link :to="'/hr/employee/edit/' + record.id">编辑</router-link>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { employeeTableColumns } from "../const";

export default {
  name: "Contact",
  data() {
    return {
      mounting: false,
      treeData: [],
      curOrgId: "",
      loading: false,

      tableColumns: employeeTableColumns,
      tableData: [],
      tablePager: {
        current: 1,
        pageSize: 30,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
      },
    };
  },
  async mounted() {
    this.mounting = true;
    await this.fetchTreeData();
    await this.fetchTableData();
    this.mounting = false;
  },
  methods: {
    onOrgSelect(org_ids) {
      if (org_ids.length) {
        this.curOrgId = org_ids[0];
        this.fetchTableData();
      }
    },

    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/hr/org_util/tree",
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.treeData = res.data;
        if (this.treeData) {
          this.curOrgId = this.treeData[0].id;
        }
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({
          method: "GET",
          url: "/hr/employee",
          params: { current, pageSize, org_id: this.curOrgId },
        });
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
  },
};
</script>
