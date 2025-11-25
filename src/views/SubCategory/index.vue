<script setup>
import GoodsItem from "@/views/home/components/GoodsItem.vue";
import { useCategoryFilter } from "@/views/SubCategory/composables/useCategoryFilter";
import { useSubCategory } from "@/views/SubCategory/composables/useSubCategory";

const { categoryData } = useCategoryFilter();
const { goodsList, reqData, loading, finished } = useSubCategory();

const loadMore = () => {
  // 只有在非加载中且未结束时才增加页码
  if (!loading.value && !finished.value) {
    reqData.value.page++;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">
          {{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading || finished"
        :infinite-scroll-distance="30"
      >
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id"></GoodsItem>

        <!-- 加载提示 -->
        <div
          v-if="loading && goodsList.length > 0"
          style="width: 100%; text-align: center; padding: 20px"
        >
          加载中...
        </div>

        <!-- 没有更多数据提示 -->
        <div
          v-if="finished && goodsList.length > 0"
          style="width: 100%; text-align: center; padding: 20px"
        >
          没有更多数据了
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
