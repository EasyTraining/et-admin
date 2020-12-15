<template>
  <div>
    <a-card>
      <div class="filter">
        <div class="filter__item">
          <a-select v-model="query.klass_id" style="width: 200px" placeholder="请选择班级">
            <a-select-option v-for="klass in klassList" :key="klass.id" :value="klass.id">
              {{ klass.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="filter__item">
          <a-input v-model="query.name" style="width: 200px" placeholder="请填写姓名" />
        </div>
        <div class="filter__item">
          <a-input v-model="query.phone" style="width: 200px" placeholder="请填写手机号码" />
        </div>
        <div class="filter__item">
          <a-button :loading="loading" type="primary" @click="search">查询</a-button>
          <a-button :loading="loading" @click="reset">重置</a-button>
        </div>
      </div>

      <p>
        <router-link :to="'/school/student/add?klass_id=' + curKlassId">
          <a-button type="primary" icon="plus">创建学员</a-button>
        </router-link>
      </p>

      <a-table
        :columns="tableColumns"
        :scroll="{ x: 1100 }"
        row-key="id"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      >
        <template slot="name" slot-scope="text, record">
          <a-avatar v-if="record.avatar_url" size="small" :src="record.avatar_url" />
          <a-avatar v-else size="small">{{ record.name }}</a-avatar>
          <router-link style="margin-left: 5px" :to="'/school/student/detail/' + record.id">
            {{ record.name }}
          </router-link>
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
          <a href="javascript:;" @click="showResetModal(record)">重置密码</a>
          <a-divider type="vertical" />
          <router-link :to="'/school/student/edit/' + record.id">编辑</router-link>
          <a-divider type="vertical" />
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <reset-modal
      :visible="resetVisible"
      :initial-values="currentRow"
      @cancel="closeResetModal"
      @ok="onResetOk"
    />
  </div>
</template>

<script>
import ResetModal from "./components/ResetModal";
import { tableColumns } from "./const";

export default {
  name: "StudentIndex",
  components: { ResetModal },
  data() {
    return {
      loading: false,

      curKlassId: "",
      klassList: [],

      query: {
        klass_id: undefined,
        name: undefined,
        phone: undefined,
      },

      tableColumns,
      tableData: [],

      resetVisible: false,
      currentRow: null,
    };
  },
  async mounted() {
    await this.fetchKlassList();
    await this.fetchTableData();
  },
  methods: {
    search() {
      this.fetchTableData();
    },

    reset() {
      this.query.name = undefined;
      this.query.phone = undefined;
      this.search();
    },

    showResetModal(row) {
      this.currentRow = row;
      this.resetVisible = true;
    },

    closeResetModal() {
      this.resetVisible = false;
    },

    onResetOk() {
      this.search();
      this.closeResetModal();
    },

    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: `/school/klass_util/simple_list` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.klassList = res.data || [];
        const { klass_id } = this.$route.query;
        if (klass_id) {
          this.query.klass_id = klass_id;
          return;
        }
        if (this.klassList.length) {
          this.query.klass_id = this.klassList[0].id;
        }
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/school/student",
          params: this.query,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.tableData = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "DELETE", url: `/school/student/${id}` });
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

    async switchStatus({ id, enable }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/school/student/${id}/enable`,
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
        this.loading = false;
      }
    },
  },
};
</script>
