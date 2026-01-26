<!-- src/views/home/index.vue -->
<script setup lang="ts">
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeNew from "./components/HomeNew.vue";
import HomeHot from "./components/HomeHot.vue";
import HomeProduct from "./components/HomeProduct.vue";
</script>

<template>
  <div class="home-page">
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  min-height: calc(100vh - 200px);

  .container {
    padding: 10px;

    @include pc {
      display: flex;
      gap: 10px;
    }
  }
}

.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;

  @include pc {
    max-width: 1170px;
  }
}
</style>
