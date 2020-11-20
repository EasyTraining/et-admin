<template>
  <div id="userLayout">
    <div class="container">
      <div class="main">
        <a-form-model ref="attrForm" :model="formData" :rules="formRules">
          <div class="logo">
            <img src="../../assets/logo.png" alt="" />
          </div>
          <a-form-item prop="name">
            <a-input v-model="formData.name" size="large" type="text" placeholder="请输入用户名">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item prop="passwd">
            <a-input v-model="formData.passwd" size="large" type="password" placeholder="请输入密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="formData.remember">自动登录</a-checkbox>
          </a-form-item>

          <a-form-item style="margin-top: 24px; margin-bottom: 15px">
            <a-button size="large" type="primary" htmlType="submit" style="width: 100%" :loading="loading" @click="submit"> 登录 </a-button>
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
        name: "",
        passwd: "",
        remember: false,
      },
      formRules: {
        name: [{ required: true, message: "请输入用户名" }],
        passwd: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.attrForm.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          const fd = _.pick(this.formData, ["name", "passwd"]);
          fd.passwd = sha256(fd.passwd);
          const res = await this.$http({ method: "POST", url: "/login", data: fd });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          const { token, id } = res.data;
          if (res.data.token) {
            Cookies.set("token", token);
            Cookies.set("user_id", id);
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
