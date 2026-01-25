<script setup lang="ts">
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
//props适配图片列表
const props = withDefaults(
  defineProps<{
    imageList: string[];
  }>(),
  {
    imageList: () => [],
  },
);

//1.小图切换大图显示
const activeIndex = ref<number>(0);

const enterhandler = (i: number) => {
  activeIndex.value = i;
};
//2.获取鼠标相对位置
const target = ref<HTMLElement | null>(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);
//3.控制滑块跟随鼠标移动,(监听elementX/Y变化,一旦变化,重新设置left和top)
const left = ref<number>(0);
const top = ref<number>(0);
const positionX = ref<number>(0);
const positionY = ref<number>(0);
watch([elementX, elementY], () => {
  // 如果鼠标没有进入盒子里面,直接不执行后面的逻辑
  if (isOutside.value) return;

  // 获取容器尺寸和滑块尺寸
  const containerWidth = 400;
  const containerHeight = 400;
  const layerWidth = 200;
  const layerHeight = 200;

  // 计算滑块的边界范围
  const maxX = containerWidth - layerWidth; // 200
  const maxY = containerHeight - layerHeight; // 200

  // 计算滑块位置（居中于鼠标位置）
  left.value = elementX.value - layerWidth / 2;
  top.value = elementY.value - layerHeight / 2;

  // 边界处理
  left.value = Math.max(0, Math.min(left.value, maxX));
  top.value = Math.max(0, Math.min(top.value, maxY));

  // 控制大图的显示（注意负号，因为backgroundPosition是相反方向）
  positionX.value = -left.value * 2;
  positionY.value = -top.value * 2;
});
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="i"
        @mouseenter="enterhandler(i)"
        :class="{ active: i === activeIndex }"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
