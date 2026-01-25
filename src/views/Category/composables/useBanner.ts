//封装Banner相关的函数
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";
import type { BannerResponse } from "@/types/home";
export const useBanner = () => {
  //获取banner
  const bannerList = ref<BannerResponse>([]);
  const getBanner = async () => {
    const params = {
      distributionSite: "2",
    };
    const res = await getBannerAPI();
    bannerList.value = res?.data?.result;
  };

  onMounted(() => getBanner());
  return { bannerList };
};
