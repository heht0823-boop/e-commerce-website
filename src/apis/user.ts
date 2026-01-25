//封装所有和用户相关的函数
import httpInstance from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { LoginData, LoginResponse, relevantResponse } from "@/types/user";
import { P } from "vue-router/dist/router-CWoNjPRp.mjs";
export const loginAPI = async ({
  account,
  password,
}: LoginData): Promise<ApiResponse<LoginResponse>> => {
  return httpInstance({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
export const getLikeListAPI = async ({ limit = 4 }): Promise<ApiResponse<relevantResponse>> => {
  return httpInstance({
    url: "/goods/relevant",
    params: {
      limit,
    },
  });
};
