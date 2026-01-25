import type { CategoryChildGoods } from "@/types/category";
//首页导航分类/home/category/head
export interface HomeCategoryHead {
  children: HomeCategoryHead[];
  goods: CategoryChildGoods[];
  id: string;
  name: string;
  picture: string;
}
export type HomeCategoryHeadResponse = HomeCategoryHead[];
