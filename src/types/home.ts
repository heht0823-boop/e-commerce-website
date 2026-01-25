import type { CategoryChildGoods, Categories } from "@/types/category";
//获取banner数据/home/banner
// export interface BannerParams {
//   distrbutionSite: string;
// }
export interface Banner {
  hrefUrl: string;
  id: string;
  imgUrl: string;
  type: string;
}
export type BannerResponse = Banner[];
//获取新鲜好物/home/new
export type NewResponse = CategoryChildGoods[];
//获取人气推荐/home/hot
export interface Hot {
  alt: string;
  id: string;
  picture: string;
  title: string;
}
export type HotResponse = Hot[];
//获取所有商品数据/home/goods
export interface HomeGoods {
  children: Categories[];
  goods: CategoryChildGoods[];
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
}
export type HomeGoodsResponse = HomeGoods[];
