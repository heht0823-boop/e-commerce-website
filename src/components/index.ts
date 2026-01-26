//把components中的所有组件都进行全局注册
//通过插件的方式
import { App, defineAsyncComponent } from "vue";
const ImageView = defineAsyncComponent(() => import("@/components/ImageView/index.vue"));
const Sku = defineAsyncComponent(() => import("@/components/XtxSku/index.vue"));
export const componentPlugin = {
  install(app: App) {
    //app.component("组件名",组件对象)
    app.component("XtxImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
