<template>
  <div>
    <a-tabs v-model="curKlassId" @change="onKlassChange">
      <a-tab-pane v-for="klass in klassList" :key="klass.id" :tab="klass.name" />
    </a-tabs>

    <a-card title="班级信息">
      <a-descriptions>
        <a-descriptions-item label="班级名称">{{ curKlassInfo.name }}</a-descriptions-item>
        <a-descriptions-item label="班主任">{{ curKlassInfo.leader_id }}</a-descriptions-item>
        <a-descriptions-item label="班级广播">
          <a
            href="javascript:;"
            v-if="curKlassInfo && curKlassInfo.broadcasts"
            @click="showHistoryModal"
          >
            {{ curKlassInfo.broadcasts.length }} 条
          </a>
          <a-button type="link" @click="createBroadcast">发布广播</a-button>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions>
        <a-descriptions-item label="班级描述">
          {{ curKlassInfo.description }}
        </a-descriptions-item>
        <a-descriptions-item label="班级备注">{{ curKlassInfo.remark }}</a-descriptions-item>
        <a-descriptions-item label="邀请码">
          <span>{{ curKlassInfo.invite_code }}</span>
          <a-button type="link">生成邀请码</a-button>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="学员档案">
      <a slot="extra" href="javascript:;" @click="fetchTableData">刷新数据</a>
      <a-table
        row-key="id"
        :columns="tableColumns"
        :data-source="tableData"
        :loading="studentLoading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="name" slot-scope="text, record">
          <router-link :to="'/school/student/detail/' + record.id">{{ record.name }}</router-link>
        </template>
        <template slot="enable" slot-scope="text, record">
          <a-tag v-if="record.enable" color="green">启用中</a-tag>
          <a-tag v-else>已停用</a-tag>
        </template>
        <template slot="sos_name" slot-scope="text, record">
          {{ record.sos_name }}/{{ record.sos_phone }}
        </template>
      </a-table>
    </a-card>

    <broadcast-modal
      :visible="broadcastVisible"
      :klass-id="curKlassId"
      @cancel="closeBroadcastModal"
      @ok="onBroadcastModalOk"
    />

    <history-modal
      :visible="historyVisible"
      :broadcasts="curKlassInfo.broadcasts"
      @cancel="closeHistoryModal"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import BroadcastModal from "./components/BroadcastModal";
import HistoryModal from "./components/HistoryModal";

export default {
  name: "StudentIndex",
  components: { BroadcastModal, HistoryModal },
  data() {
    return {
      klassLoading: false,
      studentLoading: false,

      curKlassId: "",
      curKlassInfo: {},
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

      broadcastVisible: false,

      historyVisible: false,
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
      this.fetchKlassInfo();
      this.fetchTableData();
    },

    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: `/school/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.klassList = res.data || [];
        if (this.klassList.length) {
          this.curKlassId = this.klassList[0].id;
          await this.fetchKlassInfo();
          await this.fetchTableData();
        }
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchKlassInfo() {
      this.klassLoading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: `/school/klass/${this.curKlassId}`,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.curKlassInfo = res.data;
      } catch (e) {
        this.$message.warning(e.message);
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
          url: "/school/student",
          params: { current, pageSize, klass_id: this.curKlassId },
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
        this.studentLoading = false;
      }
    },

    async switchStatus({ id, enable }) {
      this.studentLoading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/teach/course/${id}/enable`,
          data: { enable },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        await this.fetchTableData();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.studentLoading = false;
      }
    },

    createBroadcast() {
      this.broadcastVisible = true;
    },

    closeBroadcastModal() {
      this.broadcastVisible = false;
    },

    onBroadcastModalOk() {
      this.fetchKlassInfo();
    },

    showHistoryModal() {
      this.historyVisible = true;
    },

    closeHistoryModal() {
      this.historyVisible = false;
    },
  },
};
</script>
