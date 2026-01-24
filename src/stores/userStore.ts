//管理用户相关数据
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";
import type { UserInfo, LoginParams } from "@/types/index";
export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    const INITIAL_USER_INFO: UserInfo = {
      account: "",
      avatar: "",
      birthday: "",
      cityCode: "",
      gender: "",
      id: "",
      mobile: "",
      nickname: "",
      profession: "",
      provinceCode: "",
      token: "",
    };
    //1.定义管理用户数据的state
    const userInfo = ref<UserInfo>({
      ...INITIAL_USER_INFO,
    });
    type CartMergeItem = {
      skuId: string | number;
      selected: boolean;
      count: number;
    };
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }: LoginParams) => {
      try {
        const res = await loginAPI({ account, password });
        userInfo.value = res.data.result;
        console.log(res.data.result);
        const cartData = cartStore.cartList.map((item): CartMergeItem => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        });
        //登录成功后，把购物车中已有的购物项合并到登录后的购物车中
        await mergeCartAPI(cartData);
        //更新购物车列表
        await cartStore.updateNewList();
      } catch (error: unknown) {
        console.error("登录失败", error);
        throw error;
      }
    };
    //退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...INITIAL_USER_INFO };
      //执行清除购物车的action函数
      cartStore.clearCart();
    };
    //检查登录状态
    const isLogin = computed(() => {
      return !!userInfo.value.token;
    });
    //3.以对象的格式把state和action返回出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
      isLogin,
    };
  },
  {
    persist: true,
  },
);
