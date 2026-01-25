import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";

export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref([]);
  const getCategory = async () => {
    try {
      const res = await getCategoryAPI();
      categoryList.value = res.data.result;
    } catch (err) {
      console.error("获取分类列表失败", err);
    }
  };
  return { categoryList, getCategory };
});
