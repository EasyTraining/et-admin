<template>
  <div>
    <a-form-model ref="form" :model="formData" :rules="formRules">
      <a-card title="基本信息" :loading="mounting">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name">
              <a-input v-model="formData.name" :max-length="4" placeholder="请填写姓名" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所属班级" prop="klass_id">
              <a-select v-model="formData.klass_id" show-search placeholder="请选择所属班级">
                <a-select-option v-for="klass in klassList" :key="klass.id" :value="klass.id">
                  {{ klass.name }}
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
            <a-form-model-item label="身份证号" prop="id_card">
              <a-input v-model="formData.id_card" :max-length="100" placeholder="请填写身份证号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="联系地址" prop="address">
              <a-input v-model="formData.address" :max-length="100" placeholder="请填写联系地址" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="15">
          <a-col :span="12">
            <a-form-model-item label="QQ号" prop="qq">
              <a-input v-model="formData.qq" :max-length="30" placeholder="请填写QQ" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="微信号" prop="wechat">
              <a-input v-model="formData.wechat" :max-length="30" placeholder="请填写微信号" />
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

      <a-card title="登录信息" :loading="mounting" v-if="editedId === ''">
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

      <a-card title="紧急联系人" :loading="mounting">
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
import { formRules } from "./const";

export default {
  name: "StudentForm",
  data() {
    return {
      mounting: false,
      submitting: false,
      editedId: "",

      klassList: [],

      formData: {
        name: "",
        klass_id: undefined,
        phone: "",
        email: "",
        id_card: "",
        address: "",
        qq: "",
        wechat: "",

        account: "",
        password: "",

        sos_name: "",
        sos_phone: "",
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
          this.$message.error(res.message);
          return;
        }
        this.klassList = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      }
    },

    async fetchDetail() {
      this.mounting = true;
      try {
        const res = await this.$http({ method: "GET", url: `/school/student/${this.editedId}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.formData = _.pick(res.data, Object.keys(this.formData));
      } catch (e) {
        this.$message.error(e.message);
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
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.$router.replace(`/school/student/detail/${res.data.id}`);
      } catch (e) {
        this.$message.error(e.message);
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
          this.$message.error(res.message);
          return;
        }
        this.$message.success("操作成功");
        await this.$router.replace(`/school/student/detail/${res.data.id}`);
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
