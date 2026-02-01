<!-- 修复后的 HomeCategory.vue -->
<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";
import { ref } from "vue";

const categoryStore = useCategoryStore();
const hoveredIndex = ref<number | null>(null);
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li
        v-for="(item, index) in categoryStore.categoryList"
        :key="item.id"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
        :class="{ active: hoveredIndex === index }"
      >
        <!-- 主分类 -->
        <RouterLink to="/" class="main-link">{{ item.name }}</RouterLink>

        <!-- 子分类 -->
        <span class="sub-links">
          <RouterLink
            v-for="child in item.children.slice(0, 2)"
            :key="child.id"
            to="/"
            class="sub-link"
          >
            {{ child.name }}
          </RouterLink>
        </span>

        <!-- 弹层 -->
        <div class="layer" v-show="hoveredIndex === index">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="good in item.goods" :key="good.id">
              <RouterLink to="/">
                <img :src="good.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ good.name }}</p>
                  <p class="desc ellipsis">{{ good.desc }}</p>
                  <p class="price"><i>¥</i>{{ good.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  @media (max-width: 768px) {
    display: none;
  }

  .menu {
    li {
      position: relative;
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      cursor: pointer;

      &:hover,
      &.active {
        background: $xtxColor;
      }

      .main-link {
        margin-right: 4px;
        color: #fff;
        font-size: 16px;
        display: inline-block;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sub-links {
        display: inline-block;
        color: #ccc;
        font-size: 12px;

        .sub-link {
          margin-right: 8px;
          color: #ccc;
          text-decoration: none;

          &:hover {
            color: #fff;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .layer {
        position: absolute;
        left: 250px;
        top: 0;
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 100;
        overflow-y: auto;

        h4 {
          font-size: 20px;
          font-weight: normal;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;

          small {
            font-size: 14px;
            color: #999;
            margin-left: 10px;
          }
        }

        ul {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;

          li {
            width: 300px;
            height: 120px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            transition:
              transform 0.2s,
              box-shadow 0.2s;

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              text-decoration: none;
              color: #333;

              img {
                width: 95px;
                height: 95px;
                object-fit: cover;
                margin-right: 10px;
              }

              .info {
                flex: 1;
                padding-left: 10px;
                overflow: hidden;

                .name {
                  font-size: 14px;
                  color: #666;
                  margin-bottom: 5px;
                  display: -webkit-box;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }

                .desc {
                  color: #999;
                  font-size: 12px;
                  margin-bottom: 5px;
                }

                .price {
                  font-size: 16px;
                  color: $priceColor;
                  font-weight: bold;

                  i {
                    font-size: 12px;
                    font-style: normal;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
