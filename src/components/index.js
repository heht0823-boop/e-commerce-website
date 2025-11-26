//把components中的所有组件都进行全局注册
//通过插件的方式
import ImageView from "@/components/ImageView/index.vue";
import Sku from "@/components/XtxSku/index.vue";
export const componentPlugin = {
  install(app) {
    //app.component("组件名",组件对象)
    app.component("XtxImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
