import { st } from "vue-router/dist/router-CWoNjPRp.mjs";

//get,获取分类数据/category(居家,美食,服饰,母婴,个护...)
// export interface GetCategoryParams {
//   id: string;
// }
//Children->goods
export interface CategoryChildGoods {
  desc: string;
  id: string;
  name: string;
  orderNum: number;
  picture: string;
  price: string;
}
//CategoryResponse->Children
export interface CategoryChildren {
  brands: string | null;
  categories: Categories[] | null;
  goods: CategoryChildGoods;
  id: string;
  name: string;
  parentId: string | null;
  parentName: string | null;
  picture: string;
  saleProperties: string | null;
}
export interface CategoryResponse {
  children: CategoryChildren[];
  id: string;
  name: string;
  picture: string | null;
}
//获取二级分类列表/category/sub/filter(居家->居家生活用品,收纳,宠物食品...)
// export interface SubCategoryParams {
//   id: string;
// }
//二级分类数据
export interface Categories {
  id: string;
  layer: number;
  name: string;
  parent: Categories | null;
}
export interface SubCategoryResponse {
  brands: unknown[];
  categories: Categories[];
  goods: CategoryChildGoods[];
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  picture: string | null;
  saleProperties: unknown[];
}
//获取对应二级分类下的商品数据(居家生活用品->?(数据))/category/goods/temporary
export interface TemporaryData {
  categoryId: string;
  page: number;
  pageSize: number;
  sortField: string;
}
type TemporaryItems = CategoryChildGoods[];
export interface TemporaryResponse {
  counts: number;
  items: TemporaryItems;
  page: number;
  pageSize: number;
  pages: number;
}
