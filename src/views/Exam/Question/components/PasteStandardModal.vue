<template>
  <a-modal title="输入范例" :visible="visible" :footer="null" @cancel="onCancel">
    <h3>单选题</h3>
    <p>1.驾驶人有下列哪种违法行为一次记6分</p>
    <ul>
      <li>A、使用其他车辆行驶证</li>
      <li>B、饮酒后驾驶机动车</li>
      <li>C、车速超过规定时速50%以上</li>
      <li>D、违法占用应急车道行驶</li>
    </ul>
    <p>答案:D</p>
    <p>解析:请仔细阅读交规 (若无解析本行可不填)</p>
  </a-modal>
</template>

<script>
export default {
  name: "PasteStandardModal",
  props: ["visible"],
  methods: {
    onCancel() {
      this.$emit("cancel", null);
    },
  },
};
</script>
