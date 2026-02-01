import { createApp } from "@vue/runtime-dom";
import { createPinia } from "pinia";
import { lazyPlugin } from "@/directives/index";
import App from "./App.vue";
import router from "./router";
import { componentPlugin } from "@/components/index";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入 Element Plus 样式
import "element-plus/dist/index.css";
// 引入初始化样式
import "@/styles/common.scss";
// 仅在开发环境启动 Mock
if (import.meta.env.DEV) {
  (async () => {
    const { worker } = await import("./mocks/browser");
    worker.start({
      quiet: false,
      onUnhandledRequest: "bypass",
    });
  })();
}

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// 注册持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
