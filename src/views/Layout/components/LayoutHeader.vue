<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";
import HeaderCart from "./HeaderCart.vue";
import { ref } from "vue";
const categoryStore = useCategoryStore();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>

        <!-- 桌面端导航 -->
        <ul class="app-header-nav desktop-nav">
          <li v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink active-class="active" :to="`/category/${item.id}`">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>

        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <i class="iconfont icon-menu"></i>
        </div>

        <!-- 购物车 -->
        <HeaderCart class="header-cart" />
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
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;
  position: relative;
  z-index: 1000;

  .container {
    max-width: 100%;
    padding: 0 15px;
  }

  .header-content {
    display: flex;
    align-items: center;
    height: 60px; // 手机端默认高度

    .logo {
      flex: 0 0 auto;
      width: 100px; // 手机端 logo 尺寸

      a {
        display: block;
        height: 35px;
        width: 100%;
        text-indent: -9999px;
        background: url("@/assets/images/logo.png") no-repeat center / contain;
      }
    }

    .app-header-nav {
      display: flex;
      flex: 1;
      padding-left: 20px;
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

    .header-cart {
      margin-left: auto;
      width: 40px; // 手机端购物车尺寸
    }
  }

  .mobile-nav {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;

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
  .app-header {
    .desktop-nav {
      display: none; // 隐藏 PC 端导航
    }

    .mobile-menu-toggle {
      display: flex; // 显示移动端菜单按钮
    }
  }
}

// PC 端样式（≥768px）
@include pc {
  .app-header {
    .mobile-menu-toggle {
      display: none; // 隐藏移动端菜单按钮
    }

    .mobile-nav {
      display: none; // 隐藏移动端导航
    }

    .header-content {
      height: 132px; // PC 端头部高度

      .logo {
        width: 200px; // PC 端 logo 尺寸

        a {
          height: 132px;
        }
      }

      .app-header-nav {
        li {
          margin-right: 20px;

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

      .header-cart {
        width: auto; // PC 端购物车恢复默认尺寸
      }
    }
  }
}
// 在导航栏中加入响应式菜单隐藏逻辑
.nav-menu {
  display: none;

  @include pc {
    display: flex;
    gap: 20px;
  }

  @include desktop {
    gap: 30px;
  }

  @include large-screen {
    gap: 40px;
  }
}
</style>
