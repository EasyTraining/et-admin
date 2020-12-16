<template>
  <div :class="prefixCls" :style="{ width: barWidth, transition: '0.3s all' }">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FooterToolBar",
  props: {
    prefixCls: {
      type: String,
      default: "ant-pro-footer-toolbar",
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    siderWidth: {
      type: Number,
      default: undefined,
    },
    extra: {
      type: [String, Object],
      default: "",
    },
  },
  computed: {
    ...mapState({
      collapsed: (state) => state.app.sideCollapsed,
    }),
    barWidth() {
      return this.isMobile
        ? undefined
        : `calc(100% - ${this.collapsed ? 80 : this.siderWidth || 200}px)`;
    },
  },
};
</script>

<style lang="less" scoped></style>
