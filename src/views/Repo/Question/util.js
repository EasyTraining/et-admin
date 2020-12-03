import _ from "lodash";
import { optionsMap, answerMap } from "./const";

export const indexToCode = (index) => {
  const codes = "ABCDEFGHIJ";
  return codes.split("")[index];
};

export const getOptions = (type) => {
  const options = _.cloneDeep(optionsMap[type]);
  return options.map((item, index) => {
    item.code = indexToCode(index);
    return item;
  });
};

export const regenerateCodes = (options) => {
  options = _.cloneDeep(options);
  return options.map((item, index) => {
    item.code = indexToCode(index);
    return item;
  });
};

export const getRealAnswer = (type) => {
  return answerMap[type] || "";
};
