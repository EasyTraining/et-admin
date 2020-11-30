import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import { sha256 as _sha256 } from "js-sha256";
import _Cookies from "js-cookie";

export const Cookies = _Cookies;

export const sha256 = _sha256;

export const uuid = uuidv4;

export const _ = lodash;

export const attachUuid = (arr = []) => {
  return arr.map((item) => {
    item.uuid = uuid();
    return item;
  });
};

export const removeUuid = (arr = []) => {
  return arr.map((item) => {
    delete item.uuid;
    return item;
  });
};

export const findOneAndUpdate = (source, conditions, fields) => {
  source = source || [];
  conditions = conditions || {};
  fields = fields || {};
  return source.map((item) => {
    let matched = true;
    Object.keys(conditions).forEach((key) => {
      const val = conditions[key];
      if (item[key] !== val) {
        matched = false;
      }
    });
    if (matched) {
      item = { ...item, ...fields };
    }
    return item;
  });
};
