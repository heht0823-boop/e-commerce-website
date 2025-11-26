//管理用户相关数据
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    //1.定义管理用户数据的state
    const userInfo = ref({});
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      try {
        const res = await loginAPI({ account, password });
        userInfo.value = res.result;
      } catch (error) {
        console.error("登录失败", error);
        throw error;
      }
    };
    //3.以对象的格式把state和action返回出去
    return {
      userInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  }
);
