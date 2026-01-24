import { useIntersectionObserver } from "@vueuse/core";
import { App, DirectiveBinding } from "@vue/runtime-core";

export const lazyPlugin = {
  install(app: App) {
    //定义全局指令
    app.directive("img-lazy", {
      mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
