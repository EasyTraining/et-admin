<template>
  <div id="userLayout">
    <div class="container">
      <div class="main">
        <a-form-model ref="form" :model="formData" :rules="formRules">
          <div class="logo">
            <img src="../../assets/logo.png" alt="" />
            <h2>登录{{ title }}</h2>
          </div>
          <a-form-model-item prop="account">
            <a-input v-model="formData.account" size="large" type="text" placeholder="用户名">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input v-model="formData.password" size="large" type="password" placeholder="密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="captcha">
            <a-input v-model="formData.captcha" size="large" placeholder="图片验证码">
              <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }" />
              <div slot="suffix" class="captcha-box" v-html="captchaImg" @click="fetchCaptcha" />
            </a-input>
          </a-form-model-item>
          <!--          <a-form-model-item>-->
          <!--            <a-checkbox v-model="formData.remember">自动登录</a-checkbox>-->
          <!--          </a-form-model-item>-->

          <a-form-model-item style="margin-top: 24px; margin-bottom: 15px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              style="width: 100%"
              :loading="loading"
              @click="submit"
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import setting from "@/setting";
import { sha256, Cookies, getBrowser } from "@/utils";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      title: setting.title,
      captchaImg: "",
      formData: {
        account: "",
        password: "",
        captcha: "",
        remember: false,
      },
      formRules: {
        account: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
        captcha: [{ required: true, message: "请输入图片验证码" }],
      },
    };
  },
  mounted() {
    this.fetchCaptcha();
  },
  methods: {
    async fetchCaptcha() {
      try {
        const res = await this.$http({ method: "GET", url: "/captcha" });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.captchaImg = res.data;
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          const { account, password, captcha } = this.formData;
          const { name, version } = getBrowser();
          const hashed_pwd = sha256(password);
          const res = await this.$http({
            method: "POST",
            url: "/system/employee_login",
            data: {
              account,
              hashed_pwd,
              captcha,
              browser_name: name,
              browser_version: version,
            },
          });
          if (res.code !== 200) {
            this.$message.warning(res.message);
            await this.fetchCaptcha();
            return;
          }
          const token = res.data;
          if (token) {
            Cookies.set("token", token);
            await this.$router.push("/dashboard");
          } else {
            this.$message.warning(res.data);
          }
        } catch (e) {
          this.$message.warning(e.message);
        } finally {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#userLayout {
  height: 100%;
  background-color: #fff;
  background-image: url("../../assets/login-bg.jpg");
  background-size: cover;

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
      width: 440px;
      background: rgba(255, 255, 255, 0.85);
      padding: 35px 45px 45px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

      .logo {
        text-align: center;
        margin-bottom: 30px;

        img {
          height: 80px;
        }
      }
    }
  }
}
</style>
