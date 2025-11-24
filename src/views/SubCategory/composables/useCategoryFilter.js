import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getCategoryFilterAPI } from "@/apis/category";
export function useCategoryFilter() {
  //获取面包屑导航数据
  const categoryData = ref({});
  const route = useRoute();
  const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id);
    categoryData.value = res.result;
  };
  watch(
    () => route.params.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        getCategoryData();
      }
    }
  );
  onMounted(() => {
    getCategoryData();
  });
  return {
    categoryData,
  };
}
