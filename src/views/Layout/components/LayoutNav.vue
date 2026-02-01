<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { encryptData, decryptData } from "@/views/Login/CryptoJs";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// 定义用户数据接口
interface UserData {
  account: string;
  password: string;
  timestamp: number;
}

const userStore = useUserStore();
const router = useRouter();

// 从localStorage中加载记住的账号密码
const loadRememberedCredentials = () => {
  try {
    const encryptedStr = localStorage.getItem("loadRememberedCredentials");
    if (encryptedStr) {
      // 解密数据
      const decryptedData = decryptData(encryptedStr) as UserData;

      // 检查解密是否成功且数据有效
      if (
        decryptedData &&
        typeof decryptedData === "object" &&
        decryptedData.account &&
        decryptedData.password
      ) {
        // 检查是否过期(七天有效期)
        const now = new Date().getTime();
        if (now - decryptedData.timestamp < 7 * 24 * 60 * 60 * 1000) {
          return {
            account: decryptedData.account,
            password: decryptedData.password,
            rememberMe: true,
          };
        } else {
          // 清除过期数据
          localStorage.removeItem("loadRememberedCredentials");
          ElMessage({ type: "info", message: "记住的登录信息已过期，已自动清除" });
        }
      } else {
        // 解密失败或数据格式不正确
        localStorage.removeItem("loadRememberedCredentials");
        ElMessage({ type: "warning", message: "记住的登录信息格式错误，已清除" });
      }
    }
  } catch (error) {
    console.error("加载记住的账号密码失败", error);
    ElMessage({ type: "error", message: "加载记住的账号密码失败" });
  }

  return {
    account: "",
    password: "",
    rememberMe: false,
  };
};

const confirm = () => {
  const { account, password, rememberMe } = loadRememberedCredentials();

  //退出登录清除用户信息
  userStore.clearUserInfo();

  //构建查询参数
  const query: any = {
    rememberMe: rememberMe ? "true" : "false",
  };

  //只有在有有效账号密码时才添加到查询参数
  if (account && password) {
    query.account = encodeURIComponent(account);
    query.password = encodeURIComponent(password);
  }

  //跳转登录页
  router.push({
    path: "/login",
    query,
  });
};

const myOrder = () => {
  router.push("/member/order");
};

const myMember = () => {
  router.push("/member/myMember");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo.token">
          <li>
            <router-link to="/member" class="user-link">
              <a href="javascript:;">
                <i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}
              </a>
            </router-link>
          </li>
          <li>
            <el-popconfirm
              @confirm="confirm"
              title="确认退出吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="myOrder">我的订单</a></li>
          <li><a href="javascript:;" @click="myMember">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/Login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
// 在导航栏中加入响应式菜单隐藏逻辑
.nav-menu {
  display: none;

  @include pc {
    display: flex;
    gap: 20px;
  }

  @include desktop {
    gap: 30px;
  }

  @include large-screen {
    gap: 40px;
  }
}
</style>
