import store from "@/store";
import storage from "store";
import setting from "@/setting";

export default function Initializer() {
  store.commit("TOGGLE_LAYOUT", storage.get("TOGGLE_LAYOUT", setting.layout));
  store.commit("TOGGLE_FIXED_HEADER", storage.get("TOGGLE_FIXED_HEADER", setting.fixedHeader));
  store.commit("TOGGLE_FIXED_SIDEBAR", storage.get("TOGGLE_FIXED_SIDEBAR", setting.fixSiderbar));
  store.commit("TOGGLE_CONTENT_WIDTH", storage.get("TOGGLE_CONTENT_WIDTH", setting.contentWidth));
  store.commit("TOGGLE_HIDE_HEADER", storage.get("TOGGLE_HIDE_HEADER", setting.autoHideHeader));
  store.commit("TOGGLE_NAV_THEME", storage.get("TOGGLE_NAV_THEME", setting.navTheme));
  store.commit("TOGGLE_COLOR", storage.get("TOGGLE_COLOR", setting.primaryColor));
  store.commit("TOGGLE_MULTI_TAB", storage.get("TOGGLE_MULTI_TAB", setting.multiTab));
  store.commit("SET_AUTHORIZED_ROUTE_NAMES", storage.get("authorizedRouteNames"));
}
