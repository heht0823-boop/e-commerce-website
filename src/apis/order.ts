import request from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { OrderData, OrderResponse, OrderParams, GetOrderResponse } from "@/types/order";
/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/
export const addUserOrder = async (data: OrderData): Promise<ApiResponse<OrderResponse>> => {
  return request({
    url: "/member/order",
    method: "POST",
    data,
  });
};
export const getUserOrder = async (params: OrderParams): Promise<ApiResponse<GetOrderResponse>> => {
  return request({
    url: "/member/order",
    method: "GET",
    params,
  });
};
