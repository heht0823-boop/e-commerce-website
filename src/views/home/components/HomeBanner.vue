<script setup lang="ts">
import { getBannerAPI } from "@/apis/home";
import { ref } from "vue";
import type { BannerResponse } from "@/types/home";
const bannerList = ref<BannerResponse>();
const getBanner = async () => {
  const res = await getBannerAPI();
  bannerList.value = res?.data?.result;
};
getBanner();
</script>

<template>
  <div class="home-banner">
    <el-carousel height="100%" :autoplay="true" :interval="3000">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  margin-top: 80px;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 300px;
    margin-top: 60px;
  }

  .el-carousel {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
