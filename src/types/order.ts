//提交下单/member/order
//order->goods
export interface OrderDataGoods {
  count: number;
  skuId: string;
}
export interface OrderParams {
  orderState: number;
  page: number;
  pageSize: number;
}
export interface OrderData {
  addressId: string;
  buyerMessage: string;
  deliveryTimeType: number;
  goods: OrderDataGoods[];
  payChannel: number;
  payType: number;
}

//post
export interface OrderResponse {
  countdown: number | null;
  createTime: string;
  id: string;
  orderState: number;
  payChannel: number;
  payLatestTime: string;
  payMoney: number;
  payType: number;
  postFee: number;
  skus: OrderSkus[] | null;
  totalMoney: number;
  totalNum: number;
}
//skus->properties
export interface OrderProperties {
  propertyMainName: string;
  propertyValueName: string;
}
//items->skus
export interface OrderSkus {
  attrsText: string;
  curPrice: number;
  id: string;
  image: string;
  name: string;
  properties: OrderProperties[];
  quantity: number;
  realPay: number;
  spuId: string;
  totalMoney: number | null;
}
//get
export interface GetOrderResponse {
  counts: number;
  items: OrderResponse[];
  page: number;
  pageSize: number;
  pages: number;
}
