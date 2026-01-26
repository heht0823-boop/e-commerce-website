import { ref, onMounted, watch } from "vue";
import { getSubCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import type { TemporaryItems, TemporaryData } from "@/types/category";

export function useSubCategory() {
  const route = useRoute();
  // 获取基础列表数据渲染
  const goodsList = ref<TemporaryItems>([]);
  interface RequestData {
    page: number;
    pageSize: number;
    sortField: string;
  }
  const reqData = ref<RequestData>({
    page: 1,
    pageSize: 20,
    sortField: "publishTime",
  });
  const loading = ref<boolean>(false);
  const finished = ref<boolean>(false);
  const error = ref<string | null>(null); // 添加错误状态

  const getGoodsList = async () => {
    if (loading.value) return;

    loading.value = true;
    error.value = null; // 重置错误状态

    try {
      const requestData = {
        ...reqData.value,
        categoryId: route.params.id, // 动态获取当前分类ID
      } as TemporaryData;

      const res = await getSubCategoryAPI(requestData);

      // 检查响应结构是否有效
      if (!res?.data?.result) {
        throw new Error("API 响应格式错误");
      }

      // 根据页码判断是刷新还是加载更多
      if (reqData.value.page === 1) {
        goodsList.value = res.data.result.items || []; // 刷新数据
      } else {
        goodsList.value = [...goodsList.value, ...(res.data.result.items || [])];
      }

      // 判断是否还有更多数据
      if ((res.data.result.items || []).length < reqData.value.pageSize) {
        finished.value = true;
      } else {
        finished.value = false;
      }
    } catch (error: any) {
      console.error("获取商品列表失败:", error);
      error.value = error.message || "获取商品列表失败";
    } finally {
      loading.value = false;
    }
  };

  // 监听路由参数变化重新加载数据
  watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        reqData.value.page = 1; // 重置页码
        finished.value = false; // 重置完成状态
        getGoodsList();
      }
    },
  );

  // 监听排序字段变化
  watch(
    () => reqData.value.sortField,
    (newSortField, oldSortField) => {
      if (newSortField !== oldSortField) {
        reqData.value.page = 1; // 排序时重置页码
        finished.value = false; // 重置完成状态
        getGoodsList();
      }
    },
  );

  onMounted(() => {
    if (route.params.id) {
      getGoodsList();
    }
  });

  return {
    goodsList,
    reqData,
    loading,
    finished,
    error,
    getGoodsList,
  };
}
