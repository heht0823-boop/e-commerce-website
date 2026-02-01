<!-- 修复后的 Home.vue -->
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeNew from "./components/HomeNew.vue";
const HomeHot = defineAsyncComponent(() => import("./components/HomeHot.vue"));
const HomeProduct = defineAsyncComponent(() => import("./components/HomeProduct.vue"));
</script>

<template>
  <div class="home-page">
    <!-- PC端：侧边栏+轮播图横向排列 -->
    <div class="container home-container">
      <div class="home-content">
        <HomeCategory class="home-sidebar" />
        <HomeBanner class="home-main" />
      </div>
    </div>

    <!-- 其他内容区域 -->
    <HomeNew />
    <HomeHot />
    <HomeProduct />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  min-height: calc(100vh - 200px);

  .home-container {
    padding: 0;
    margin: 20px auto;
    max-width: 1200px;

    .home-content {
      display: flex;
      width: 100%;
      min-height: 400px; // 确保最小高度

      .home-sidebar {
        flex-shrink: 0; // 防止侧边栏被压缩
      }

      .home-main {
        flex: 1; // 轮播图占据剩余空间
        min-width: 0; // 防止flex item溢出
      }
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .home-page {
    .home-container {
      margin: 10px auto;

      .home-content {
        display: block; // 移动端改为纵向排列

        .home-sidebar {
          display: none; // 隐藏侧边栏
        }

        .home-main {
          width: 100%;
        }
      }
    }
  }
}
</style>
