<template>
  <div>
    <a-card size="small" title="基本信息" :loading="mounting">
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

    <a-card size="small" title="紧急联系人" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="姓名">{{ info.sos_name }}</a-descriptions-item>
        <a-descriptions-item label="手机号码">{{ info.sos_phone }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card size="small" title="登录记录" :loading="mounting">
      <a-table
        size="small"
        row-key="id"
        :columns="logColumns"
        :data-source="logData"
        :pagination="false"
        :scroll="{ x: 1100 }"
      >
        <template slot="browser" slot-scope="text, record">
          {{ record.browser_name }} {{ record.browser_version }}
        </template>
      </a-table>
    </a-card>

    <footer-tool-bar>
      <a-button :loading="mounting" @click="goBack">返回</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
const logColumns = [
  {
    title: "登录时间",
    dataIndex: "created_at",
  },
  {
    title: "IP",
    dataIndex: "ip",
  },
  {
    title: "浏览器",
    dataIndex: "browser",
    scopedSlots: { customRender: "browser" },
  },
];

export default {
  name: "StudentDetail",
  data() {
    return {
      mounting: false,
      id: "",
      info: {},
      logColumns,
      logData: [],
    };
  },
  async mounted() {
    this.mounting = true;
    const { id } = this.$route.params;
    if (id) {
      this.id = id;
      await this.fetchDetail();
      await this.fetchLoginLogs();
    }
    this.mounting = false;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchDetail() {
      try {
        const res = await this.$http({ method: "GET", url: `/school/student/${this.id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.info = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchLoginLogs() {
      try {
        const res = await this.$http({ method: "GET", url: `/log/login/${this.id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.logData = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      }
    },
  },
};
</script>
