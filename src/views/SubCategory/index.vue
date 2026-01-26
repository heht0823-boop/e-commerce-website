<script setup lang="ts">
import GoodsItem from "@/views/home/components/GoodsItem.vue";
import { useCategoryFilter } from "@/views/SubCategory/composables/useCategoryFilter";
import { useSubCategory } from "@/views/SubCategory/composables/useSubCategory";
import { ref, nextTick } from "vue";
import type { ComponentPublicInstance } from "vue";

const { categoryData, loading: categoryLoading } = useCategoryFilter();
const {
  goodsList,
  reqData,
  loading,
  finished,
  error: subCategoryError,
  getGoodsList,
} = useSubCategory();

const loadMore = () => {
  if (!loading.value && !finished.value) {
    reqData.value.page++;
  }
};

interface ScrollbarComponent extends ComponentPublicInstance {
  $refs: {
    wrapRef: HTMLElement;
  };
}

const scrollbarRef = ref<ScrollbarComponent | null>(null);

const handleScroll = async () => {
  if (loading.value || finished.value) return; // 提前返回避免不必要的计算

  await nextTick();
  // 获取滚动容器元素并明确类型
  const scrollbarWrap = scrollbarRef.value?.$refs?.wrapRef as HTMLElement | undefined;

  if (scrollbarWrap) {
    const { scrollTop, scrollHeight, clientHeight } = scrollbarWrap;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
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
        <el-breadcrumb-item
          v-if="categoryData && categoryData.parentName"
          :to="{ path: `/category/${categoryData.parentId}` }"
        >
          {{ categoryData?.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="categoryData">{{ categoryData?.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="sub-container">
      <el-tabs v-model="reqData.sortField">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>

      <!-- 错误显示 -->
      <div v-if="subCategoryError" class="error-container">
        <p>加载失败: {{ subCategoryError }}</p>
        <el-button @click="getGoodsList">重新加载</el-button>
      </div>

      <!-- 使用 el-scrollbar 实现无限滚动 -->
      <el-scrollbar
        v-else
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
            <div
              v-if="categoryLoading && goodsList && goodsList.length > 0"
              class="loading-wrapper"
            >
              加载中...
            </div>

            <!-- 没有更多数据提示 -->
            <div v-if="finished && goodsList && goodsList.length > 0" class="no-more-wrapper">
              没有更多数据了
            </div>

            <!-- 空状态 -->
            <div v-if="!loading && (!goodsList || goodsList.length === 0)" class="empty-wrapper">
              暂无商品数据
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
    gap: 20px;

    .goods-item {
      flex: 0 0 calc((100% - 40px) / 4);
      display: block;
      margin: 0;
      padding: 20px 30px;
      text-align: center;
      box-sizing: border-box;

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
  .no-more-wrapper,
  .empty-wrapper {
    flex: 0 0 100%;
    text-align: center;
    padding: 20px;
  }

  .error-container {
    text-align: center;
    padding: 40px;
    color: #f56c6c;
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
