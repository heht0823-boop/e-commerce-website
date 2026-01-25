import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getTopCategoryAPI } from "@/apis/category";
import type { CategoryResponse } from "@/types/category";
//封装分类相关的函数
export function useCategory() {
  //获取数据
  const categoryData = ref<CategoryResponse>();
  const route = useRoute();
  const getCategory = async () => {
    const res = await getTopCategoryAPI(route.params.id?.toString() ?? "");
    categoryData.value = res?.data?.result;
  };
  onMounted(() => getCategory());

  // 监听路由变化
  watch(
    () => route.params.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        getCategory();
      }
    },
  );
  return { categoryData };
}
