<script setup>
import GoodsItem from "@/views/home/components/GoodsItem.vue";
import { useCategoryFilter } from "@/views/SubCategory/composables/useCategoryFilter";
import { useSubCategory } from "@/views/SubCategory/composables/useSubCategory";
import { ref, nextTick } from "vue";

const { categoryData } = useCategoryFilter();
const { goodsList, reqData, loading, finished } = useSubCategory();

const loadMore = () => {
  if (!loading.value && !finished.value) {
    reqData.value.page++;
  }
};

// 使用 ref 引用滚动容器
const scrollbarRef = ref();

const handleScroll = async () => {
  // 等待 DOM 更新
  await nextTick();

  // 获取滚动容器元素
  const scrollbarWrap = scrollbarRef.value?.$refs?.wrapRef;
  if (scrollbarWrap) {
    const { scrollTop, scrollHeight, clientHeight } = scrollbarWrap;

    // 当滚动到底部附近时触发加载
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading.value && !finished.value) {
      loadMore();
    }
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
      <!-- 使用 el-scrollbar 实现无限滚动 -->
      <el-scrollbar
        ref="scrollbarRef"
        height="600px"
        @scroll="handleScroll"
        class="scroll-container"
      >
        <div class="scroll-content">
          <div class="body">
            <!-- 商品列表 -->
            <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id"></GoodsItem>

            <!-- 加载提示 -->
            <div v-if="loading && goodsList.length > 0" class="loading-wrapper">加载中...</div>

            <!-- 没有更多数据提示 -->
            <div v-if="finished && goodsList.length > 0" class="no-more-wrapper">
              没有更多数据了
            </div>
          </div>
        </div>
      </el-scrollbar>
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
    gap: 20px; // 商品之间的间距

    // 确保商品项宽度正确
    .goods-item {
      flex: 0 0 calc((100% - 40px) / 4); // 每行4个商品，考虑gap的总宽度
      display: block;
      margin: 0; // 移除外边距
      padding: 20px 30px;
      text-align: center;
      box-sizing: border-box; // 确保padding不增加元素宽度

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
        margin: 0;
      }

      .name {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .desc {
        color: #999;
        height: 29px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }

  .loading-wrapper,
  .no-more-wrapper {
    flex: 0 0 100%; // 占满整行
    text-align: center;
    padding: 20px;
    grid-column: 1 / -1; // 如果使用grid布局
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.scroll-container {
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}

.scroll-content {
  height: 100%;
}
</style>
