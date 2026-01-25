//加入购物车post,/member/cart
export interface AddCartData {
  count: number;
  skuId: string;
}
export interface CartItem {
  attrsText: string;
  count: number;
  discount: number | null;
  id: string;
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
  //暂时占位
  specs: unknown[];
  stock: number;
}
//删除购物车delete,/member/cart
// export interface DeleteCartData {
//   ids: string[];
// }
export interface DeleteCartResponse {
  code: string;
  msg: string;
  result: boolean;
}
//获取最新的购物车列表get,/member/cart,不携带参数且返回数据结构和加入购物车一样

//合并购物车post,/member/cart/merge
export interface MergeCartData {
  count: number;
  selected: boolean;
  skuId: string;
}
export interface MergeCartResponse {
  code: string;
  msg: string;
  result: boolean | null;
}
