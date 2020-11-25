import Vue from "vue";
import dayjs from "dayjs"
import * as Const from "./const";

Vue.filter("questionTypeToLabel", (level) => {
  return Const.questionMap[level];
});

Vue.filter("levelToLabel", (level) => {
  return Const.levelMap[level];
});

Vue.filter("date", (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
});

