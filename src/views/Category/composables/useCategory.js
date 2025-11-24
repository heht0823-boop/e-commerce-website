import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getTopCategoryAPI } from "@/apis/category";
//封装分类相关的函数
export function useCategory() {
  //获取数据
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async () => {
    const res = await getTopCategoryAPI(route.params.id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory());

  // 监听路由变化
  watch(
    () => route.params.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        getCategory();
      }
    }
  );
  return { categoryData };
}
