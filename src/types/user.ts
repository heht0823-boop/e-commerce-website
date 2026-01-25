import type { CategoryChildGoods } from "@/types/category";
//用户登录相关信息/login
export interface LoginData {
  account: string;
  password: string;
}
export interface LoginResponse {
  account: string;
  avatar: string;
  birthday: string;
  cityCode: string;
  gender: string;
  id: string;
  mobile: string;
  nickname: string;
  profession: string;
  provinceCode: string;
  token: string;
}
//猜你喜欢相关商品/goods/relevant
// export interface relevantParams {
//   limit: number;
// }
export type relevantResponse = CategoryChildGoods[];
