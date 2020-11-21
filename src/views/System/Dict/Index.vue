<template>
  <div>
    <a-card :loading="mounting">
      <p>
        <span>字典类型：</span>
        <a-select
          v-model="selectedDictType"
          style="width: 200px"
          show-search
          placeholder="请选择字典类型"
          @change="onSelectDictType"
        >
          <a-select-option v-for="(item, index) in dictTypes" :key="index" :value="item">{{ item }}</a-select-option>
        </a-select>
      </p>
      <a-table :columns="tableColumns" row-key="id" :data-source="tableData" :loading="loading">
        <template slot="status" slot-scope="text, record">
          <a-switch
            :checked="record.enable"
            checked-children="已启用"
            un-checked-children="已停用"
            @change="switchStatus($event, record.id)"
          />
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
      mounting: false,
      loading: false,

      dictTypes: [],
      selectedDictType: undefined,

      tableColumns,
      tableData: [],
    };
  },
  async mounted() {
    this.mounting = true;
    await this.fetchDictTypes();
    this.mounting = false;
  },
  methods: {
    onSelectDictType() {
      this.fetchList();
    },

    async fetchDictTypes() {
      try {
        const res = await this.$http({ method: "GET", url: "/system/dic_types" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.dictTypes = res.data || [];
        if (this.dictTypes.length) {
          this.selectedDictType = this.dictTypes[0];
          await this.fetchList();
        }
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async fetchList() {
      this.loading = true;
      try {
        const fd = { current: 1, pagesize: 1000, type: this.selectedDictType };
        const res = await this.$http({ method: "POST", url: "/system/dic_list", data: fd });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.tableData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async switchStatus(enable, id) {
      this.loading = true;
      try {
        const res = await this.$http({ method: "POST", url: "/system/dic_update", data: { id, enable } });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
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
