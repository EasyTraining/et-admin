<template>
  <a-card :loading="mounting">
    <a-row :gutter="15">
      <a-col :span="6">
        <a-tree
          show-line
          default-expand-all
          :tree-data="treeData"
          :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
        />
      </a-col>
      <a-col :span="18">
        <a-table
          size="small"
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
              checked-children="已启用"
              un-checked-children="已停用"
              @change="switchStatus(record)"
            />
          </template>
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="onReset(record)">重置密码</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="onRemove(record)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-card>
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

      tableColumns: employeeTableColumns,
      tableData: [],
    };
  },
  async mounted() {
    this.mounting = true;
    await this.fetchTreeData();
    await this.fetchTableData();
    this.mounting = false;
  },
  methods: {
    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/hr/org_util/org_employee_tree" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.treeData = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/hr/employee" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        const { total, data } = res.data;
        this.tableData = data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
