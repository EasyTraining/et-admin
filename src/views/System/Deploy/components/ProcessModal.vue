<template>
  <a-modal
    title="部署进度"
    :keyboard="false"
    :maskClosable="false"
    centered
    :width="500"
    :visible="visible"
    :footer="null"
    @cancel="onCancel"
  >
    <a-spin :spinning="loading" tip="正在接收数据...">
      <div style="min-height: 300px">
        <div class="log" v-for="(log, index) in logs" :key="index">
          <template v-if="log.done">
            <a-icon type="check" />
          </template>
          <template v-else>
            <a-icon v-if="index === logs.length - 1" type="loading" />
            <a-icon v-else type="check" />
          </template>
          <span class="log__msg">{{ log.msg }}</span>
          <div class="log__stack" v-if="!log.ok" style="color: red">{{ log.stack }}</div>
        </div>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: "ProcessModal",
  props: ["visible", "target"],
  data() {
    return {
      loading: false,
      logs: [],
      timer: null,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.target) {
        window.t1 = +new Date();
        this.startDeploy();
      }
    },
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    async startDeploy() {
      this.loading = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/system/deploy/start",
          params: {
            target: this.target,
          },
        });
        if (res.code !== 200) {
          this.onCancel();
          this.$message.warning(res.message);
          return;
        }
        this.startTimer();
      } catch (e) {
        this.onCancel();
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    startTimer() {
      let errCount = 0;
      this.timer = setInterval(async () => {
        try {
          const res = await this.$http({
            method: "GET",
            url: `/system/deploy/log`,
            params: {
              target: this.target,
            },
          });
          if (res.code !== 200) {
            errCount += 1;
            if (errCount > 10) {
              this.clearTimer();
            }
            return;
          }
          this.logs = res.data;
          this.logs.forEach((item) => {
            if (item.done) {
              window.t2 = +new Date();
              console.log("耗时: ", window.t2 - window.t1);
              this.clearTimer();
            }
          });
        } catch (e) {
          // ignore
        }
      }, 2000);
    },

    onCancel() {
      this.$emit("cancel", null);
    },

    clearTimer() {
      window.clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style lang="less" scoped>
.log {
  display: flex;
  align-items: center;
  line-height: 2;
  color: #52c41a;

  &__msg {
    margin-left: 10px;
  }

  &__stack {
    color: #f5222d;
  }
}
</style>
