//axios基础封装
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

const httpInstance = axios.create({
  //基地址
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  //超时时间
  timeout: 10000,
});
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //1.从pinia获取token数据
    const userStore = useUserStore();
    //2.按照后端的要求进行拼接
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e),
);
let isredirectingToLogin = false;

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    if (e.code === "ECONNABORTED" || e.message.includes("timeout")) {
      //超时错误
      ElMessage.error("请求超时，请稍后重试");
    } else if (e.response?.status >= 500) {
      //服务器错误
      ElMessage.error("服务器错误，请稍后重试");
    } else if (e.response?.status >= 400) {
      ElMessage.warning(e.response?.data?.message || "请求失败");
    } else {
      //网络等其他问题
      ElMessage.error("网络异常，请检查网络");
    }
    //401token失效处理
    //清除本地用户数据
    //跳转到登录页
    if (e.response?.status === 401) {
      if (!isredirectingToLogin) {
        isredirectingToLogin = true;
        userStore.clearUserInfo();
        router.push("/login").then(() => {
          isredirectingToLogin = false;
        });
      }
    }
    return Promise.reject(e);
  },
);
export default httpInstance;
