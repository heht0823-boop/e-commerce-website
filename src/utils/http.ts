// axios基础封装
import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"; // 替换为 InternalAxiosRequestConfig
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";
import type { ApiResponse } from "@/types/index";

// 1. 无需为 axios.create 显式指定复杂类型，自动推导即可（避免类型冲突）
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 10000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  // 2. 统一使用 InternalAxiosRequestConfig 类型约束 config 参数
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // // 开发环境下打印请求信息
    // if (import.meta.env.DEV) {
    //   console.log("%c[API Request]", "color: blue; font-weight: bold;", config.url, {
    //     method: config.method,
    //     params: config.params,
    //     data: config.data,
    //     headers: config.headers,
    //   });
    // }

    // 从pinia获取token数据
    const userStore = useUserStore();
    const token = userStore.userInfo?.token;

    if (token) {
      // 3. 优化 headers 类型断言，兼容 InternalAxiosRequestConfig 的 headers 类型
      // 先确保 headers 不为 undefined，再断言为 AxiosRequestHeaders（axios 内置头部类型）
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return config; // 返回类型匹配 InternalAxiosRequestConfig，无兼容问题
  },
  // 4. 错误回调参数保持 AxiosError<ApiResponse> 不变
  (e: AxiosError<ApiResponse>) => Promise.reject(e),
);

let isredirectingToLogin = false;

// axios响应拦截器
// axios响应拦截器：显式指定泛型 <ApiResponse, ApiResponse>，适配返回值类型
httpInstance.interceptors.response.use(
  (res: AxiosResponse<ApiResponse>) => {
    // // 开发环境下打印响应信息
    // if (import.meta.env.DEV) {
    //   console.log("%c[API Response]", "color: green; font-weight: bold;", res.config.url, res.data);
    // }
    // 直接返回 res.data（类型为 ApiResponse），泛型已适配，无报错
    return res;
  },
  (e: AxiosError<ApiResponse>) => {
    // 原有错误处理逻辑不变
    if (import.meta.env.DEV) {
      console.log(
        "%c[API Error Response]",
        "color: red; font-weight: bold;",
        e.config?.url,
        e.response?.data || e.message,
      );
    }

    const userStore = useUserStore();
    if (e.code === "ECONNABORTED" || e.message?.includes("timeout")) {
      ElMessage.error("请求超时，请稍后重试");
    } else if (e.response) {
      if (e.response.status >= 500) {
        ElMessage.error("服务器错误，请稍后重试");
      } else if (e.response.status >= 400) {
        ElMessage.warning(e.response.data?.data.msg || "请求失败");
      }
    } else {
      ElMessage.error("网络异常，请检查网络");
    }

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
