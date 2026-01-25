import request from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type { PayResponse } from "@/types/pay";

export const getOrderAPI = async (id: string): Promise<ApiResponse<PayResponse>> => {
  return request({
    url: `/member/order/${id}`,
  });
};
