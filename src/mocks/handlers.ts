// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import type {
  UserResponse,
  AddressItem,
  UpdateUserInfoData,
  AddressFormData,
} from "@/types/mock/user";
// 模拟地址数据
let mockAddresses: AddressItem[] = [
  {
    id: "1",
    receiver: "张三",
    contact: "13812345678",
    province: "北京市",
    city: "北京市",
    county: "朝阳区",
    address: "建国路88号SOHO现代城A座",
    isDefault: true,
    postalCode: "100020",
  },
  {
    id: "2",
    receiver: "李四",
    contact: "13987654321",
    province: "上海市",
    city: "上海市",
    county: "浦东新区",
    address: "陆家嘴环路1000号",
    isDefault: false,
    postalCode: "200120",
  },
  {
    id: "3",
    receiver: "王五",
    contact: "15876543210",
    province: "广东省",
    city: "广东省",
    county: "深圳市",
    address: "深圳南山区",
    isDefault: false,
    postalCode: "300120",
  },
];
// 模拟用户数据
let mockUser: UserResponse = {
  id: "1",
  account: "ht",
  email: "htht0823@qq.com",
  phone: "13812345678",
  gender: "男",
  birthday: "2000-01-01",
  avatar: "/images/avatar-default.png",
  level: "VIP会员",
  integral: 1250,
  balance: 123.45,
  createTime: "2026-01-29",
  lastLoginTime: "2026-03-01",
  addressList: mockAddresses,
  token: "mock-token",
};
export const handlers = [
  //获取用户信息
  http.get("/mock/member/profile", () => {
    return HttpResponse.json({
      code: 200,
      msg: "获取成功",
      result: mockUser,
    });
  }),
  //更新用户信息
  http.put("/mock/member/profile", async ({ request }) => {
    const data: UpdateUserInfoData = (await request.json()) as UpdateUserInfoData;
    Object.assign(mockUser, data);
    return HttpResponse.json({
      code: 200,
      msg: "更新成功",
      result: mockUser,
    });
  }),
  //获取地址列表
  http.get("/mock/member/address", () => {
    return HttpResponse.json({
      code: 200,
      msg: "获取成功",
      result: mockAddresses,
    });
  }),
  //添加地址
  http.post("/mock/member/address", async ({ request }) => {
    const data: AddressFormData = (await request.json()) as AddressFormData;
    const newAddress: AddressItem = {
      ...data,
      id: Date.now().toString(),
    };
    //如果设为默认地址,将其他地址的默认状态取消
    if (data.isDefault) {
      mockAddresses = mockAddresses.map((item) => {
        item.isDefault = false;
        return item;
      });
    }
    mockAddresses.push(newAddress);
    return HttpResponse.json({
      code: 200,
      msg: "添加成功",
      result: newAddress,
    });
  }),
  //更新地址
  http.put("/mock/member/address/:id", async ({ request, params }) => {
    const id = params.id as string;
    const data: AddressFormData = (await request.json()) as AddressFormData;
    const addressIndex = mockAddresses.findIndex((item) => item.id === id);
    if (addressIndex === -1) {
      return HttpResponse.json({
        code: 400,
        msg: "地址不存在",
        result: null,
      });
    }
    if (data.isDefault) {
      mockAddresses.forEach((item) => {
        item.isDefault = item.id === id;
      });
    }
    mockAddresses[addressIndex] = {
      ...mockAddresses[addressIndex],
      ...data,
    };
    return HttpResponse.json({
      code: 200,
      msg: "更新成功",
      result: mockAddresses[addressIndex],
    });
  }),
  //删除地址
  http.delete("/mock/member/address/:id", ({ params }) => {
    const id = params.id as string;
    const addressIndex = mockAddresses.findIndex((item) => item.id === id);
    if (addressIndex === -1) {
      return HttpResponse.json({
        code: 400,
        msg: "地址不存在",
        result: null,
      });
    }
    if (mockAddresses[addressIndex].isDefault && mockAddresses.length > 1) {
      mockAddresses[0].isDefault = true;
    }
    mockAddresses.splice(addressIndex, 1);
    return HttpResponse.json({
      code: 200,
      msg: "删除成功",
      result: null,
    });
  }),
  //设置默认地址
  http.put("/mock/member/address/:id/default", ({ params }) => {
    const id = params.id as string;
    const address = mockAddresses.find((item) => item.id === id);
    if (!address) {
      return HttpResponse.json({
        code: 404,
        msg: "地址不存在",
        result: null,
      });
    }
    //将所有的地址的默认状态取消,然后设置当前地址为默认
    mockAddresses = mockAddresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));
    return HttpResponse.json({
      code: 200,
      msg: "设置成功",
      result: null,
    });
  }),
];
