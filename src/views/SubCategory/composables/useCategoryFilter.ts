import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getCategoryFilterAPI } from "@/apis/category";
import type { SubCategoryResponse } from "@/types/category";

export function useCategoryFilter() {
  //获取面包屑导航数据
  const categoryData = ref<SubCategoryResponse>();
  const route = useRoute();
  const loading = ref<boolean>(false);

  const getCategoryData = async () => {
    if (loading.value) return;

    loading.value = true;
    try {
      const res = await getCategoryFilterAPI(route.params.id as string);
      categoryData.value = res?.data?.result;
    } catch (error) {
      console.error("获取分类数据失败:", error);
      categoryData.value = undefined; // 确保设置为undefined
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => route.params.id,
    (newId, oldId) => {
      if (newId && newId !== oldId) {
        getCategoryData();
      }
    },
  );

  onMounted(() => {
    if (route.params.id) {
      getCategoryData();
    }
  });

  return {
    categoryData,
    loading,
  };
}
