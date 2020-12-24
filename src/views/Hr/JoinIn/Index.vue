<template>
  <div>
    <a-form-model ref="form" :model="formData" :rules="formRules">
      <a-card size="small" title="登录信息" :loading="mounting" v-if="!editedId">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="账号" prop="account">
              <a-input v-model="formData.account" :max-length="30" placeholder="请填写账号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="密码" prop="password">
              <a-input v-model="formData.password" :max-length="30" placeholder="请填写密码" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="基本信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name">
              <a-input v-model="formData.name" :max-length="4" placeholder="请填写姓名" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所属部门" prop="org_id">
              <a-select v-model="formData.org_id" show-search placeholder="请选择所属部门">
                <a-select-option v-for="org in klassList" :key="org.id" :value="org.id">
                  {{ org.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="手机号码" prop="phone">
              <a-input v-model="formData.phone" :max-length="11" placeholder="请填写手机号码" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="电子邮件" prop="email">
              <a-input v-model="formData.email" :max-length="100" placeholder="请填写电子邮件" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="工号" prop="work_code">
              <a-input v-model="formData.work_code" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="职位" prop="position">
              <a-input v-model="formData.position" :max-length="100" placeholder="请填写职位" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="备注" prop="remark">
              <a-textarea
                v-model="formData.remark"
                :max-length="300"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                placeholder="请填写备注"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="个人信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="身份证号" prop="id_card">
              <a-input v-model="formData.id_card_no" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="身份证有效期" prop="id_card_valid_date">
              <a-input
                v-model="formData.id_card_valid_date"
                :max-length="100"
                placeholder="请填写职位"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="身份证地址" prop="id_card_address">
              <a-input
                v-model="formData.id_card_address"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="民族" prop="nation">
              <a-input v-model="formData.nation" :max-length="100" placeholder="请填写职位" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="性别" prop="sex">
              <a-input v-model="formData.sex" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="出生日期" prop="birthday">
              <a-input v-model="formData.birthday" :max-length="100" placeholder="请填写职位" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="婚姻状况" prop="marriage">
              <a-input v-model="formData.marriage" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="政治面貌" prop="political_identity">
              <a-input
                v-model="formData.political_identity"
                :max-length="100"
                placeholder="请填写职位"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="居住地址" prop="address">
              <a-input v-model="formData.address" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item
              label="身份证正面照片"
              prop="id_card_front_img"
              style="margin-bottom: 0"
            >
              <avatar-upload v-model="formData.id_card_front_img" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="身份证反面照片"
              prop="id_card_back_img"
              style="margin-bottom: 0"
            >
              <avatar-upload v-model="formData.id_card_back_img" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="工作信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="员工类型" prop="work_type">
              <a-input v-model="formData.work_type" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="员工状态" prop="status">
              <a-input v-model="formData.status" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="入职时间" prop="join_date">
              <a-input v-model="formData.join_date" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="试用期" prop="probation_month">
              <a-input
                v-model="formData.probation_month"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item
              label="前公司离职证明"
              prop="prev_leave_img"
              style="margin-bottom: 0"
            >
              <avatar-upload v-model="formData.prev_leave_img" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="招聘来源" prop="invite_from">
              <a-input v-model="formData.invite_from" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="学历信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="毕业院校" prop="graduate_school">
              <a-input
                v-model="formData.graduate_school"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="毕业时间" prop="graduate_date">
              <a-input
                v-model="formData.graduate_date"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="学历" prop="degree">
              <a-input v-model="formData.degree" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所学专业" prop="major">
              <a-input v-model="formData.major" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="银行卡" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="开户行" prop="bank_account">
              <a-input v-model="formData.bank_account" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="银行卡号" prop="bank_card_no">
              <a-input v-model="formData.bank_card_no" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="银行卡照片" prop="back_card_img" style="margin-bottom: 0">
              <avatar-upload v-model="formData.back_card_img" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="合同信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="合同公司" prop="contact_company">
              <a-input
                v-model="formData.contact_company"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合同类型" prop="contact_type">
              <a-input v-model="formData.contact_type" :max-length="100" placeholder="请填写工号" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="合同开始日期" prop="contact_start_date">
              <a-input
                v-model="formData.contact_start_date"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合同期限" prop="contact_period">
              <a-input
                v-model="formData.contact_period"
                :max-length="100"
                placeholder="请填写工号"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="紧急联系人" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="sos_name">
              <a-input
                v-model="formData.sos_name"
                :max-length="4"
                placeholder="请填写紧急联系人姓名"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="手机号码" prop="sos_phone">
              <a-input
                v-model="formData.sos_phone"
                :max-length="11"
                placeholder="请填写紧急联系人手机号码"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="紧急联系人关系" prop="sos_relation">
              <a-input
                v-model="formData.sos_relation"
                :max-length="4"
                placeholder="请填写紧急联系人姓名"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="社保和公积金" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="社保账号" prop="social_security_no">
              <a-input
                v-model="formData.social_security_no"
                :max-length="4"
                placeholder="请填写紧急联系人姓名"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="公积金账号" prop="provident_fund_no">
              <a-input
                v-model="formData.provident_fund_no"
                :max-length="11"
                placeholder="请填写紧急联系人手机号码"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form-model>

    <footer-tool-bar>
      <a-button :loading="submitting" @click="goBack">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { _, sha256 } from "@/utils";
import AvatarUpload from "@/components/AvatarUpload";
import { formRules } from "./const";

export default {
  name: "JoinIn",
  components: { AvatarUpload },
  data() {
    return {
      mounting: false,
      submitting: false,
      editedId: "",

      klassList: [],
      enums: {
        orgList: [],
        position: [],
        nation: [],
        sex: [],
        marriage: [],
        political_identity: [],
        work_type: [],
        status: [],
        invite_from: [],
        degree: [],
        contact_type: [],
        contact_period: [],
        sos_relation: []
      },

      formData: {
        account: "",
        password: "",

        name: "",
        org_id: undefined,
        phone: "",
        email: "",
        work_code: "",
        position: undefined,
        remark: "",

        id_card_no: "",
        id_card_valid_date: "",
        id_card_address: "",
        nation: "",
        sex: undefined,
        birthday: "",
        marriage: "",
        political_identity: "",
        address: "",
        id_card_front_img: "",
        id_card_back_img: "",

        work_type: undefined,
        status: undefined,
        join_date: "",
        probation_month: undefined,
        invite_from: undefined,
        prev_leave_img: "",

        degree: undefined,
        major: "",
        graduate_school: "",
        graduate_date: "",

        bank_account: "",
        bank_card_no: "",
        back_card_img: "",

        contact_company: "",
        contact_type: undefined,
        contact_start_date: "",
        contact_period: undefined,

        sos_name: "",
        sos_phone: "",
        sos_relation: undefined,

        social_security_no: "",
        provident_fund_no: "",
      },
      formRules,
    };
  },
  async mounted() {
    const { klass_id } = this.$route.query;
    this.formData.klass_id = klass_id;

    this.mounting = true;
    this.editedId = this.$route.params.id;
    await this.fetchKlassList();
    if (this.editedId) {
      await this.fetchDetail();
    }
    this.mounting = false;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchKlassList() {
      try {
        const res = await this.$http({ method: "GET", url: "/school/klass_util/simple_list" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.klassList = res.data || [];
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchDetail() {
      this.mounting = true;
      try {
        const res = await this.$http({ method: "GET", url: `/school/student/${this.editedId}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.formData = _.pick(res.data, Object.keys(this.formData));
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.mounting = false;
      }
    },

    async submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        if (this.editedId) {
          this.update();
        } else {
          this.create();
        }
      });
    },

    async create() {
      this.submitting = true;
      try {
        const { password, ...rest } = this.formData;
        const hashed_pwd = sha256(password);
        const res = await this.$http({
          method: "POST",
          url: "/school/student",
          data: { hashed_pwd, ...rest },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.$router.replace(`/school/student/detail/${res.data.id}`);
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },

    async update() {
      this.submitting = true;
      try {
        const { account, password, ...rest } = this.formData;
        const res = await this.$http({
          method: "PUT",
          url: `/school/student/${this.editedId}`,
          data: rest,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.$router.replace(`/school/student/detail/${res.data.id}`);
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
