import Vue from "vue";
import Router from "vue-router";
import storage from "store";
import { Cookies } from "@/utils";
import routes from "./routes";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const whiteList = ["/", "/login", "/dashboard", "/404", "/500"];
  if (whiteList.includes(to.path)) {
    return next();
  }

  const token = Cookies.get("token");
  if (!token) {
    return next({ path: "/login" });
  }

  const authorizedRouteNames = storage.get("authorizedRouteNames");
  if (authorizedRouteNames.includes(to.name)) {
    next();
  } else {
    next({ path: "/404" });
  }
});

export default router;
