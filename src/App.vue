<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { setSiteCfg } from "@/utils";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "app",
  data() {
    return {
      loading: false,
      locale: zhCN,
    };
  },
  created() {
    this.fetchSiteConfig();
  },
  methods: {
    async fetchSiteConfig() {
      try {
        const res = await this.$http({ method: "GET", url: "/system/cfg/SYSTEM_GLOBAL" });
        if (res.code === 200 && res.data) {
          const { json } = res.data;
          const cfg = JSON.parse(json);
          document.title = "运营管理系统 | " + cfg.company_name;
          setSiteCfg(cfg);
        }
      } catch (e) {
        // pass
      }
    },
  },
};
</script>
