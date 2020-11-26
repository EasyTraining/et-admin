<template>
  <div id="userLayout">
    <div class="container">
      <div class="main">
        <a-form-model ref="attrForm" :model="formData" :rules="formRules">
          <div class="logo">
            <img src="../../assets/logo.png" alt="" />
            <h3>登录 {{ title }}</h3>
          </div>
          <a-form-item prop="account">
            <a-input v-model="formData.account" size="large" type="text" placeholder="请输入用户名">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item prop="password">
            <a-input v-model="formData.password" size="large" type="password" placeholder="请输入密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="formData.remember">自动登录</a-checkbox>
          </a-form-item>

          <a-form-item style="margin-top: 24px; margin-bottom: 15px">
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
          </a-form-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import setting from "@/setting";
import { sha256, Cookies } from "@/utils";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      title: setting.title,
      formData: {
        account: "",
        password: "",
        remember: false,
      },
      formRules: {
        account: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.attrForm.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          const { account, password } = this.formData;
          const hashed_pwd = sha256(password);
          const res = await this.$http({
            method: "POST",
            url: "/login",
            data: { account, hashed_pwd },
          });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          const token = res.data;
          if (token) {
            Cookies.set("token", token);
            await this.$router.push("/dashboard");
          } else {
            this.$message.error(res.data);
          }
        } catch (e) {
          this.$message.error(e.message);
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
  background-color: #1f2325;
  background-image: url("../../assets/login-bg.jpg");
  background-size: cover;

  .container {
    width: 100%;
    min-height: 100%;
    padding: 0 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      text-decoration: none;
    }

    .main {
      min-width: 260px;
      width: 368px;
      background: #fff;
      padding: 20px;
      border-radius: 3px;

      .logo {
        text-align: center;
        margin-bottom: 30px;

        img {
          height: 40px;
        }
      }
    }
  }
}
</style>
