<template>
  <div>
    <div>共计: {{ count.TOTAL }}道</div>
    <div>
      单选题: {{ count.RADIO }}道, 占比:
      {{ (count.RADIO / count.TOTAL) | percent }}%
    </div>
    <div>
      多选题: {{ count.CHECKBOX }}道, 占比:
      {{ (count.CHECKBOX / count.TOTAL) | percent }}%
    </div>
    <div>
      判断题: {{ count.BOOLEAN }}道, 占比:
      {{ (count.BOOLEAN / count.TOTAL) | percent }}%
    </div>
    <div>
      填空题: {{ count.BLANK }}道, 占比:
      {{ (count.BLANK / count.TOTAL) | percent }}%
    </div>
    <div>
      排序题: {{ count.SORT }}道, 占比:
      {{ (count.SORT / count.TOTAL) | percent }}%
    </div>
    <div>
      简答题: {{ count.ANSWER }}道, 占比:
      {{ (count.ANSWER / count.TOTAL) | percent }}%
    </div>
    <div>
      论述题: {{ count.ESSAY_QUESTION }}道, 占比:
      {{ (count.ESSAY_QUESTION / count.TOTAL) | percent }}%
    </div>
    <div>
      计算题: {{ count.CALC }}道, 占比:
      {{ (count.CALC / count.TOTAL) | percent }}%
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeCounter",
  props: ["count"],
  filters: {
    percent(val) {
      if (val) {
        return (val * 100).toFixed(2);
      } else {
        return "0";
      }
    },
  },
};
</script>
