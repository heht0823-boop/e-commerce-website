import { useIntersectionObserver } from "@vueuse/core";

export const lazyPlugin = {
  install(app) {
    //定义全局指令
    app.directive("img-lazy", {
      mounted(el, bingding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = bingding.value;
            stop();
          }
        });
      },
    });
  },
};
