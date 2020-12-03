<template>
  <div>
    <a-row :gutter="15">
      <a-col :span="12" v-for="app in appList" :key="app.code">
        <a-card style="margin-bottom: 15px">
          <template slot="actions" class="ant-card-actions">
            <div>
              <span>状态：</span>
              <a-tag v-if="app.running" color="green">运行中</a-tag>
              <a-tag v-else color="red">未运行</a-tag>
            </div>
            <a v-if="app.enable" href="javascript:;" style="color: #027db4" @click="onDeploy(app)">
              <a-icon type="deployment-unit" />
              重新启动
            </a>
            <a v-else href="javascript:;">尚未部署</a>
          </template>
          <a-card-meta :title="app.title" :description="app.desc" />
        </a-card>
      </a-col>
    </a-row>

    <process-modal
      :visible="processModalVisible"
      :target="currentTarget"
      @cancel="closeProcessModal"
    />
  </div>
</template>

<script>
import ProcessModal from "./components/ProcessModal";

export default {
  name: "SystemDeploy",
  components: { ProcessModal },
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
          code: "ET_WEBSITE",
          title: "【易培训】官网",
          desc: "ET_WEBSITE 是机构的官方网站, 适配PC、手机、Pad",
          enable: false,
          running: false,
        },
      ],

      currentTarget: "",
      processModalVisible: false,
    };
  },
  methods: {
    onDeploy(app) {
      this.$confirm({
        title: `是否重新启动 ${app.title} ?`,
        content: "启动期间, 会出现短暂不可访问, 大约持续 2 分钟",
        onOk: () => {
          this.showProcessModal(app);
        },
        onCancel: () => {},
      });
    },

    showProcessModal({ code }) {
      this.currentTarget = code;
      this.processModalVisible = true;
    },

    closeProcessModal() {
      this.currentTarget = "";
      this.processModalVisible = false;
    },
  },
};
</script>
