//封装购物车相关接口
import request from "@/utils/http";
import type {
  AddCartData,
  CartItem,
  DeleteCartResponse,
  MergeCartData,
  MergeCartResponse,
} from "@/types/cart";
import type { ApiResponse } from "@/types/index";
//加入购物车
export const insertCartAPI = async ({
  skuId,
  count,
}: AddCartData): Promise<ApiResponse<CartItem[]>> => {
  return request({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
};
//删除购物车
export const deleteCartAPI = async (ids: string[]): Promise<ApiResponse<DeleteCartResponse>> => {
  return request({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};

//获取最新的购物车列表
export const findNewCartListAPI = async (): Promise<ApiResponse<CartItem[]>> => {
  return request({
    url: "/member/cart",
    method: "GET",
  });
};
//合并购物车
export const mergeCartAPI = async (
  data: MergeCartData[],
): Promise<ApiResponse<MergeCartResponse>> => {
  return request({
    url: "/member/cart/merge",
    method: "POST",
    data,
  });
};
