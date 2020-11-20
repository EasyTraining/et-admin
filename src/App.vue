<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import setting from "@/setting";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { updateTheme } from "@ant-design-vue/pro-layout";

export default {
  name: "app",
  data() {
    return {
      locale: zhCN,
    };
  },
  mounted() {
    if (process.env.NODE_ENV !== "production") {
      updateTheme(setting.primaryColor);
    }
  },
};
</script>
