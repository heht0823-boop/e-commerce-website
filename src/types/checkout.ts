//获取详情接口/member/order/pre

import { s } from "vue-router/dist/router-CWoNjPRp.mjs";

//OrderPre->goods
export interface OrderPreGoods {
  attrsText: string;
  count: number;
  id: string;
  name: string;
  payPrice: string;
  picture: string;
  price: string;
  skuId: string;
  totalPayPrice: string;
  totalPrice: string;
}
//OrderPre->summary
export interface OrderPreSummary {
  discountPrice: number;
  goodsCount: number;
  postFee: number;
  totalPayPrice: number;
  totalPrice: number;
}
//OrderPre->userAddresses
export interface OrderPreUserAddresses {
  address: string;
  addressTags: string;
  cityCode: string;
  contact: string;
  countyCode: string;
  fullLocation: string;
  id: string;
  isDefault: number;
  postalCode: string;
  provinceCode: string;
  receiver: string;
}
export interface OrderPreResponse {
  goods: OrderPreGoods[];
  summary: OrderPreSummary;
  userAddresses: OrderPreUserAddresses[];
}
//创建订单/member/order
//order->goods
export interface OrderGoods {
  count: number;
  skuId: string;
}
export interface CreateOrderData {
  addressId: string;
  buyerMessage: string;
  deliveryTimeType: number;
  goods: OrderGoods[];
  payChannel: number;
  payType: number;
}
export interface CreateOrderResponse {
  countdown: string | null;
  createTime: string;
  id: string;
  orderState: number;
  payChannel: number;
  payLatestTime: string;
  payMoney: number;
  payType: number;
  postFee: number;
  skus: string | null;
  totalMoney: number;
  totalNum: number;
}
