<template>
  <a-spin tip="数据接收中..." :spinning="loading">
    <pro-layout
      v-bind="settings"
      :menus="authorizedRoutes"
      :collapsed="collapsed"
      :mediaQuery="{}"
      :isMobile="false"
      :handleMediaQuery="none"
      :handleCollapse="handleCollapse"
    >
      <template v-slot:menuHeaderRender>
        <img src="../assets/logo.png" width="40" alt="" />
        <h1>{{ title }}</h1>
      </template>
      <template v-slot:rightContentRender>
        <right-content
          :top-menu="settings.layout === 'topmenu'"
          :is-mobile="false"
          :theme="settings.theme"
        />
      </template>
      <template v-slot:footerRender>
        <span>Copyright © EasyTraining</span>
      </template>
      <page-header-wrapper />
      <router-view />
    </pro-layout>
  </a-spin>
</template>

<script>
import { mapState } from "vuex";
import TreeNodeUtils from "tree-node-utils";
import RightContent from "@/components/GlobalHeader/RightContent";
import GlobalFooter from "@/components/GlobalFooter";
import setting from "@/setting";

const treeUtils = new TreeNodeUtils({
  childrenField: "children",
  keyField: "id",
});

export default {
  name: "BasicLayout",
  components: {
    RightContent,
    GlobalFooter,
  },
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

    handleCollapse(val) {
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
  },
};
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
