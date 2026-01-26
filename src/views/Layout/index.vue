<script setup lang="ts">
import { onMounted, defineAsyncComponent } from "vue";
const LayoutNav = defineAsyncComponent(() => import("@/views/Layout/components/LayoutNav.vue"));
const LayoutHeader = defineAsyncComponent(
  () => import("@/views/Layout/components/LayoutHeader.vue"),
);
const LayoutFooter = defineAsyncComponent(
  () => import("@/views/Layout/components/LayoutFooter.vue"),
);
const LayoutFixed = defineAsyncComponent(() => import("@/views/Layout/components/LayoutFixed.vue"));
import { useCategoryStore } from "@/stores/categoryStore";
const categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getCategory();
});
</script>
<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <RouterView />
  <LayoutFooter />
</template>
