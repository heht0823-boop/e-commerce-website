//提交下单/member/oredr
//order->goods
export interface OrderDataGoods {
  count: number;
  skuId: string;
}
export interface OrderData {
  addressId: string;
  buyerMessage: string;
  deliveryTimeType: number;
  goods: OrderDataGoods[];
  payChannel: number;
  payType: number;
}
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
  skus: unknown[] | null;
  totalMoney: number;
  totalNum: number;
}
