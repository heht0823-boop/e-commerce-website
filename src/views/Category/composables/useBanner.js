//封装Banner相关的函数
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";
export function useBanner() {
  //获取banner
  const bannerList = ref([]);
  const getBanner = async () => {
    const params = {
      distributionSite: "2",
    };
    const res = await getBannerAPI(params);
    bannerList.value = res.result;
  };

  onMounted(() => getBanner());
  return { bannerList };
}
