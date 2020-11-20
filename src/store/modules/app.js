import storage from "store";
import routes from "@/router/routes";

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: "dark",
    layout: "",
    contentWidth: "",
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    color: "",
    weak: false,
    multiTab: true,
    routes: routes,
    authorizedRouteNames: [],
  },
  mutations: {
    SIDEBAR_TYPE: (state, type) => {
      state.sideCollapsed = type;
      storage.set("SIDEBAR_TYPE", type);
    },
    TOGGLE_NAV_THEME: (state, theme) => {
      state.theme = theme;
      storage.set("TOGGLE_NAV_THEME", theme);
    },
    TOGGLE_LAYOUT: (state, mode) => {
      state.layout = mode;
      storage.set("TOGGLE_LAYOUT", mode);
    },
    TOGGLE_FIXED_HEADER: (state, mode) => {
      state.fixedHeader = mode;
      storage.set("TOGGLE_FIXED_HEADER", mode);
    },
    TOGGLE_FIXED_SIDEBAR: (state, mode) => {
      state.fixedSidebar = mode;
      storage.set("TOGGLE_FIXED_SIDEBAR", mode);
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      state.contentWidth = type;
      storage.set("TOGGLE_CONTENT_WIDTH", type);
    },
    TOGGLE_HIDE_HEADER: (state, type) => {
      state.autoHideHeader = type;
      storage.set("TOGGLE_HIDE_HEADER", type);
    },
    TOGGLE_COLOR: (state, color) => {
      state.color = color;
      storage.set("TOGGLE_COLOR", color);
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      storage.set("TOGGLE_MULTI_TAB", bool);
      state.multiTab = bool;
    },
    SET_AUTHORIZED_ROUTE_NAMES: (state, payload) => {
      state.authorizedRouteNames = payload;
      storage.set("authorizedRouteNames", payload);
    },
  },
};

export default app;
