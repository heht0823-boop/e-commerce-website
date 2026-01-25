import request from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { OrderPreResponse, CreateOrderData, CreateOrderResponse } from "@/types/checkout";
//获取详情接口
export const getCheckInfoAPI = async (): Promise<ApiResponse<OrderPreResponse>> => {
  return request({
    url: "/member/order/pre",
  });
};
//创建订单
export const createOrderAPI = async (
  data: CreateOrderData,
): Promise<ApiResponse<CreateOrderResponse>> => {
  return request({
    url: "/member/order",
    method: "POST",
    data,
  });
};
