<template>
  <div>
    <p>
      <a-button type="primary" icon="plus" @click="onAdd">创建班级</a-button>
    </p>

    <a-row :gutter="15">
      <a-col :span="8" v-for="klass in tableData" :key="klass.id">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <template slot="actions" class="ant-card-actions">
            <a href="javascript:;" @click="onEdit(klass)">编辑</a>
            <router-link :to="'/school/student?klass_id=' + klass.id">学员管理</router-link>
          </template>
          <a-card-meta :description="klass.description">
            <span slot="title">{{ klass.name }} [{{ klass.leader_name }}]</span>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <update-modal
      :visible="updateModalVisible"
      :initial-values="editedRecord"
      @cancel="closeUpdateModal"
      @ok="onUpdateModalOk"
    />
  </div>
</template>

<script>
import { tableColumns } from "./const";
import UpdateModal from "./components/UpdateModal";

export default {
  name: "OrgIndex",
  components: { UpdateModal },
  data() {
    return {
      mounting: false,
      loading: false,

      tableColumns,
      tableData: [],

      updateModalVisible: false,
      editedRecord: null,
    };
  },
  async mounted() {
    await this.fetchTableData();
  },
  methods: {
    onAdd() {
      this.updateModalVisible = true;
    },

    onEdit(record) {
      this.editedRecord = record;
      this.updateModalVisible = true;
    },

    onInvite(record) {
      this.$confirm({
        title: "是否继续?",
        content: "激活码一天内有效",
        onOk: async () => {
          try {
            const res = await this.$http({
              method: "POST",
              url: "/school/klass_util/gen_invite_code",
              data: {
                klass_id: record.id,
              },
            });
            if (res.code !== 200) {
              this.$message.error(res.message);
              return;
            }
            this.$message.success("操作成功");
            await this.fetchTableData();
          } catch (e) {
            this.$message.error(e.message);
          }
        },
        onCancel: () => {},
      });
    },

    async fetchTableData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/school/klass" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.tableData = res.data;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    showTreeModal() {
      this.treeModalVisible = true;
    },

    closeTreeModal() {
      this.treeModalVisible = false;
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
