import { BasicLayout } from "@/layouts";

const RouteView = {
  name: "RouteView",
  render: (h) => h("router-view"),
};

export default [
  {
    path: "/",
    name: "/",
    component: BasicLayout,
    meta: { title: "控制台" },
    redirect: "/dashboard",
    children: [
      {
        name: "/dashboard",
        path: "/dashboard",
        component: () => import("@/views/Dashboard/Analysis"),
        meta: { title: "控制台", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login/Index"),
  },

  {
    path: "/404",
    component: () => import(/* webpackChunkName: "fail" */ "@/views/Exception/404"),
  },

  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];
