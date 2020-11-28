<template>
  <div>
    <a-row :gutter="15">
      <a-col :span="12">
        <a-card size="small" title="输入区">
          <template slot="extra">
            <a href="javascript:;" @click="standardModalVisible = true">输入范例</a>
          </template>
          <div class="area">
            <textarea class="area__textarea" @paste="onPaste" />
          </div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card size="small" title="检查区">
          <div class="area"></div>
        </a-card>
      </a-col>
    </a-row>

    <paste-standard-modal :visible="standardModalVisible" @cancel="standardModalVisible = false" />
  </div>
</template>

<script>
import PasteStandardModal from "./PasteStandardModal";

export default {
  name: "PasteTab",
  components: { PasteStandardModal },
  data() {
    return {
      standardModalVisible: false,
    };
  },
  methods: {
    onPaste(evt) {
      const text = evt.clipboardData.getData("text");
      console.log(text);
    },
  },
};
</script>

<style lang="less" scoped>
.area {
  &__textarea {
    width: 100%;
    min-height: 400px;
    border: none;
    outline: none;
  }
}
</style>
