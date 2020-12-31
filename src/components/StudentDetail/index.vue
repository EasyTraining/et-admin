<template>
  <div>
    <a-card size="small" title="基本信息" :loading="detailLoading">
      <a-descriptions :column="2">
        <a-descriptions-item label="姓名">{{ info.name }}</a-descriptions-item>
        <a-descriptions-item label="所属班级">{{ info.klass_name }}</a-descriptions-item>
        <a-descriptions-item label="手机号码">{{ info.phone }}</a-descriptions-item>
        <a-descriptions-item label="电子邮件">{{ info.email }}</a-descriptions-item>
        <a-descriptions-item label="身份证号">{{ info.id_card }}</a-descriptions-item>
        <a-descriptions-item label="联系地址">{{ info.address }}</a-descriptions-item>
        <a-descriptions-item label="QQ号">{{ info.qq }}</a-descriptions-item>
        <a-descriptions-item label="微信号">{{ info.wechat }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="1">
        <a-descriptions-item label="备注">{{ info.remark }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card size="small" title="紧急联系人" :loading="detailLoading">
      <a-descriptions :column="2">
        <a-descriptions-item label="姓名">{{ info.sos_name }}</a-descriptions-item>
        <a-descriptions-item label="手机号码">{{ info.sos_phone }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card size="small" title="登录记录">
      <a-table
        size="small"
        row-key="id"
        :loading="logLoading"
        :columns="logColumns"
        :data-source="logData"
        :pagination="logPager"
      >
        <template slot="browser" slot-scope="text, record">
          {{ record.browser_name }} {{ record.browser_version }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const logColumns = [
  {
    title: "IP",
    dataIndex: "ip",
  },
  {
    title: "浏览器",
    dataIndex: "browser",
    scopedSlots: { customRender: "browser" },
  },
  {
    title: "登录时间",
    width: 190,
    dataIndex: "created_at",
  },
];

export default {
  name: "StudentDetail",
  props: ["id"],
  data() {
    return {
      detailLoading: false,
      logLoading: false,

      info: {},

      logColumns,
      logData: [],
      logPager: {
        current: 1,
        pageSize: 30,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
      },
    };
  },
  watch: {
    id(newVal) {
      this.fetchDetail(newVal);
      this.fetchLoginLogs(newVal);
    },
  },
  mounted() {
    if (this.id) {
      this.fetchDetail(this.id);
      this.fetchLoginLogs(this.id);
    }
  },
  methods: {
    async fetchDetail(id) {
      this.detailLoading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/school/student/${id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.info = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.detailLoading = false;
      }
    },

    onTableChange(pagination, filters, sorter) {
      const { current, pageSize } = pagination;
      this.tablePager.current = current;
      this.tablePager.pageSize = pageSize;
      this.fetchTableData();
    },

    async fetchLoginLogs(id) {
      this.logLoading = true;
      try {
        const { current, pageSize } = this.logPager;
        const res = await this.$http({
          method: "GET",
          url: `/log/login/${id}`,
          params: { current, pageSize },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        const { total, data } = res.data;
        this.logData = data;
        this.logPager.total = total;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.logLoading = false;
      }
    },
  },
};
</script>
