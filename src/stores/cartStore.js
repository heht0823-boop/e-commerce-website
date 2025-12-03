//封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI } from "./cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    //1.定义state-cartList
    const cartList = ref([]);
    //2.定义action-addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        //已登录
        await insertCartAPI({ skuId, count });
        const res = await findNewCartListAPI();
        cartList.value = res.result;
      } else {
        //未登录
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
      }
    };
    //删除购物车
    const delCart = (skuId) => {
      //思路：1.找到要删除项的下标值-splice
      //2.使用数组的过滤方法-filter
      const index = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(index, 1);
    };
    //计算属性
    //1.总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((preValue, item) => preValue + item.count, 0)
    );
    //2.总价格 所有项的price*count之和
    const allPrice = computed(() =>
      cartList.value.reduce((preValue, item) => preValue + item.count * item.price, 0)
    );
    //单选功能
    const singleCheck = (skuId, selected) => {
      //通过skuId找到要修改的那一项,然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    //全选功能
    const allCheck = (selected) => {
      //把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    //计算所有选中的数量和价格
    //1.已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((preValue, item) => preValue + item.count, 0)
    );
    //2.已选择商品合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((preValue, item) => preValue + item.count * item.price, 0)
    );
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      allCheck,
      isAll,
      selectedCount,
      selectedPrice,
    };
  },
  {
    //持久化
    persist: true,
  }
);
