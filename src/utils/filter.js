import Vue from "vue";
import * as Const from "./const";

Vue.filter("questionTypeToLabel", (level) => {
  return Const.questionMap[level];
});

Vue.filter("levelToLabel", (level) => {
  return Const.levelMap[level];
});
