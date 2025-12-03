//封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    //1.定义state-cartList
    const cartList = ref([]);
    //2.定义action-addCart
    const addCart = (goods) => {
      //添加购物车操作
      //已添加过-count+1
      //未添加过-push
      //通过匹配船体过来的商品对象中的skuId能不能再cartListzhoadao,找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        //已添加过
        item.count++;
      } else {
        //未添加过
        cartList.value.push(goods);
      }
    };
    return {
      cartList,
      addCart,
    };
  },
  {
    //持久化
    persist: true,
  }
);
