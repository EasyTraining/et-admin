<template>
  <div>
    <a-tabs v-model="curKlassId" @change="onKlassChange">
      <a-tab-pane v-for="klass in klassList" :key="klass.id" :tab="klass.name" />
    </a-tabs>

    <p>
      <router-link :to="'/school/student/add?klass_id=' + curKlassId">
        <a-button type="primary" icon="plus">创建学员</a-button>
      </router-link>
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
        <template slot="name" slot-scope="text, record">
          <router-link :to="'/school/student/detail/' + record.id">{{ record.name }}</router-link>
        </template>
        <template slot="sos_name" slot-scope="text, record">
          {{ record.sos_name }}/{{ record.sos_phone }}
        </template>
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="启用中"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
        </template>
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;">重置密码</a>
          <a-divider type="vertical" />
          <router-link :to="'/school/student/edit/' + record.id">编辑</router-link>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "StudentIndex",
  data() {
    return {
      loading: false,

      curKlassId: "",
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
    };
  },
  async mounted() {
    await this.fetchKlassList();
    await this.fetchTableData();
  },
  methods: {
    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: `/school/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.klassList = res.data || [];
        const { klass_id } = this.$route.query;
        if (klass_id) {
          this.curKlassId = klass_id;
          return;
        }
        if (this.klassList.length) {
          this.curKlassId = this.klassList[0].id;
        }
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    onKlassChange() {
      this.fetchTableData();
    },

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
        const res = await this.$http({
          method: "GET",
          url: "/school/student",
          params: { klass_id: this.curKlassId, current, pageSize },
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
        this.loading = false;
      }
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/school/student/${id}` });
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
        const res = await this.$http({
          method: "PUT",
          url: `/school/student/${id}/enable`,
          data: { enable },
        });
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
  },
};
</script>
