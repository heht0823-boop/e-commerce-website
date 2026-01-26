<!-- src/views/home/components/HomeProduct.vue -->
<script setup lang="ts">
import HomePanel from "./HomePanel.vue";
import { ref } from "vue";
import { getGoodsAPI } from "@/apis/home";
import GoodsItem from "@/views/home/components/GoodsItem.vue";
import type { HomeGoodsResponse } from "@/types/home";
import { useBreakpoint } from "@/composables/useBreakpoint";

const goodsProduct = ref<HomeGoodsResponse>();
const { isMobile, isPc } = useBreakpoint();

const getGoodsProduct = async () => {
  const res = await getGoodsAPI();
  goodsProduct.value = res?.data?.result;
};
getGoodsProduct();
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 使用响应式布局 -->
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;

  .box {
    display: flex;
    flex-direction: column;

    @include pc {
      flex-direction: row;
    }

    .cover {
      width: 100%;
      height: 200px;
      margin-bottom: 10px;
      position: relative;

      @include pc {
        width: 240px;
        height: 610px;
        margin-right: 10px;
        margin-bottom: 0;
      }

      @include desktop {
        width: 300px;
        height: 700px;
      }

      @include large-screen {
        width: 350px;
        height: 800px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 100%;
        height: 40px;
        display: flex;
        font-size: 14px;
        color: #fff;
        line-height: 40px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        @include pc {
          width: 188px;
          height: 66px;
          font-size: 18px;
          line-height: 66px;
        }

        @include desktop {
          width: 220px;
          font-size: 20px;
        }

        @include large-screen {
          width: 260px;
          font-size: 22px;
        }

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
        }
      }
    }

    .goods-list {
      flex: 1;
      padding: 10px 0;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); // 自适应列宽
      gap: 10px;

      @include pc {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); // PC端最小220px
        padding: 20px 0;
      }

      @include desktop {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); // 中屏最小260px
        padding: 30px 0;
      }

      @include large-screen {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // 大屏最小300px
        padding: 40px 0;
      }

      li {
        margin-bottom: 10px;
        width: 100%; // 让商品填满网格项
      }
    }
  }
}
</style>
