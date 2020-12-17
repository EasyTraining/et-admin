<template>
  <a-modal
    :keyboard="false"
    :width="600"
    centered
    :visible="visible"
    :confirm-loading="submitting"
    title="批量导入试题"
    @cancel="onCancel"
    @ok="onOk"
  >
    <div class="import">
      <p>第一步、下载 <a href="javascript:;" target="_blank">试题模板</a>，批量导入试题</p>
      <p class="text-danger">
        注：从其他Excel或Word复制试题时请使用选择性粘贴
        Word：右键—选择性粘贴—文本，Excel：右键—选择性粘贴—只勾选“值”
      </p>
      <br />
      <p>第二步、上传填写好的试题表</p>
      <p>
        <a-button icon="plus">上传文件</a-button>
      </p>
      <p class="text-grey">一次最多能导入 1000 题</p>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: "ImportModal",
  props: ["visible"],
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    onCancel() {
      this.$emit("cancel", null);
    },

    onOk() {
      this.$message.info("功能开发中...");
    },
  },
};
</script>

<style lang="less" scoped>
.import {
  position: relative;

  .text-danger {
    font-size: 13px;
    color: #f81d22;
  }

  .text-grey {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
