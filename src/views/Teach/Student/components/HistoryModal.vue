<template>
  <a-drawer :keyboard="false" :width="500" :visible="visible" title="广播记录" @close="onCancel">
    <div v-for="(item, index) in broadcasts" :key="index">
      <a-descriptions :column="1">
        <a-descriptions-item label="广播内容">{{ item.content }}</a-descriptions-item>
        <a-descriptions-item label="发布时间">
          <a-tag v-if="item.is_top" color="red">置顶</a-tag>
          <span>{{ item.timestamp | date }}</span>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider />
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: "HistoryModal",
  props: ["visible", "broadcasts"],
  data() {
    return {
      list: [],
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.broadcasts) {
        this.list = this.broadcasts
          .map((item) => {
            item.timestamp = item.timestamp ? Number(item.timestamp) : "";
            return item;
          })
          .sort((a, b) => b.timestamp - a.timestamp);
      }
    },
  },
  methods: {
    onCancel() {
      this.$emit("cancel", null);
    },
  },
};
</script>
