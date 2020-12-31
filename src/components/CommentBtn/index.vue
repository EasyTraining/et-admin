<template>
  <span>
    <a href="javascript:;" @click="showModal">评论</a>

    <a-modal
      v-model="visible"
      centered
      :keyboard="false"
      :width="1000"
      :footer="null"
      title="评论管理"
      @cancel="closeModal"
    >
      <a-table
        size="small"
        row-key="id"
        :columns="tableColumns"
        :data-source="tableData"
        :loading="loading"
        :pagination="tablePager"
        @change="onTableChange"
      >
        <template slot="created_name" slot-scope="text, record">
          <a-avatar v-if="record.created_avatar" size="small" :src="record.created_avatar" />
          <a-avatar v-else size="small">{{ record.created_name }}</a-avatar>
          <span style="margin-left: 8px">{{ record.created_name }}</span>
        </template>
        <template slot="status" slot-scope="text, record">
          <a-select
            :value="record.status"
            style="width: 140px"
            @change="switchStatus($event, record.id)"
          >
            <a-select-option value="DRAFT">待审核</a-select-option>
            <a-select-option value="PUBLISH">审核通过</a-select-option>
            <a-select-option value="HOT">精选评论</a-select-option>
            <a-select-option value="GARBAGE">垃圾/无意义/无效</a-select-option>
          </a-select>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm title="删除以后无法恢复, 是否继续?" @confirm="remove(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-modal>
  </span>
</template>

<script>
import { tableColumns } from "./const";

export default {
  name: "CommentBtn",
  props: ["targetId", "type"],
  data() {
    return {
      loading: false,
      visible: false,

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
  methods: {
    showModal() {
      this.tableData = [];
      this.visible = true;
      this.fetchTableData();
    },

    closeModal() {
      this.tableData = [];
      this.visible = false;
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
          url: "/teach/comment",
          params: {
            current,
            pageSize,
            target_id: this.targetId,
            type: this.type,
          },
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

    async remove({ id }) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "DELETE",
          url: `/teach/comment/${id}`,
        });
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

    async switchStatus(status, id) {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "PUT",
          url: `/teach/comment/${id}`,
          data: { status },
        });
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
  },
};
</script>
