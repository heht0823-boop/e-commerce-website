<!-- 修复后的 HomeBanner.vue -->
<script setup lang="ts">
import { getBannerAPI } from "@/apis/home";
import { ref, onMounted } from "vue";
import type { BannerResponse } from "@/types/home";

const bannerList = ref<BannerResponse>([]);
const loading = ref(true);

const getBanner = async () => {
  try {
    const res = await getBannerAPI();
    bannerList.value = res?.data?.result || [];

    // 预加载第一张图片
    if (bannerList.value && bannerList.value.length > 0) {
      const firstBanner = bannerList.value[0];
      if (firstBanner?.imgUrl) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = firstBanner.imgUrl;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        link.onload = () => {
          document.head.removeChild(link);
        };
      }
    }
  } catch (error) {
    console.error("获取轮播图失败:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getBanner();
});
</script>

<template>
  <div class="home-banner">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-placeholder">
      <div class="spinner"></div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!bannerList || bannerList.length === 0" class="empty-placeholder">
      <p>暂无轮播图数据</p>
    </div>

    <!-- 轮播图内容 -->
    <div v-else class="carousel-container">
      <el-carousel height="400px" :autoplay="true" :interval="3000" indicator-position="outside">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imgUrl" :alt="'轮播图'" @load="() => {}" @error="() => {}" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 100%;
  position: relative;
  overflow: hidden;

  .loading-placeholder {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid $xtxColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .empty-placeholder {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    color: #999;
  }

  .carousel-container {
    width: 100%;

    :deep(.el-carousel) {
      width: 100%;

      .el-carousel__container {
        width: 100%;
      }
    }

    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      display: block;
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .home-banner {
    .loading-placeholder,
    .empty-placeholder,
    .carousel-container {
      height: 250px;

      img {
        height: 250px;
      }
    }
  }
}
</style>
