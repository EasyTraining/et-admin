import Vue from "vue";
import dayjs from "dayjs";
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

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
Vue.filter("humanFileSize", (bytes) => {
  const dp = 1;
  const si = false;
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  return bytes.toFixed(dp) + " " + units[u];
});
