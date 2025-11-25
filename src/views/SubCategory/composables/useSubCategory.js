import { ref, onMounted, watch } from "vue";
import { getSubCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";

export function useSubCategory() {
  const route = useRoute();
  // 获取基础列表数据渲染
  const goodsList = ref([]);
  const reqData = ref({
    page: 1,
    pageSize: 20,
    sortField: "publishTime",
  });
  const loading = ref(false); // 添加加载状态
  const finished = ref(false); // 添加结束状态

  const getGoodsList = async () => {
    if (loading.value) return; // 防止重复请求

    loading.value = true;
    try {
      const requestData = {
        ...reqData.value,
        categoryId: route.params.id, // 动态获取当前分类ID
      };
      const res = await getSubCategoryAPI(requestData);

      // 根据页码判断是刷新还是加载更多
      if (reqData.value.page === 1) {
        goodsList.value = res.result.items; // 刷新数据
      } else {
        goodsList.value = [...goodsList.value, ...res.result.items]; // 加载更多
      }

      // 判断是否还有更多数据
      if (res.result.items.length < reqData.value.pageSize) {
        finished.value = true;
      } else {
        finished.value = false;
      }
    } catch (error) {
      console.error("获取商品列表失败:", error);
    } finally {
      loading.value = false;
    }
  };

  // 监听多个参数变化
  watch(
    () => [reqData.value.sortField, reqData.value.page],
    (newVal, oldVal) => {
      // 只有当sortField变化时才重置finished状态
      if (newVal[0] !== oldVal[0]) {
        finished.value = false;
      }
      getGoodsList();
    }
  );

  onMounted(() => {
    getGoodsList();
  });

  return {
    goodsList,
    reqData,
    loading,
    finished,
    getGoodsList,
  };
}
