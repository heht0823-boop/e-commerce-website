// src/directives/index.ts
import { useIntersectionObserver } from "@vueuse/core";
import { App, DirectiveBinding } from "@vue/runtime-core";

export const lazyPlugin = {
  install(app: App) {
    app.directive("img-lazy", {
      mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 添加响应式图片源
              const img = new Image();
              img.onload = () => {
                el.src = binding.value;
              };
              img.onerror = () => {
                el.src = "/images/default-placeholder.png";
              };
              img.src = binding.value;
              stop();
            }
          },
          { threshold: 0.1 }, // 10% 可见时就开始加载
        );
      },
    });
  },
};
