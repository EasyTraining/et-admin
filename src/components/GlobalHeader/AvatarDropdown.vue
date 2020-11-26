<template>
  <a-dropdown v-if="currentUser && currentUser.nick_name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <span>{{ currentUser.nick_name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="logout" @click="logout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from "ant-design-vue";
import { Cookies } from "@/utils";

export default {
  name: "AvatarDropdown",
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toProfile() {
      this.$router.push({ path: "/user/profile" });
    },

    toResetPwd() {
      this.$router.push({ path: "/user/reset-pwd" });
    },

    logout() {
      Modal.confirm({
        title: "提示",
        content: "是否确认退出?",
        onOk: () => {
          return new Promise((resolve) => {
            Cookies.remove("token");
            this.$router.push("/login");
            resolve();
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
