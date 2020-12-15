<template>
  <a-spin tip="数据接收中..." :spinning="loading">
    <pro-layout
      v-bind="settings"
      :menus="authorizedRoutes"
      :collapsed="collapsed"
      :mediaQuery="{}"
      :isMobile="false"
      :handleMediaQuery="none"
      :handleCollapse="onCollapse"
    >
      <template v-slot:menuHeaderRender>
        <img src="../assets/logo.png" width="40" alt="" />
        <h1>{{ title }}</h1>
      </template>

      <template v-slot:rightContentRender>
        <div class="et-user" v-if="user">
          <a-dropdown>
            <div class="et-user__avatar">
              <a-avatar v-if="user.avatar_url" :src="user.avatar_url" />
              <a-avatar v-else icon="user" />
              <span>欢迎您, {{ user.nick_name }}</span>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="logout" @click="logout">
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </template>

      <template v-slot:footerRender>
        <div class="et-footer">Copyright © EasyTraining</div>
      </template>

      <page-header-wrapper />

      <router-view />
    </pro-layout>
  </a-spin>
</template>

<script>
import { Modal } from "ant-design-vue";
import { mapState } from "vuex";
import TreeNodeUtils from "tree-node-utils";
import setting from "@/setting";
import { Cookies } from "@/utils";

const treeUtils = new TreeNodeUtils({
  childrenField: "children",
  keyField: "id",
});

export default {
  name: "BasicLayout",
  data() {
    return {
      loading: false,
      collapsed: false,
      authorizedRoutes: [],
      title: setting.title,
      settings: {
        layout: setting.layout,
        theme: setting.navTheme,
        primaryColor: setting.primaryColor,
        fixedHeader: setting.fixedHeader,
        fixSiderbar: setting.fixSiderbar,
        siderWidth: setting.siderWidth,
        colorWeak: setting.colorWeak,
        hideHintAlert: false,
        hideCopyButton: false,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.app.user,
      routes: (state) => state.app.routes,
    }),
  },
  created() {
    this.$watch("collapsed", () => {
      this.$store.commit("SIDEBAR_TYPE", this.collapsed);
    });
  },
  async mounted() {
    await this.getUserInfo();
  },
  methods: {
    none() {},

    onCollapse(val) {
      this.collapsed = val;
    },

    getAuthorizedRoutes(authorizedRouteNames) {
      const root = (this.routes || []).find((item) => item.path === "/");
      this.authorizedRoutes = treeUtils.filterNodes(root.children || [], (node) => {
        return authorizedRouteNames.includes(node.name);
      });
    },

    async getUserInfo() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/system/employee_info" });
        if (res.code !== 200) {
          await this.$router.push("/login");
          return;
        }
        const { menu_names } = res.data;
        await this.$store.commit("SET_USER", res.data);
        await this.$store.commit("SET_AUTHORIZED_ROUTE_NAMES", menu_names);
        await this.getAuthorizedRoutes(menu_names);
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      Modal.confirm({
        title: "提示",
        content: "是否确认退出?",
        onOk: () => {
          return new Promise((resolve) => {
            const cookies = Cookies.get();
            Object.keys(cookies).forEach((name) => {
              Cookies.remove(name);
            });
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

<style lang="less">
.et {
  &-user {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    padding: 0 22px;

    &__avatar {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        margin-left: 8px;
      }
    }
  }

  &-footer {
    font-size: 14px;
    padding-bottom: 20px;
  }
}
</style>
