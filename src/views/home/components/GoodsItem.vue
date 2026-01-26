<script setup lang="ts">
import type { CategoryChildGoods } from "@/types/category";
defineProps<{
  goods: CategoryChildGoods;
}>();
</script>

<template>
  <RouterLink to="/" class="goods-item">
    <img v-img-lazy="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.goods-item {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%; // 填满容器高度

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  p {
    padding-top: 8px;
    margin: 0;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
  }

  .desc {
    color: #999;
    font-size: 12px;
    height: auto;
    line-height: 1.4;
  }

  .price {
    color: $priceColor;
    font-size: 16px;
    font-weight: bold;
  }
}

// 移除固定宽度，让Grid控制布局
// @include pc {
//   .goods-item {
//     width: 220px; // 删除此行
//     ...
//   }
// }
</style>
