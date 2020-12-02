<template>
  <div>
    <a-row :gutter="15">
      <a-col :span="12" v-for="app in appList" :key="app.code">
        <a-card style="margin-bottom: 15px;">
          <template slot="actions" class="ant-card-actions">
            <div>
              <span>状态：</span>
              <a-tag v-if="app.running" color="green">运行中</a-tag>
              <a-tag v-else color="red">未运行</a-tag>
            </div>
            <a v-if="app.enable" href="javascript:;" style="color: #027db4">
              <a-icon type="deployment-unit" />
              重新启动
            </a>
            <a v-else href="javascript:;">尚未部署</a>
          </template>
          <a-card-meta :title="app.title" :description="app.desc" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "SystemDeploy",
  data() {
    return {
      appList: [
        {
          code: "ET_API",
          title: "【易培训】接口服务",
          desc: "接口是整个系统的基石, 所有子系统均依赖此服务",
          enable: true,
          running: true,
        },
        {
          code: "ET_ADMIN",
          title: "【易培训】运营系统",
          desc: "运营系统服务于管理员、教师等有较高权限的人群",
          enable: true,
          running: true,
        },
        {
          code: "ET_WEB",
          title: "【易培训】学员网页版",
          desc: "ET_WEB 服务于学员, 在网页端学员可以答题、完成作业、参与考试等",
          enable: false,
          running: false,
        },
        {
          code: "ET_MOBILE",
          title: "【易培训】学员手机版",
          desc: "ET_MOBILE 是 ET_WEB 为手机、Pad 适配版本",
          enable: false,
          running: false,
        },
        {
          code: "ET_WEBSITE",
          title: "【易培训】官网",
          desc: "ET_WEBSITE 是机构的官方网站, 适配PC、手机、Pad",
          enable: false,
          running: false,
        },
        {
          code: "ET_QUESTION",
          title: "【易培训】问卷调查网页版",
          desc: "ET_QUESTION 是问卷调查的网页版, 适配PC、手机、Pad",
          enable: false,
          running: false,
        },
        {
          code: "ET_QUESTION",
          title: "【易培训】运营活动网页版",
          desc: "ET_QUESTION 是运营活动的网页版, 适配PC、手机、Pad",
          enable: false,
          running: false,
        },
      ],
    };
  },
};
</script>
