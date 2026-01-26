// src/composables/useBreakpoint.ts
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

export function useBreakpoint() {
  const { width } = useWindowSize();

  // 仅保留二端判断
  const isMobile = computed(() => width.value < 768);
  const isPc = computed(() => width.value >= 768);

  return {
    width,
    isMobile,
    isPc,
  };
}
