<template>
  <div>
    <div class="filter">
      <div class="filter__item">
        <a-select
          v-model="tableQuery.klass_id"
          show-search
          style="width: 200px"
          placeholder="请选择班级"
          @change="search"
        >
          <a-select-option v-for="klass in klassList" :key="klass.id" :value="klass.id">
            {{ klass.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter__item">
        <a-input v-model="tableQuery.name" style="width: 200px" placeholder="学员姓名关键字" />
      </div>
      <div class="filter__item">
        <a-button :loading="studentLoading" type="primary" @click="search">查询</a-button>
        <a-button :loading="studentLoading" @click="reset">重置</a-button>
      </div>
    </div>

    <a-card size="small" title="班级信息">
      <a-spin :spinning="klassLoading">
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
            <a-popconfirm title="刷新后旧邀请码将无法使用, 是否继续?" @confirm="genInviteCode">
              <a-button type="link">刷新邀请码</a-button>
            </a-popconfirm>
          </a-descriptions-item>
        </a-descriptions>
      </a-spin>
    </a-card>

    <a-card size="small" title="学员信息">
      <a-table
        size="small"
        row-key="id"
        :columns="tableColumns"
        :data-source="tableData"
        :loading="studentLoading"
        :pagination="false"
      >
        <template slot="name" slot-scope="text, record">
          <a-avatar v-if="record.avatar_url" size="small" :src="record.avatar_url" />
          <a-avatar v-else size="small">{{ record.name }}</a-avatar>
          <detail-btn style="margin-left: 5px" :key="record.id" :id="record.id">
            {{ record.name }}
          </detail-btn>
        </template>
        <template slot="enable" slot-scope="text, record">
          <a-switch
            v-model="record.enable"
            checked-children="启用中"
            un-checked-children="已停用"
            @change="switchStatus(record)"
          />
        </template>
        <template slot="sos_name" slot-scope="text, record">
          {{ record.sos_name }}/{{ record.sos_phone }}
        </template>
      </a-table>
    </a-card>

    <broadcast-modal
      :visible="broadcastVisible"
      :klass-id="tableQuery.klass_id"
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
import DetailBtn from "./components/DetailBtn";
import BroadcastModal from "./components/BroadcastModal";
import HistoryModal from "./components/HistoryModal";

export default {
  name: "StudentIndex",
  components: { DetailBtn, BroadcastModal, HistoryModal },
  data() {
    return {
      klassLoading: false,
      studentLoading: false,

      curKlassInfo: {},
      klassList: [],

      tableQuery: {
        klass_id: "",
        name: "",
      },
      tableColumns,
      tableData: [],

      broadcastVisible: false,

      historyVisible: false,
    };
  },
  async mounted() {
    await this.fetchKlassList();
  },
  methods: {
    search() {
      this.fetchKlassInfo();
      this.fetchTableData();
    },

    reset() {
      this.tableQuery.name = "";
      this.search();
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
          this.tableQuery.klass_id = this.klassList[0].id;
          await this.search();
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
          url: `/school/klass/${this.tableQuery.klass_id}`,
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
        const res = await this.$http({
          method: "GET",
          url: "/school/student",
          params: this.tableQuery,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.tableData = res.data;
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

    async genInviteCode() {
      this.klassLoading = true;
      try {
        const res = await this.$http({
          method: "POST",
          url: "/school/klass_util/gen_invite_code",
          data: { klass_id: this.tableQuery.klass_id },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success(res.message);
        await this.fetchKlassInfo();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.klassLoading = false;
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
