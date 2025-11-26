import { createApp } from "vue";
import { createPinia } from "pinia";
import { lazyPlugin } from "@/directives/index";
import App from "./App.vue";
import router from "./router";
import { componentPlugin } from "@/components/index";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
//引入初始化样式
import "@/styles/common.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
//注册持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
