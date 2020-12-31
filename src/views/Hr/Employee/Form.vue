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
              <a-tree-select
                v-model="formData.org_id"
                :tree-data="enums.ORG_TREE"
                :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allow-clear
                tree-default-expand-all
                style="width: 100%"
                placeholder="请选择所属部门"
              />
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
              <a-select v-model="formData.position" show-search placeholder="请选择职位">
                <a-select-option
                  v-for="item in enums.EMPLOYEE_POSITION"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
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
              <a-input
                v-model="formData.id_card_no"
                :max-length="100"
                placeholder="请填写身份证号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="身份证有效期" prop="id_card_valid_date">
              <a-date-picker
                v-model="formData.id_card_valid_date"
                style="width: 100%"
                placeholder="请选择身份证有效期"
                value-format="YYYY-MM-DD"
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
                placeholder="请填写身份证地址"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="民族" prop="nation">
              <a-select v-model="formData.nation" show-search placeholder="请选择民族">
                <a-select-option v-for="item in enums.NATION" :key="item.id" :value="item.value">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="性别" prop="sex">
              <a-select v-model="formData.sex" show-search placeholder="请选择性别">
                <a-select-option v-for="item in enums.SEX" :key="item.id" :value="item.value">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="出生日期" prop="birthday">
              <a-date-picker
                v-model="formData.birthday"
                style="width: 100%"
                placeholder="请选择出生日期"
                value-format="YYYY-MM-DD"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="婚姻状况" prop="marriage">
              <a-select v-model="formData.marriage" show-search placeholder="请选择婚姻状况">
                <a-select-option v-for="item in enums.MARRIAGE" :key="item.id" :value="item.value">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="政治面貌" prop="political_identity">
              <a-select
                v-model="formData.political_identity"
                show-search
                placeholder="请选择政治面貌"
              >
                <a-select-option
                  v-for="item in enums.POLITICAL_IDENTITY"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="居住地址" prop="address">
              <a-input v-model="formData.address" :max-length="100" placeholder="请填写居住地址" />
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
              <single-image-upload v-model="formData.id_card_front_img" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="身份证反面照片"
              prop="id_card_back_img"
              style="margin-bottom: 0"
            >
              <single-image-upload v-model="formData.id_card_back_img" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="工作信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="员工类型" prop="work_type">
              <a-select v-model="formData.work_type" show-search placeholder="请选择员工类型">
                <a-select-option v-for="item in enums.WORK_TYPE" :key="item.id" :value="item.value">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="员工状态" prop="status">
              <a-select v-model="formData.status" show-search placeholder="请选择员工状态">
                <a-select-option
                  v-for="item in enums.EMPLOYEE_STATUS"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="入职日期" prop="join_date">
              <a-date-picker
                v-model="formData.join_date"
                style="width: 100%"
                placeholder="请选择入职日期"
                value-format="YYYY-MM-DD"
                @change="calcPlanFormalDate"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="试用期(月)" prop="probation_month">
              <a-input-number
                v-model="formData.probation_month"
                style="width: 100%"
                :min="1"
                :max="999"
                placeholder="请填写试用期"
                @change="calcPlanFormalDate"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="计划转正日期" prop="plan_formal_date">
              {{ formData.plan_formal_date || "系统自动计算" }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="招聘来源" prop="invite_from">
              <a-select v-model="formData.invite_from" show-search placeholder="请选择招聘来源">
                <a-select-option
                  v-for="item in enums.INVITE_FROM"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
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
              <single-image-upload v-model="formData.prev_leave_img" />
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
                placeholder="请填写毕业院校"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="毕业日期" prop="graduate_date">
              <a-date-picker
                v-model="formData.graduate_date"
                style="width: 100%"
                placeholder="请选择毕业日期"
                value-format="YYYY-MM-DD"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="学历" prop="degree">
              <a-select v-model="formData.degree" show-search placeholder="请选择学历">
                <a-select-option v-for="item in enums.DEGREE" :key="item.id" :value="item.value">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所学专业" prop="major">
              <a-input v-model="formData.major" :max-length="100" placeholder="请填写所学专业" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card size="small" title="银行卡信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="开户行" prop="bank_account">
              <a-input
                v-model="formData.bank_account"
                :max-length="100"
                placeholder="请填写开户行"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="银行卡号" prop="bank_card_no">
              <a-input
                v-model="formData.bank_card_no"
                :max-length="100"
                placeholder="请填写银行卡号"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="银行卡照片" prop="back_card_img" style="margin-bottom: 0">
              <single-image-upload v-model="formData.back_card_img" />
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
                placeholder="请填写合同公司"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合同类型" prop="contact_type">
              <a-select v-model="formData.contact_type" show-search placeholder="请选择合同类型">
                <a-select-option
                  v-for="item in enums.CONTACT_TYPE"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="合同开始日期" prop="contact_start_date">
              <a-date-picker
                v-model="formData.contact_start_date"
                style="width: 100%"
                placeholder="请选择合同开始日期"
                value-format="YYYY-MM-DD"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合同期限" prop="contact_period">
              <a-select v-model="formData.contact_period" show-search placeholder="请选择合同期限">
                <a-select-option
                  v-for="item in enums.CONTACT_PERIOD"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
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
              <a-select
                v-model="formData.sos_relation"
                show-search
                placeholder="请选择紧急联系人关系"
              >
                <a-select-option
                  v-for="item in enums.SOS_RELATION"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
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
                placeholder="请填写社保账号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="公积金账号" prop="provident_fund_no">
              <a-input
                v-model="formData.provident_fund_no"
                :max-length="11"
                placeholder="请填写公积金账号"
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
import dayjs from "dayjs";
import { _, sha256 } from "@/utils";
import { formRules } from "./const";
import { fetchMultipleDict } from "./util";

export default {
  name: "EmployeeForm",
  data() {
    return {
      mounting: false,
      submitting: false,
      editedId: "",

      enums: {
        ORG_TREE: [],
        EMPLOYEE_POSITION: [],
        NATION: [],
        SEX: [],
        MARRIAGE: [],
        POLITICAL_IDENTITY: [],
        WORK_TYPE: [],
        EMPLOYEE_STATUS: [],
        INVITE_FROM: [],
        DEGREE: [],
        CONTACT_TYPE: [],
        CONTACT_PERIOD: [],
        SOS_RELATION: [],
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
        nation: undefined,
        sex: undefined,
        birthday: "",
        marriage: undefined,
        political_identity: undefined,
        address: "",
        id_card_front_img: "",
        id_card_back_img: "",

        work_type: undefined,
        status: undefined,
        join_date: "",
        probation_month: 6,
        plan_formal_date: "",
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
    this.mounting = true;
    this.editedId = this.$route.params.id;
    await this.fetchOrgTree();
    await this.fetchEnums();
    if (this.editedId) {
      await this.fetchDetail();
    }
    this.mounting = false;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    calcPlanFormalDate() {
      const { join_date, probation_month } = this.formData;
      if (join_date && probation_month) {
        this.formData.plan_formal_date = dayjs(join_date)
          .add(probation_month, "month")
          .format("YYYY-MM-DD");
      }
    },

    async fetchOrgTree() {
      try {
        const res = await this.$http({ method: "GET", url: "/hr/org_util/tree" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.enums.ORG_TREE = res.data || [];
      } catch (e) {
        this.$message.warning(e.message);
      }
    },

    async fetchEnums() {
      const dictMap = await fetchMultipleDict();
      this.enums = { ...this.enums, ...dictMap };
    },

    async fetchDetail() {
      this.mounting = true;
      try {
        const res = await this.$http({ method: "GET", url: `/hr/employee/${this.editedId}` });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        const formData = _.pick(res.data, Object.keys(this.formData));
        // 清空空字符串的数据, 防止 select 控件 placeholder 不展示
        Object.keys(formData).forEach((key) => {
          const val = formData[key];
          if (val === "") delete formData[key];
        });
        this.formData = formData;
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
          url: "/hr/employee",
          data: { hashed_pwd, ...rest },
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.$router.replace(`/hr/employee/edit/${res.data.id}`);
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
          url: `/hr/employee/${this.editedId}`,
          data: rest,
        });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.fetchDetail();
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
