import type { Categories, CategoryChildGoods } from "@/types/category";
import type { OrderPreUserAddresses } from "@/types/checkout";
//获取商品详细信息/goods
// export interface GoodsParams {
//   id: string;
// }
//goods->categories
type GoodsCategories = Categories[];
// details->picture
type GoodsPictures = string[];
// details->properties
export interface GoodsProperties {
  name: string;
  value: string;
}
// goods->details
export interface GoodsDetails {
  pictures: GoodsPictures;
  properties: GoodsProperties[];
}
// goods->hotByDay
type GoodsHotByDay = CategoryChildGoods[];
// goods->similarProducts
type GoodsSimilarProducts = CategoryChildGoods[];
// skus->specs
export interface GoodsSkusSpecs {
  name: string;
  valueName: string;
}
// goods->skus（修正：补充price字段，保持与后端一致）
export interface GoodsSkus {
  id: string;
  inventory: number;
  oldPrice: string;
  picture: string;
  skuCode: string;
  specs: GoodsSkusSpecs[];
  price: string; // 补充：后端返回的sku价格字段
}
// specs->values（修正：disable 改为 disabled，与后端/业务代码统一）
export interface GoodsSpecsValues {
  desc: string;
  disabled: boolean; // 修正：单数->复数，匹配后端返回和业务代码
  name: string;
  picture: string;
}
// goods->specs
export interface GoodsSpecs {
  id: string;
  name: string;
  values: GoodsSpecsValues[];
}
// goods->userAddresses
type GoodsUserAddresses = OrderPreUserAddresses[];

// 核心接口 GoodsResponse 修正（重点修正skus、specs为数组，匹配后端所有字段）
export interface GoodsResponse {
  brand: {
    // 修正：从 string | null 改为复杂对象，匹配后端返回
    id: string;
    name: string;
    nameEn: string;
    logo: string;
    picture: string;
    type: string | null;
    desc: string | null;
    place: string | null;
  } | null;
  categories: GoodsCategories;
  collectCount: number;
  commentCount: number;
  desc: string;
  details: GoodsDetails;
  discount: number;
  evaluationInfo: any | null; // 修正：更贴合后端返回的 null 类型
  hotByDay: GoodsHotByDay;
  id: string;
  inventory: number;
  isCollect: boolean;
  isPreSale: boolean;
  mainPictures: string[];
  mainVideos: any[]; // 修正：后端返回空数组，定义为 any[] 更稳妥
  name: string;
  oldPrice: string;
  price: string;
  recommends: any | null; // 修正：更贴合后端返回的 null 类型
  salesCount: number; // 修正：字段名 saleCount -> salesCount，匹配后端返回
  similarProducts: GoodsSimilarProducts;
  skus: GoodsSkus[]; // 修正：单个对象 -> 数组，匹配后端返回
  specs: GoodsSpecs[]; // 修正：单个对象 -> 数组，匹配后端返回
  spuCode: string;
  userAddresses: GoodsUserAddresses;
  videoScale: number | null; // 修正：string | null -> number | null，匹配后端返回的 1
}
//获取热榜商品/goods/hot
export interface GoodsHotParams {
  id: string;
  limit: number;
  type: number;
}
export type GoodsHotResponse = CategoryChildGoods[];
