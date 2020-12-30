import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import { sha256 as _sha256 } from "js-sha256";
import _Cookies from "js-cookie";
import _storage from "store";

export const storage = _storage;

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

export const getBrowser = () => {
  let ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1],
  };
};

export const getSiteCfg = () => {
  return storage.get("SYSTEM_GLOBAL") || {};
};

export const setSiteCfg = (json) => {
  const defaultCfg = {
    company_name: "企业名称",
  };
  storage.set("SYSTEM_GLOBAL", json || defaultCfg);
};
