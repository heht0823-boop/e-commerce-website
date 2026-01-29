<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useMockUserStore } from "@/stores/mock/userStore";
import { updataUserProfile } from "@/apis/mock/user";
import type { UpdateUserInfoData } from "@/types/mock/user";
import { ElMessage, ElMessageBox } from "element-plus";

const userStore = useMockUserStore();
const form = ref<UpdateUserInfoData>({
  account: "",
  email: "",
  phone: "",
  gender: "",
  birthday: "",
  avatar: "",
});

const isEditing = ref(false);

const initForm = () => {
  if (userStore.userInfo) {
    form.value = {
      account: userStore.userInfo.account,
      email: userStore.userInfo.email,
      phone: userStore.userInfo.phone,
      gender: userStore.userInfo.gender,
      birthday: userStore.userInfo.birthday,
      avatar: userStore.userInfo.avatar,
    };
  }
};

const toggleEdit = async () => {
  if (isEditing.value) {
    try {
      await updataUserProfile(form.value);
      await userStore.fetchUserProfile(); // 更新用户信息
      ElMessage.success("信息更新成功");
      isEditing.value = false;
    } catch (error: unknown) {
      ElMessage.error("更新失败");
    }
  } else {
    isEditing.value = true;
  }
};

const changePassword = async () => {
  try {
    await ElMessageBox.prompt("请输入新密码", "修改密码", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputType: "password",
    });
    ElMessage.success("密码修改成功");
  } catch {
    // 用户取消操作
  }
};
const changePhone = async () => {
  try {
    await ElMessageBox.prompt("请输入新手机号码", "修改手机号", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputType: "phone",
    });
    ElMessage.success("手机号修改成功");
  } catch {
    // 用户取消操作
  }
};
const changeEmail = async () => {
  try {
    await ElMessageBox.prompt("请输入新邮箱", "修改邮箱", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputType: "email",
    });
    ElMessage.success("邮箱修改成功");
  } catch {
    // 用户取消操作
  }
};

const handleAvatarChange = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    form.value.avatar = e.target?.result as string;
  };
  reader.readAsDataURL(file.raw);
};

onMounted(async () => {
  try {
    const res = await userStore.fetchUserProfile();
  } catch (err: unknown) {
    console.log(err);
  }

  initForm();
});
</script>
<template>
  <div class="security-container">
    <div class="security-card">
      <h3>个人信息</h3>

      <div class="profile-section">
        <div class="avatar-section">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="handleAvatarChange"
            accept="image/*"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <p>点击更换头像</p>
        </div>

        <div class="info-section">
          <el-form :model="form" label-width="100px" class="security-form" :disabled="!isEditing">
            <el-form-item label="用户名">
              <el-input v-model="form.account" />
            </el-form-item>

            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="生日">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="form.email" />
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="form.phone" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="toggleEdit" class="save-btn" :disabled="false">
                {{ isEditing ? "保存" : "编辑" }}
              </el-button>
              <el-button @click="changePassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div class="security-card">
      <h3>安全设置</h3>
      <div class="security-settings">
        <div class="setting-item">
          <div class="setting-info">
            <h4>登录密码</h4>
            <p>安全性高的密码可以使账户更安全，建议您定期更换密码</p>
          </div>
          <div class="setting-action">
            <el-button @click="changePassword">修改</el-button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>绑定手机</h4>
            <p>{{ form.phone || "未绑定" }}</p>
          </div>
          <div class="setting-action">
            <el-button @click="changePhone">{{ form.phone ? "修改" : "绑定" }}</el-button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>绑定邮箱</h4>
            <p>{{ form.email || "未绑定" }}</p>
          </div>
          <div class="setting-action">
            <el-button @click="changeEmail">{{ form.email ? "修改" : "绑定" }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.security-container {
  padding: 20px;

  .security-card {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;

    h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .profile-section {
    display: flex;
    gap: 30px;

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar-uploader {
        :deep(.el-upload) {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);

          &:hover {
            border-color: var(--el-color-primary);
          }
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          text-align: center;
        }

        .avatar {
          width: 178px;
          height: 178px;
          display: block;
          border-radius: 50%;
        }
      }
    }

    .info-section {
      flex: 1;

      .security-form {
        :deep(.el-form-item__label) {
          font-weight: 600;
        }

        .save-btn {
          margin-right: 10px;
        }
      }
    }
  }

  .security-settings {
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .setting-info {
        h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
          font-weight: 500;
        }

        p {
          margin: 0;
          color: #999;
          font-size: 14px;
        }
      }

      .setting-action {
        .el-button {
          padding: 8px 20px;
        }
      }
    }
  }
}
</style>
