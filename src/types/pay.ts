//下单支付页面/member/order/${id}->id:string直接拼接在路径上
//skus->properties
export interface PayProperties {
  propertyMainName: string;
  propertyValueName: string;
}
//pay->skus
export interface PaySkus {
  attrsText: string;
  curPrice: number;
  id: string;
  image: string;
  name: string;
  properties: PayProperties[];
  quantity: number;
  realPay: number;
  spuId: string;
  totalMoney: number | null;
}
export interface PayResponse {
  arrivalEstimatedTime: string | null;
  cityCode: string;
  closeTime: string | null;
  consignTime: string | null;
  countdown: number;
  countyCode: string;
  createTime: string;
  deliveryTimeType: number;
  endTime: string | null;
  evaluationTime: string | null;
  id: string;
  orderState: number;
  payChannel: number;
  payLatestTime: string;
  payMoney: number;
  payState: number;
  payTime: string | null;
  payType: number;
  postFee: number;
  provinceCode: string;
  receiverAddress: string;
  receiverContact: string;
  receiverMobile: string;
  skus: PaySkus[];
  totalMoney: number;
  totalNum: number;
}
