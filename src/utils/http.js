//axios基础封装
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

const httpInstance = axios.create({
  //基地址
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  //超时时间
  timeout: 20000,
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
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    //统一错误提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    //401token失效处理
    //清除本地用户数据
    //跳转到登录页
    if (e.status.response === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
);
export default httpInstance;
