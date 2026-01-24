//createRouter:创建router实例对象
//createWebHistory:创建history模式路由
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "category/:id",
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "category/sub/:id",
          component: () => import("@/views/SubCategory/index.vue"),
        },
        {
          path: "detail/:id",
          component: () => import("@/views/Detail/index.vue"),
        },
        {
          path: "cartlist",
          component: () => import("@/views/CartList/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "checkout",
          component: () => import("@/views/Checkout/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "pay",
          component: () => import("@/views/Pay/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "paycallback",
          component: () => import("@/views/Pay/PayBack.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "member",
          component: () => import("@/views/Member/index.vue"),
          meta: { requiresAuth: true },
          children: [
            {
              //置空默认显示三级路由
              path: "",
              component: () => import("@/views/Member/components/UserInfo.vue"),
              meta: { requiresAuth: true },
            },
            {
              path: "order",
              component: () => import("@/views/Member/components/UserOrder.vue"),
              meta: { requiresAuth: true },
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
  // 滚动行为
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 检查路由是否需要认证
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !userStore.isLogin) {
    // 未登录，跳转到登录页面
    next({
      path: "/login",
      query: { redirect: to.fullPath }, // 保存目标路径，登录后可以跳转回去
    });
  } else {
    // 已登录或不需要认证，继续导航
    next();
  }
});

export default router;
