import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserResponse, AddressItem } from "@/types/mock/user";
import { getUserProfile, getAddressList } from "@/apis/mock/user";

export const useMockUserStore = defineStore(
  "mockUser",
  () => {
    //用户信息
    const userInfo = ref<UserResponse | null>(null);
    //获取用户详细信息
    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile();
        userInfo.value = res?.data?.result;
      } catch (err: unknown) {
        console.log("获取用户信息失败", err);
      }
    };
    //退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = null;
    };
    return {
      userInfo,
      fetchUserProfile,
      clearUserInfo,
    };
  },
  {
    persist: true,
  },
);
