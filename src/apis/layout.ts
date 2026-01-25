import httpInstance from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { HomeCategoryHeadResponse } from "@/types/layout";
export const getCategoryAPI = async (): Promise<ApiResponse<HomeCategoryHeadResponse>> => {
  return httpInstance({
    url: "/home/category/head",
  });
};
