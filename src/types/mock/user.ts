//地址信息
export interface AddressItem {
  id: string;
  receiver: string;
  contact: string; //联系方式
  province: string;
  city: string;
  county: string;
  address: string;
  isDefault: boolean;
  postalCode?: string;
}
//用户信息
export interface UserResponse {
  id: string;
  account: string;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
  avatar: string;
  level: string;
  integral: number; //积分
  balance: number; //余额
  createTime: string;
  lastLoginTime: string;
  addressList: AddressItem[];
  token: string;
}
//更新用户信息
export interface UpdateUserInfoData {
  account?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthday?: string;
  avatar?: string;
}
//地址表单数据
export interface AddressFormData {
  receiver: string;
  contact: string;
  province: string;
  city: string;
  county: string;
  address: string;
  isDefault: boolean;
  postalCode?: string;
}
