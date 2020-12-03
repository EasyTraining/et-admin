<template>
  <div>
    <a-card>
      <span>班级：</span>
      <a-select
        v-model="currentKlassId"
        show-search
        placeholder="请选择可见班级"
        style="width: 200px"
        @change="onKlassChange"
      >
        <a-select-option v-for="klass in klassList" :key="klass.id" :value="klass.id">
          {{ klass.name }}
        </a-select-option>
      </a-select>
    </a-card>

    <a-card :loading="klassLoading" title="班级信息">
      <a slot="extra" href="javascript:;">编辑</a>
      <a-descriptions>
        <a-descriptions-item label="班级名称">{{ currentKlassInfo.name }}</a-descriptions-item>
        <a-descriptions-item label="班主任">{{ currentKlassInfo.leader_id }}</a-descriptions-item>
        <a-descriptions-item label="班级广播">
          <a href="javascript:;">{{ currentKlassInfo.broadcasts.length }} 条</a>
          <a-button type="link">发布广播</a-button>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions>
        <a-descriptions-item label="班级描述">{{ currentKlassInfo.description }}</a-descriptions-item>
        <a-descriptions-item label="班级备注">{{ currentKlassInfo.remark }}</a-descriptions-item>
        <a-descriptions-item label="邀请码">
          <span>{{ currentKlassInfo.invite_code }}</span>
          <a-button type="link">生成邀请码</a-button>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="学员档案">
      <a-table
        :columns="tableColumns"
        row-key="id"
        :data-source="tableData"
        :loading="studentLoading"
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
          <a href="javascript:;">学员档案</a>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "OrgIndex",
  data() {
    return {
      klassLoading: false,
      studentLoading: false,

      currentKlassId: "",
      currentKlassInfo: {},
      klassList: [],

      tableColumns,
      tableData: [],
      tablePager: {
        current: 1,
        pageSize: 30,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
      },

      updateModalVisible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchKlassList();
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    onKlassChange() {
      this.fetchKlassList();
    },

    onAdd() {
      this.updateModalVisible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.updateModalVisible = true;
    },

    async onRemove({ id }) {
      this.studentLoading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/teach/course/${id}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.studentLoading = false;
      }
    },

    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: `/system/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.klassList = res.data || [];
        if (this.klassList.length) {
          this.currentKlassId = this.klassList[0].id;
          await this.fetchKlassInfo();
          await this.fetchTableData();
        }
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async fetchKlassInfo() {
      this.klassLoading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/system/klass/${this.currentKlassId}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.currentKlassInfo = res.data;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.klassLoading = false;
      }
    },

    async fetchTableData() {
      this.studentLoading = true;
      try {
        const { current, pageSize } = this.tablePager;
        const res = await this.$http({
          method: "GET",
          url: "/teach/course",
          params: { current, pageSize, klass_id: this.currentKlassId },
        });
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
        this.studentLoading = false;
      }
    },

    async switchStatus({ id, enable }) {
      this.studentLoading = true;
      try {
        const res = await this.$http({ method: "PUT", url: `/teach/course/${id}/enable`, data: { enable } });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        await this.fetchTableData();
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.studentLoading = false;
      }
    },

    closeUpdateModal() {
      this.updateModalVisible = false;
      this.editedRecord = null;
    },

    async onUpdateModalOk() {
      await this.fetchTableData();
    },
  },
};
</script>
