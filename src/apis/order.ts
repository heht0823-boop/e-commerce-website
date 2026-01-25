import request from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { OrderData, OrderResponse } from "@/types/order";
/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

export const getUserOrder = async (data: OrderData): Promise<ApiResponse<OrderResponse>> => {
  return request({
    url: "/member/order",
    method: "GET",
    data,
  });
};
