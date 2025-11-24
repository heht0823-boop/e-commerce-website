import { ref, onMounted, watch } from "vue";
import { getSubCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";

export function useSubCategory() {
  const route = useRoute();
  //获取基础列表数据渲染
  const goodsList = ref([]);
  const reqData = ref({
    page: 1,
    pageSize: 20,
    sortField: "publishTime",
  });

  const getGoodsList = async () => {
    const requestData = {
      ...reqData.value,
      categoryId: route.params.id, // 动态获取当前分类ID
    };
    const res = await getSubCategoryAPI(requestData);
    goodsList.value = res.result.items;
  };
  watch(
    () => route.params.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        getGoodsList();
      }
    }
  );
  onMounted(() => {
    getGoodsList();
  });
  return {
    goodsList,
  };
}
