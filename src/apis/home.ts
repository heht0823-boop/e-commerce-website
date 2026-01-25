import httpInstance from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { BannerResponse, NewResponse, HotResponse, HomeGoodsResponse } from "@/types/home";
//获取banner数据
export const getBannerAPI = async (
  distributionSite = "1",
): Promise<ApiResponse<BannerResponse>> => {
  // 默认为1 商品为2
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
};
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = async (): Promise<ApiResponse<NewResponse>> => {
  return httpInstance({
    url: "/home/new",
  });
};

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = async (): Promise<ApiResponse<HotResponse>> => {
  return httpInstance({
    url: "/home/hot",
  });
};

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = async (): Promise<ApiResponse<HomeGoodsResponse>> => {
  return httpInstance({
    url: "/home/goods",
  });
};
