<template>
  <div>
    <a-tabs v-model="activeTab">
      <a-tab-pane key="contact" tab="内部通讯录管理">
        <contact />
      </a-tab-pane>
      <a-tab-pane key="department" tab="部门管理">
        <dept />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Contact from "./components/Contact";
import Dept from "./components/Dept";

export default {
  name: "OrgIndex",
  components: { Contact, Dept },
  data() {
    return {
      activeTab: "contact",
    };
  },
};
</script>
