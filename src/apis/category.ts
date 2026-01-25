import httpInstance from "@/utils/http";
import type { ApiResponse } from "@/types/index";
import type {
  CategoryResponse,
  SubCategoryResponse,
  TemporaryData,
  TemporaryResponse,
} from "@/types/category";

/**
 * @description: 获取分类数据
 * @param {*} id 分类id
 * @return {*}
 */
export const getTopCategoryAPI = async (id: string): Promise<ApiResponse<CategoryResponse>> => {
  return httpInstance({
    url: "/category",
    method: "GET",
    params: {
      id,
    },
  });
};
/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = async (
  id: string,
): Promise<ApiResponse<SubCategoryResponse>> => {
  return httpInstance({
    url: "/category/sub/filter",
    method: "GET",
    params: {
      id,
    },
  });
};

/**
 * @description: 获取导航数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */

export const getSubCategoryAPI = async (
  data: TemporaryData,
): Promise<ApiResponse<TemporaryResponse>> => {
  return httpInstance({
    url: "/category/goods/temporary",
    method: "POST",
    data,
  });
};
