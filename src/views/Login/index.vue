<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, FormItemRule, ElForm } from "element-plus";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { encryptData, decryptData } from "./CryptoJs";
import { debounce } from "@/composables/debounce/debounce";

const UserStore = useUserStore();
const route = useRoute();

// 获取从退出登录传递过来的记住密码状态（需要解码）
const routeAccount = route.query.account ? decodeURIComponent(route.query.account as string) : "";
const routePassword = route.query.password
  ? decodeURIComponent(route.query.password as string)
  : "";
const routeRememberMe = route.query.rememberMe === "true";

// 表单验证
const form = ref({
  account: routeAccount,
  password: routePassword,
  rememberMe: routeRememberMe,
  agree: true,
});

// 保存记住的账号密码（加密后存储）
const saveRememberedCredentials = (account: string, password: string) => {
  const data = {
    account,
    password,
    timestamp: new Date().getTime(), // 当前时间戳
  };

  // 使用加密函数加密整个对象
  const encryptedData = encryptData(data);

  if (encryptedData) {
    // 确保加密成功
    localStorage.setItem("loadRememberedCredentials", encryptedData);
    console.log("✅ 加密数据已保存到本地存储");
  } else {
    console.error("❌ 加码失败，未保存数据");
  }
};

// 清除记住的账号密码
const clearRememberedCredentials = () => {
  localStorage.removeItem("loadRememberedCredentials");
  console.log("✅ 已清除记住的登录信息");
};

// 表单规则
const rules: Record<string, FormItemRule[]> = {
  account: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 14,
      message: "密码长度为6-14位",
      trigger: "blur",
    },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选协议"));
        }
      },
    },
  ],
};

// 登录方法
const formRef = ref<InstanceType<typeof ElForm>>();
const router = useRouter();

const dologin = async () => {
  if (routeAccount && routePassword && routeRememberMe) {
    clearRememberedCredentials();
  }
  const { account, password, rememberMe } = form.value;

  const valid = await formRef.value?.validate().catch(() => false);

  if (valid) {
    try {
      // 登录成功
      await UserStore.getUserInfo({ account, password });

      // 如果勾选了记住密码，保存账号密码
      if (rememberMe) {
        saveRememberedCredentials(account, password);
      } else {
        clearRememberedCredentials();
      }

      // 提示用户
      ElMessage({ type: "success", message: "登录成功" });
      // 跳转首页
      router.replace({ path: "/" });
    } catch (error: any) {
      // 添加类型注解
      console.error("登录失败:", error);
      // 修复错误处理
      const errorMsg = error.response?.data?.message || error.message || "登录失败，请检查账号密码";
      ElMessage({ type: "error", message: errorMsg });
    }
  }
};
const debounceLogin = debounce(dologin, 400, true);
</script>
<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <el-form-item prop="account" label="账户">
                <el-input v-model="form.account" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password" placeholder="请输入密码" />
              </el-form-item>

              <!-- 记住密码和协议 -->
              <el-form-item prop="rememberMe" label-width="22px">
                <div class="login-options">
                  <el-checkbox v-model="form.rememberMe" size="large"> 记住密码 </el-checkbox>
                  <el-checkbox size="large" v-model="form.agree">
                    我已同意隐私条款和服务条款
                  </el-checkbox>
                </div>
              </el-form-item>

              <el-button size="large" class="subBtn" @click="debounceLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}
.login-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;

  :deep(.el-checkbox) {
    margin-right: 0;
    margin-bottom: 8px;

    .el-checkbox__label {
      font-size: 12px;
      color: #666;
    }
  }
}

.login-section {
  background: url("@/assets/images/login-bg.png") no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
