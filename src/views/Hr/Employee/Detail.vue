<template>
  <div>
    <a-card size="small" title="基本信息" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="姓名">{{ info.name }}</a-descriptions-item>
        <a-descriptions-item label="所属部门">{{ info.org_name }}</a-descriptions-item>
        <a-descriptions-item label="手机号码">{{ info.phone }}</a-descriptions-item>
        <a-descriptions-item label="电子邮件">{{ info.email }}</a-descriptions-item>
        <a-descriptions-item label="工号">{{ info.work_code }}</a-descriptions-item>
        <a-descriptions-item label="职位">{{ info.position }}</a-descriptions-item>
        <a-descriptions-item label="备注">{{ info.remark }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="个人信息" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="身份证号">{{ info.id_card }}</a-descriptions-item>
        <a-descriptions-item label="身份证有效期">
          {{ info.id_card_valid_date }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证地址">{{ info.id_card_address }}</a-descriptions-item>
        <a-descriptions-item label="民族">{{ info.nation }}</a-descriptions-item>
        <a-descriptions-item label="性别">{{ info.sex }}</a-descriptions-item>
        <a-descriptions-item label="出生日期">{{ info.birthday }}</a-descriptions-item>
        <a-descriptions-item label="婚姻状况">{{ info.marriage }}</a-descriptions-item>
        <a-descriptions-item label="政治面貌">{{ info.political_identity }}</a-descriptions-item>
        <a-descriptions-item label="居住地址">{{ info.address }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2">
        <a-descriptions-item label="身份证正面照片">
          <div class="preview-img" v-viewer>
            <img v-if="info.id_card_front_img" :src="info.id_card_front_img" />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="身份证反面照片">
          <div class="preview-img" v-viewer>
            <img v-if="info.id_card_back_img" :src="info.id_card_back_img" />
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="工作信息" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="员工类型">{{ info.work_type }}</a-descriptions-item>
        <a-descriptions-item label="员工状态">{{ info.status }}</a-descriptions-item>
        <a-descriptions-item label="入职日期">{{ info.join_date }}</a-descriptions-item>
        <a-descriptions-item label="试用期">{{ info.probation_month }}月</a-descriptions-item>
        <a-descriptions-item label="计划转正日期">{{ info.plan_formal_date }}</a-descriptions-item>
        <a-descriptions-item label="实际转正日期">{{ info.real_formal_date }}</a-descriptions-item>
        <a-descriptions-item label="招聘来源">{{ info.invite_from }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2">
        <a-descriptions-item label="前公司离职证明">
          <div class="preview-img" v-viewer>
            <img v-if="info.prev_leave_img" :src="info.prev_leave_img" />
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="学历信息" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="毕业院校">{{ info.graduate_school }}</a-descriptions-item>
        <a-descriptions-item label="毕业日期">{{ info.graduate_date }}</a-descriptions-item>
        <a-descriptions-item label="学历">{{ info.degree }}</a-descriptions-item>
        <a-descriptions-item label="所学专业">{{ info.major }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="银行卡信息" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="开户行">{{ info.bank_account }}</a-descriptions-item>
        <a-descriptions-item label="银行卡号">{{ info.bank_card_no }}</a-descriptions-item>
        <a-descriptions-item label="银行卡照片">
          <div class="preview-img" v-viewer>
            <img v-if="info.back_card_img" :src="info.back_card_img" />
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="合同信息" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="合同公司">{{ info.contact_company }}</a-descriptions-item>
        <a-descriptions-item label="合同类型">{{ info.contact_type }}</a-descriptions-item>
        <a-descriptions-item label="合同开始日期">
          {{ info.contact_start_date }}
        </a-descriptions-item>
        <a-descriptions-item label="合同期限">{{ info.contact_period }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="紧急联系人" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="姓名">{{ info.sos_name }}</a-descriptions-item>
        <a-descriptions-item label="手机号码">{{ info.sos_phone }}</a-descriptions-item>
        <a-descriptions-item label="紧急联系人关系">{{ info.sos_relation }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card size="small" title="社保和公积金" :loading="mounting">
      <a-descriptions :column="2">
        <a-descriptions-item label="社保账号">{{ info.social_security_no }}</a-descriptions-item>
        <a-descriptions-item label="公积金账号">{{ info.provident_fund_no }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <footer-tool-bar>
      <a-button @click="goBack">返回</a-button>
      <a-button type="primary" @click="toEdit">编辑</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
export default {
  name: "EmployeeDetail",
  data() {
    return {
      mounting: false,
      id: "",
      info: {},
    };
  },
  async mounted() {
    this.mounting = true;
    this.id = this.$route.params.id;
    if (this.id) {
      await this.fetchDetail();
    }
    this.mounting = false;
  },
  methods: {
    async fetchDetail() {
      this.mounting = true;
      try {
        const res = await this.$http({ method: "GET", url: `/hr/employee/${this.id}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.info = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.mounting = false;
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    toEdit() {
      this.$router.push(`/hr/employee/edit/${this.id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.preview-img {
  img {
    width: 100px;
    cursor: pointer;
    vertical-align: top;
  }
}
</style>
