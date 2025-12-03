//管理用户相关数据
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";
export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    //1.定义管理用户数据的state
    const userInfo = ref({});
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      try {
        const res = await loginAPI({ account, password });
        userInfo.value = res.result;
        //登录成功后，把购物车中已有的购物项合并到登录后的购物车中
        await cartStore.updateNewList();
      } catch (error) {
        console.error("登录失败", error);
        throw error;
      }
    };
    //退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      //执行清除购物车的action函数
      cartStore.clearCart();
    };
    //3.以对象的格式把state和action返回出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
