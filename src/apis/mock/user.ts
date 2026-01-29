import request from "@/utils/mockHttp";
import type { ApiResponse } from "@/types/index";
import type {
  UserResponse,
  UpdateUserInfoData,
  AddressItem,
  AddressFormData,
} from "@/types/mock/user";
//获取用户信息
export const getUserProfile = async (): Promise<ApiResponse<UserResponse>> => {
  return request({
    url: "/mock/member/profile",
    method: "GET",
  });
};
//更新用户信息
export const updataUserProfile = async (
  data: UpdateUserInfoData,
): Promise<ApiResponse<UserResponse>> => {
  return request({
    url: "/mock/member/profile",
    method: "PUT",
    data,
  });
};
//获取用户地址列表
export const getAddressList = async (): Promise<ApiResponse<AddressItem[]>> => {
  return request({
    url: "/mock/member/address",
    method: "GET",
  });
};
//添加地址
export const addAddress = async (data: AddressFormData): Promise<ApiResponse<AddressItem>> => {
  return request({
    url: "/mock/member/address",
    method: "POST",
    data,
  });
};

// 更新地址
export const updateAddress = async (
  id: string,
  data: AddressFormData,
): Promise<ApiResponse<AddressItem>> => {
  return request({
    url: `/mock/member/address/${id}`,
    method: "PUT",
    data,
  });
};

// 删除地址
export const deleteAddressApi = async (id: string): Promise<ApiResponse<void>> => {
  return request({
    url: `/mock/member/address/${id}`,
    method: "DELETE",
  });
};

// 设置默认地址
export const setDefaultAddress = async (id: string): Promise<ApiResponse<void>> => {
  return request({
    url: `/mock/member/address/${id}/default`,
    method: "PUT",
  });
};
