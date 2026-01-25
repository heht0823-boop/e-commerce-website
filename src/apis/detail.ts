import httpInstance from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { GoodsResponse, GoodsHotResponse, GoodsHotParams } from "@/types/detail";
export const getDetail = async (id: string): Promise<ApiResponse<GoodsResponse>> => {
  return httpInstance({
    url: "/goods",
    params: {
      id,
    },
  });
};

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = async ({
  id,
  type,
  limit = 3,
}: GoodsHotParams): Promise<ApiResponse<GoodsHotResponse>> => {
  return httpInstance({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};
