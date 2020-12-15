import { BasicLayout } from "@/layouts";

const RouteView = {
  name: "RouteView",
  render: (h) => h("router-view"),
};

export default [
  {
    name: "/",
    path: "/",
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
      {
        name: "/todo",
        path: "/todo",
        component: RouteView,
        meta: { title: "待办事项", icon: "table" },
        redirect: "/todo/workspace",
        children: [
          {
            name: "/todo/workspace",
            path: "/todo/workspace",
            component: () => import("@/views/Todo/Index"),
            meta: { title: "我的待办" },
          },
        ],
      },
      {
        name: "/repo",
        path: "/repo",
        component: RouteView,
        meta: { title: "题库中心", icon: "read" },
        redirect: "/repo/library",
        children: [
          {
            name: "/repo/library",
            path: "/repo/library",
            component: () => import("@/views/Repo/Library/Index"),
            meta: { title: "题库管理" },
          },
          {
            hidden: true,
            name: "/repo/library/:libraryId/questions",
            path: "/repo/library/:libraryId/questions",
            component: () => import("@/views/Repo/Question/Index"),
            meta: { title: "题目管理" },
          },
          {
            hidden: true,
            name: "/repo/library/:libraryId/questions/add",
            path: "/repo/library/:libraryId/questions/add",
            component: () => import("@/views/Repo/Question/Form"),
            meta: { title: "创建题目" },
          },
          {
            hidden: true,
            name: "/repo/library/:libraryId/questions/edit/:questionId",
            path: "/repo/library/:libraryId/questions/edit/:questionId",
            component: () => import("@/views/Repo/Question/Form"),
            meta: { title: "编辑题目" },
          },
        ],
      },
      {
        name: "/teach",
        path: "/teach",
        component: RouteView,
        meta: { title: "授课中心", icon: "fund" },
        redirect: "/teach/course",
        children: [
          {
            name: "/teach/student",
            path: "/teach/student",
            component: () => import("@/views/Teach/Student/Index"),
            meta: { title: "班级学员" },
          },
          {
            name: "/teach/course",
            path: "/teach/course",
            component: () => import("@/views/Teach/Course/Index"),
            meta: { title: "课程管理" },
          },
          {
            name: "/teach/paper",
            path: "/teach/paper",
            component: () => import("@/views/Teach/Paper/Index"),
            meta: { title: "试卷管理" },
          },
          {
            hidden: true,
            name: "/teach/paper/:paperId/questions",
            path: "/teach/paper/:paperId/questions",
            component: () => import("@/views/Teach/Paper/Form"),
            meta: { title: "题目管理" },
          },
          // {
          //   name: "/teach/homework",
          //   path: "/teach/homework",
          //   component: () => import("@/views/Teach/Homework/Index"),
          //   meta: { title: "家庭作业" },
          // },
          // {
          //   name: "/teach/analysis",
          //   path: "/teach/analysis",
          //   component: () => import("@/views/Teach/Analysis/Index"),
          //   meta: { title: "统计分析" },
          // },
        ],
      },
      {
        name: "/school",
        path: "/school",
        component: RouteView,
        meta: { title: "班级中心", icon: "apartment" },
        redirect: "/school/klass",
        children: [
          {
            name: "/school/klass",
            path: "/school/klass",
            component: () => import("@/views/School/Klass/Index"),
            meta: { title: "班级管理" },
          },
          {
            name: "/school/student",
            path: "/school/student",
            component: () => import("@/views/School/Student/Index"),
            meta: { title: "学员管理" },
          },
          {
            hidden: true,
            name: "/school/student/add",
            path: "/school/student/add",
            component: () => import("@/views/School/Student/Form"),
            meta: { title: "创建学员" },
          },
          {
            hidden: true,
            name: "/school/student/edit/:id",
            path: "/school/student/edit/:id",
            component: () => import("@/views/School/Student/Form"),
            meta: { title: "编辑学员" },
          },
          {
            hidden: true,
            name: "/school/student/detail/:id",
            path: "/school/student/detail/:id",
            component: () => import("@/views/School/Student/Detail"),
            meta: { title: "查看学员" },
          },
        ],
      },
      {
        name: "/vote",
        path: "/vote",
        component: RouteView,
        meta: { title: "投票助手", icon: "like" },
        redirect: "/vote/index",
        children: [
          {
            name: "/vote/index",
            path: "/vote/index",
            component: () => import("@/views/Vote/Index"),
            meta: { title: "投票清单" },
          },
        ],
      },
      {
        name: "/activity",
        path: "/activity",
        component: RouteView,
        meta: { title: "运营活动", icon: "fire" },
        redirect: "/activity/index",
        children: [
          {
            name: "/activity/index",
            path: "/activity/index",
            component: () => import("@/views/Activity/Index"),
            meta: { title: "活动清单" },
          },
        ],
      },
      {
        name: "/questionnaire",
        path: "/questionnaire",
        component: RouteView,
        meta: { title: "问卷调查", icon: "file-word" },
        redirect: "/questionnaire/index",
        children: [
          {
            name: "/questionnaire/index",
            path: "/questionnaire/index",
            component: () => import("@/views/Questionnaire/Index"),
            meta: { title: "问卷清单" },
          },
        ],
      },
      {
        name: "/customer",
        path: "/customer",
        component: RouteView,
        meta: { title: "客户管理", icon: "usergroup-add" },
        redirect: "/customer/index",
        children: [
          {
            name: "/customer/index",
            path: "/customer/index",
            component: () => import("@/views/Customer/Index"),
            meta: { title: "客户清单" },
          },
        ],
      },
      {
        name: "/order",
        path: "/order",
        component: RouteView,
        meta: { title: "订单管理", icon: "shop" },
        redirect: "/order/index",
        children: [
          {
            name: "/order/index",
            path: "/order/index",
            component: () => import("@/views/Order/Index"),
            meta: { title: "订单清单" },
          },
        ],
      },
      {
        name: "/hr",
        path: "/hr",
        component: RouteView,
        meta: { title: "人事管理", icon: "smile" },
        redirect: "/hr/index",
        children: [
          {
            name: "/hr/index",
            path: "/hr/index",
            component: () => import("@/views/Hr/Index"),
            meta: { title: "员工清单" },
          },
        ],
      },
      {
        name: "/finance",
        path: "/finance",
        component: RouteView,
        meta: { title: "财务管理", icon: "money-collect" },
        redirect: "/finance/index",
        children: [
          {
            name: "/finance/index",
            path: "/finance/index",
            component: () => import("@/views/Finance/Index"),
            meta: { title: "收支清单" },
          },
        ],
      },
      {
        name: "/cms",
        path: "/cms",
        component: RouteView,
        meta: { title: "新闻管理", icon: "sketch" },
        redirect: "/cms/category",
        children: [
          {
            name: "/cms/category",
            path: "/cms/category",
            component: () => import("@/views/Cms/Category/Index"),
            meta: { title: "分类管理" },
          },
          {
            name: "/cms/article",
            path: "/cms/article",
            component: () => import("@/views/Cms/Article/Index"),
            meta: { title: "文章管理" },
          },
          {
            hidden: true,
            name: "/cms/article/add",
            path: "/cms/article/add",
            component: () => import("@/views/Cms/Article/Form"),
            meta: { title: "创建文章" },
          },
          {
            hidden: true,
            name: "/cms/article/edit/:id",
            path: "/cms/article/edit/:id",
            component: () => import("@/views/Cms/Article/Form"),
            meta: { title: "编辑文章" },
          },
        ],
      },
      {
        name: "/broadcast",
        path: "/broadcast",
        component: RouteView,
        meta: { title: "小喇叭", icon: "message" },
        redirect: "/broadcast/publish",
        children: [
          {
            name: "/broadcast/publish",
            path: "/broadcast/publish",
            component: () => import("@/views/Broadcast/Index"),
            meta: { title: "发布" },
          },
          {
            name: "/broadcast/history",
            path: "/broadcast/history",
            component: () => import("@/views/Broadcast/Index"),
            meta: { title: "历史记录" },
          },
        ],
      },
      {
        name: "/tool",
        path: "/tool",
        component: RouteView,
        meta: { title: "小工具", icon: "tool" },
        redirect: "/tool/ueditor",
        children: [
          {
            name: "/tool/ueditor",
            path: "/tool/ueditor",
            component: () => import("@/views/Tool/UEditor/Index"),
            meta: { title: "富文本编辑器" },
          },
          {
            name: "/tool/t1",
            path: "/tool/t1",
            component: () => import("@/views/Tool/Index"),
            meta: { title: "节日贺卡" },
          },
          {
            name: "/tool/t2",
            path: "/tool/t2",
            component: () => import("@/views/Tool/Index"),
            meta: { title: "Banner制作" },
          },
          {
            // https://github.com/doocs/md
            name: "/tool/t3",
            path: "/tool/t3",
            component: () => import("@/views/Tool/Index"),
            meta: { title: "公众号排版" },
          },
        ],
      },
      {
        name: "/system",
        path: "/system",
        component: RouteView,
        meta: { title: "系统管理", icon: "setting" },
        redirect: "/system/deploy",
        children: [
          {
            name: "/system/deploy",
            path: "/system/deploy",
            component: () => import("@/views/System/Deploy/Index"),
            meta: { title: "应用部署" },
          },
          {
            name: "/system/org",
            path: "/system/org",
            component: () => import("@/views/System/Org/Index"),
            meta: { title: "部门管理" },
          },
          {
            name: "/system/employee",
            path: "/system/employee",
            component: () => import("@/views/System/Employee/Index"),
            meta: { title: "员工管理" },
          },
          {
            name: "/system/menu",
            path: "/system/menu",
            component: () => import("@/views/System/Menu/Index"),
            meta: { title: "菜单目录" },
          },
          {
            name: "/system/dict",
            path: "/system/dict",
            component: () => import("@/views/System/Dict/Index"),
            meta: { title: "字典配置" },
          },
          {
            hidden: true,
            name: "/system/dict/add",
            path: "/system/dict/add",
            component: () => import("@/views/System/Dict/Form"),
            meta: { title: "创建字典" },
          },
          {
            hidden: true,
            name: "/system/dict/edit/:id",
            path: "/system/dict/edit/:id",
            component: () => import("@/views/System/Dict/Form"),
            meta: { title: "编辑字典" },
          },
          {
            name: "/system/log",
            path: "/system/log",
            component: () => import("@/views/System/Log/Index"),
            meta: { title: "登录日志" },
          },
        ],
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
