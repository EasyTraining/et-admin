import axios from "axios";
import { Cookies } from "@/utils/index";
import { VueAxios } from "./axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000,
});

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Access-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request);
  },
};

export default request;

export { installer as VueAxios, request as axios };
