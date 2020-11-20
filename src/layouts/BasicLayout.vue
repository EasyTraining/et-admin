<template>
  <pro-layout
    v-bind="settings"
    :menus="menus"
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
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="false" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <span></span>
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapState } from "vuex";
import RightContent from "@/components/GlobalHeader/RightContent";
import GlobalFooter from "@/components/GlobalFooter";
import setting from "@/setting";

export default {
  name: "BasicLayout",
  components: {
    RightContent,
    GlobalFooter,
  },
  data() {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: setting.title,
      settings: {
        layout: setting.layout,
        theme: setting.navTheme,
        primaryColor: setting.primaryColor,
        fixedHeader: setting.fixedHeader,
        fixSiderbar: setting.fixSiderbar,
        colorWeak: setting.colorWeak,
        hideHintAlert: false,
        hideCopyButton: false,
      },
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      routes: (state) => state.app.routes,
    }),
  },
  created() {
    const routes = this.routes.find((item) => item.path === "/");
    this.menus = (routes && routes.children) || [];
    this.$watch("collapsed", () => {
      this.$store.commit("SIDEBAR_TYPE", this.collapsed);
    });
  },
  methods: {
    none() {},

    handleCollapse(val) {
      this.collapsed = val;
    },
  },
};
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
