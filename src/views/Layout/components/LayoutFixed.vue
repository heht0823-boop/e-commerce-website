<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { useCategoryStore } from "@/stores/categoryStore";
import { ref } from "vue";
const categoryStore = useCategoryStore();
const { y } = useScroll(window);
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <div class="sticky-content">
        <RouterLink class="logo" to="/" />

        <!-- 桌面端导航 -->
        <ul class="app-header-nav desktop-nav">
          <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
          </li>
        </ul>

        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <i class="iconfont icon-menu"></i>
        </div>
      </div>

      <!-- 移动端导航菜单 -->
      <div class="mobile-nav" :class="{ open: isMobileMenuOpen }">
        <ul>
          <li v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink :to="`/category/${item.id}`">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 50px; // 手机端默认高度
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transition: all 0.7s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    max-width: 100%;
    padding: 0 15px;
  }

  .sticky-content {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      width: 100px;
      height: 40px;
      background: url("@/assets/images/logo.png") no-repeat right 2px / contain;
    }

    .mobile-menu-toggle {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .mobile-nav {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 998;

    &.open {
      transform: translateX(0);
    }

    ul {
      padding: 10px 0;

      li {
        a {
          display: block;
          padding: 12px 20px;
          border-bottom: 1px solid #f5f5f5;
          font-size: 16px;

          &:hover,
          &.active {
            color: $xtxColor;
            background-color: #f5f5f5;
          }
        }
      }
    }
  }
}

// 手机端样式（＜768px）
@include mobile {
  .app-header-sticky {
    .app-header-nav.desktop-nav {
      display: none; // 隐藏 PC 端导航
    }

    .mobile-menu-toggle {
      display: flex; // 显示移动端菜单按钮
    }
  }
}

// PC 端样式（≥768px）
@include pc {
  .app-header-sticky {
    height: 80px; // PC 端高度

    .mobile-menu-toggle {
      display: none; // 隐藏移动端菜单按钮
    }

    .mobile-nav {
      display: none; // 隐藏移动端导航
    }

    .sticky-content {
      .logo {
        width: 200px;
        height: 80px;
      }

      .app-header-nav {
        display: flex;
        padding-left: 40px;
        flex: 1;

        li {
          margin-right: 40px;
          width: 38px;

          a {
            font-size: 14px;
            line-height: 32px;
            height: 32px;
            display: inline-block;

            &:hover {
              color: $xtxColor;
              border-bottom: 1px solid $xtxColor;
            }
          }

          .active {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
          }
        }
      }
    }
  }
}
</style>
