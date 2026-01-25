import type { Categories, CategoryChildGoods } from "@/types/category";
import type { OrderPreUserAddresses } from "@/types/checkout";
//获取商品详细信息/goods
// export interface GoodsParams {
//   id: string;
// }
//goods->categories
type GoodsCategories = Categories[];
//details->picture
type GoodsPictures = string[];
//details->properties
export interface GoodsProperties {
  name: string;
  value: string;
}
//goods->details
export interface GoodsDetails {
  pictures: GoodsPictures;
  properties: GoodsProperties[];
}
//goods->hotByDay
type GoodsHotByDay = CategoryChildGoods[];
//goods->similarProducts
type GoodsSimilarProducts = CategoryChildGoods[];
//skus->specs
export interface GoodsSkusSpecs {
  name: string;
  valueName: string;
}
//goods->skus
export interface GoodsSkus {
  id: string;
  inventory: number;
  oldPrice: string;
  picture: string;
  skuCode: string;
  specs: GoodsSkusSpecs[];
}
//specs->values
export interface GoodsSpecsValues {
  desc: string;
  disable: boolean;
  name: string;
  picture: string;
}
//goods->specs
export interface GoodsSpecs {
  id: string;
  name: string;
  values: GoodsSpecsValues[];
}
//goods->userAddresses
type GoodsUserAddresses = OrderPreUserAddresses[];
export interface GoodsResponse {
  brand: string | null;
  categories: GoodsCategories;
  collectCount: number;
  commentCount: number;
  desc: string;
  details: GoodsDetails;
  discount: number;
  evaluationInfo: string | null;
  hotByDay: GoodsHotByDay;
  id: string;
  inventory: number;
  isCollect: boolean;
  isPreSale: boolean;
  mainPictures: string[];
  mainVideos: string[];
  name: string;
  oldPrice: string;
  price: string;
  recommends: string | null;
  saleCount: number;
  similarProducts: GoodsSimilarProducts;
  skus: GoodsSkus;
  specs: GoodsSpecs;
  spuCode: string;
  userAddresses: GoodsUserAddresses;
  videoScale: string | null;
}
//获取热榜商品/goods/hot
export interface GoodsHotParams {
  id: string;
  limit: number;
  type: number;
}
export type GoodsHotResponse = CategoryChildGoods[];
