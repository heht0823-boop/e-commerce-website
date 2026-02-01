<script setup lang="ts">
import { getHotGoodsAPI } from "@/apis/detail";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import type { GoodsHotResponse } from "@/types/detail";
const props = defineProps({
  hotType: {
    type: Number,
    required: true,
  },
});

// 适配title 1-24小时热榜 2-周热榜
const TYPEMAP = {
  1: "24小时热榜",
  2: "周热榜",
} as const;

const title = computed(() => TYPEMAP[props["hotType"] as keyof typeof TYPEMAP]);

// 以24小时热榜获取数据渲染模版
// 1.封装接口
// 2.调用接口渲染模版
const hotList = ref<GoodsHotResponse>([]);

const getHotList = async () => {
  const route = useRoute();
  const res = await getHotGoodsAPI({
    id: route.params.id as string,
    type: props["hotType"] as number,
    limit: 3, // 默认值
  });
  hotList.value = res?.data?.result;
};

onMounted(() => {
  getHotList();
});
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
