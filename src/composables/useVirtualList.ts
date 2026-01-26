// src/composables/useVirtualList.ts
import { ref, computed, Ref } from "vue";

interface VirtualListOptions {
  itemHeight: number;
  containerHeight: number;
  buffer?: number; // 缓冲区数量，默认为1
}

export function useVirtualList<T>(list: Ref<T[]>, options: VirtualListOptions) {
  const scrollTop = ref(0);
  const containerRef = ref<HTMLElement | null>(null);

  const buffer = options.buffer || 1;
  const visibleCount = computed(() => Math.ceil(options.containerHeight / options.itemHeight));
  const startIndex = computed(() =>
    Math.max(0, Math.floor(scrollTop.value / options.itemHeight) - buffer),
  );
  const endIndex = computed(() =>
    Math.min(list.value.length, startIndex.value + visibleCount.value + buffer * 2),
  );

  const visibleList = computed(() => list.value.slice(startIndex.value, endIndex.value));

  const offsetY = computed(() => startIndex.value * options.itemHeight);
  const placeholderHeight = computed(() => list.value.length * options.itemHeight);

  // 滚动处理函数
  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    scrollTop.value = target.scrollTop;
  };

  return {
    visibleList,
    offsetY,
    placeholderHeight,
    containerRef,
    handleScroll,
    scrollTop,
  };
}
