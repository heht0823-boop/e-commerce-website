// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  result: T | boolean;
}
//定义子商品分类接口
export interface GoodsChildren {
  id: string;
  layer: number;
  name: string;
  parent: null | GoodsChildren;
}
//定义商品信息接口
export interface GoodsItem {
  desc: string;
  id: string;
  name: string;
  orderNum: number;
  picture: string;
  price: string;
}
//定义顶层商品接口
export interface TopCategory {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: GoodsChildren[];
  goods: GoodsItem[];
}
//头部子分类
export interface HeaderChildren {
  children: null | HeaderChildren;
  goods: GoodsItem[];
  id: string;
  name: string;
  picture: string;
}

// 头部分类
export interface CategoryHeader {
  id: string;
  name: string;
  picture: string;
  children: HeaderChildren[];
  goods: GoodsItem[];
}

// 购物车项类型
export interface CartItem {
  id: string;
  attrsText: string;
  count: number;
  discount: null | number;
  isCollect: boolean;
  isEffective: boolean;
  name: string;
  nowOriginalPrice: string;
  nowPrice: string;
  picture: string;
  postFee: number;
  price: string;
  selected: boolean;
  skuId: string;
  specs: Specs[] | null | undefined;
  stock: number;
}

// Banner类型
export interface BannerItem {
  hrefUrl: string;
  id: string;
  imgUrl: string;
  type: string;
}

// 新鲜好物类型
export interface NewGoodsItem {
  desc: string;
  id: string;
  name: string;
  orderNum: number;
  picture: string;
  price: string;
}

// 人气推荐类型
export interface HotRecommendItem {
  alt: string;
  id: string;
  picture: string;
  title: string;
}

// 用户登录信息类型
export interface UserInfo {
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
//商品详情分类类型
export type DetailCategories = GoodsChildren[];

//商品详情特性
export interface DetailProperties {
  name: string;
  value: string;
}
//商品详情每日热度
export type GoodsHotDay = GoodsItem[];
//商品详情类型
export interface GoodsDetails {
  pictures: string[];
  properties: DetailProperties[];
}
//相似产品
export type SimilarProducts = GoodsItem[];
//skus->specs类型
export interface DetailSpecs {
  name: string;
  valueName: string;
}
//skus选型
export interface DetailSkus {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: DetailSpecs[];
}
//specs->value类型
export interface SpecsValue {
  desc?: string;
  disabled: boolean;
  name: string;
  picture: string;
}
//specs选型
export interface Specs {
  id: string;
  name: string;
  value: SpecsValue[];
}
//商品详情类型
export interface DetailGoods {
  brand: null | string;
  categories: DetailCategories[];
  collectCount: number;
  commentCount: number;
  desc: string;
  details: GoodsDetails;
  discount: number;
  evaluationInfo: null | string;
  hotByDay: GoodsHotDay[];
  id: string;
  inventory: number;
  isCollect: boolean;
  isPreSale: boolean;
  mainPictures: string[];
  mainVideos: string[];
  name: string;
  oldPrice: string;
  price: string;
  recommends: null | string;
  salesCount: number;
  similarProducts: SimilarProducts[];
  skus: DetailSkus[];
  specs: Specs[];
  spuCode: string;
  userAddresses: OrderAddress[];
  videoScale: null | string;
}

//订单地址类型
export interface OrderAddress {
  address: string;
  addressTags?: string;
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
//总价类型{
export interface OrderSummary {
  discountPrice: number;
  goodsCount: number;
  postFee: number;
  totalPayPrice: number;
  totalPrice: number;
}

//订单类型
export interface Order {
  goods: GoodsItem[];
  summary: OrderSummary;
  userAddresses: OrderAddress[];
}
