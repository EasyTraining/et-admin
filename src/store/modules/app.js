import storage from "store";
import routes from "@/router/routes";

const app = {
  state: {
    sideCollapsed: false,
    routes: routes,
    authorizedRouteNames: [],
    user: {},
  },
  mutations: {
    SIDEBAR_TYPE: (state, type) => {
      state.sideCollapsed = type;
      storage.set("SIDEBAR_TYPE", type);
    },
    SET_AUTHORIZED_ROUTE_NAMES: (state, payload) => {
      state.authorizedRouteNames = payload;
      storage.set("authorizedRouteNames", payload);
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
  },
};

export default app;
