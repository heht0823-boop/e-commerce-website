// src/stores/cartStore.ts
//封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, deleteCartAPI } from "../apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    //获取最新购物车的列表action
    const updateNewList = async () => {
      try {
        const res = await findNewCartListAPI();
        cartList.value = res.data.result;
      } catch (err) {
        console.error("获取最新购物车列表失败", err);
      }
    };
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    //1.定义state-cartList
    const cartList = ref([]);

    //2.定义action-addCart
    const addCart = async (goods) => {
      if (isLogin.value) {
        //已登录
        try {
          await insertCartAPI(goods);
          updateNewList();
        } catch (err) {
          console.error("添加购物车失败", err);
        }
      } else {
        //未登录
        //添加购物车操作
        //已添加过-count+1
        //未添加过-push
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          //已添加过
          item.count++;
        } else {
          //未添加过
          // 确保新添加的商品默认选中
          goods.selected = goods.selected ?? true;
          goods.isEffective = goods.isEffective ?? true; // 确保商品有效
          cartList.value.push(goods);
        }
      }
    };

    //删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //调用接口实现接口购物车的功能实现
        try {
          await deleteCartAPI([skuId]);
          updateNewList();
        } catch (err) {
          console.error("删除购物商品失败", err);
        }
      } else {
        //思路：1.找到要删除项的下标值-splice
        //2.使用数组的过滤方法-filter
        const index = cartList.value.findIndex((item) => skuId === item.skuId);
        //做边界处理,仅当找到对应商品时才执行删除
        if (index > -1) {
          cartList.value.splice(index, 1);
        }
      }
    };

    //清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    //计算属性
    //1.总的数量 所有项的count之和
    const allCount = computed(
      () => cartList.value.reduce > ((preValue, item) => preValue + item.count, 0),
    );

    //2.总价格 所有项的price*count之和
    const allPrice = computed(() =>
      cartList.value.reduce((preValue, item) => {
        const itemPrice = item.price ?? 0;
        return preValue + item.count * itemPrice;
      }, 0),
    );

    //单选功能
    const singleCheck = (skuId, selected) => {
      //通过skuId找到要修改的那一项,然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      if (item) {
        item.selected = selected;
      }
    };

    //全选功能
    const allCheck = (selected) => {
      //把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //是否全选
    const isAll = computed(
      () =>
        cartList.value.length > 0 &&
        cartList.value.every((item) => item.selected && item.isEffective !== false),
    );

    //计算所有选中的数量和价格 - 只统计有效的商品
    //1.已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected && item.isEffective !== false)
        .reduce((preValue, item) => preValue + item.count, 0),
    );

    //2.已选择商品合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected && item.isEffective !== false)
        .reduce((preValue, item) => {
          const itemPrice = item.price ?? 0;
          return preValue + item.count * itemPrice;
        }, 0),
    );

    // 获取选中的有效商品列表 - 用于结算
    const selectedGoods = computed(() =>
      cartList.value.filter(
        (item) => item.selected && item.count > 0 && item.isEffective !== false,
      ),
    );

    // 获取有效商品列表 - 用于显示购物车
    const effectiveCartList = computed(() =>
      cartList.value.filter((item) => item.isEffective !== false),
    );

    // 获取无效商品列表
    const invalidCartList = computed(() =>
      cartList.value.filter((item) => item.isEffective === false),
    );

    return {
      cartList,
      effectiveCartList,
      invalidCartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      allCheck,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      updateNewList,
      selectedGoods, // 添加这个返回
    };
  },
  {
    //持久化
    persist: true,
  },
);
