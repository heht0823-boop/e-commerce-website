<script setup lang="ts">
import { useMockUserStore } from "@/stores/mock/userStore";
import { getLikeListAPI } from "@/apis/user";
import GoodsItem from "@/views/home/components/GoodsItem.vue";
import { onMounted, ref } from "vue";
import type { relevantResponse } from "@/types/user";

const mockUserStore = useMockUserStore();
const likeList = ref<relevantResponse>();

const getLikeList = async () => {
  const res = await getLikeListAPI({ limit: 4 });
  likeList.value = res?.data?.result;
};

onMounted(async () => {
  // 确保用户信息已加载
  if (!mockUserStore.userInfo) {
    await mockUserStore.fetchUserProfile();
  }
  getLikeList();
});

// 格式化时间
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("zh-CN");
};
</script>

<template>
  <div class="member-center">
    <!-- 会员概览 -->
    <div class="overview-section">
      <div class="user-header">
        <div class="avatar-section">
          <img :src="mockUserStore.userInfo?.avatar" alt="头像" class="avatar" />
          <div class="user-info">
            <h3>{{ mockUserStore.userInfo?.account }}</h3>
            <div class="member-level">
              <span class="level-badge">{{ mockUserStore.userInfo?.level }}</span>
              <span class="member-expire"
                >会员有效期至: {{ formatDate(mockUserStore.userInfo?.createTime || "") }}</span
              >
            </div>
          </div>
        </div>
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-value">{{ mockUserStore.userInfo?.integral }}</div>
            <div class="stat-label">积分</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">¥{{ mockUserStore.userInfo?.balance?.toFixed(2) }}</div>
            <div class="stat-label">余额</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ mockUserStore.userInfo?.addressList?.length }}</div>
            <div class="stat-label">收货地址</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 会员权益 -->
    <div class="benefits-section">
      <h3>会员权益</h3>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🎁</div>
          <h4>专属优惠</h4>
          <p>享受会员专享折扣</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🚚</div>
          <h4>免邮特权</h4>
          <p>满99元免运费</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⚡</div>
          <h4>优先发货</h4>
          <p>会员订单优先处理</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🛡️</div>
          <h4>专属客服</h4>
          <p>7×24小时专属服务</p>
        </div>
      </div>
    </div>

    <!-- 会员等级进度 -->
    <div class="progress-section">
      <h3>会员成长</h3>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: '65%' }"></div>
        </div>
        <div class="progress-text">
          <span>当前等级: {{ mockUserStore.userInfo?.level }}</span>
          <span>距离升级还需: {{ 2000 - (mockUserStore.userInfo?.integral || 0) }} 积分</span>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <h3>快捷入口</h3>
      <div class="access-grid">
        <RouterLink to="/member/security" class="access-item">
          <div class="access-icon">👤</div>
          <span>个人信息</span>
        </RouterLink>
        <RouterLink to="/member/address" class="access-item">
          <div class="access-icon">📍</div>
          <span>地址管理</span>
        </RouterLink>
        <RouterLink to="/member/order" class="access-item">
          <div class="access-icon">📦</div>
          <span>我的订单</span>
        </RouterLink>
        <RouterLink to="/member/security" class="access-item">
          <div class="access-icon">🔒</div>
          <span>安全设置</span>
        </RouterLink>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="recommendation-section">
      <div class="section-header">
        <h3>猜你喜欢</h3>
        <RouterLink to="/home" class="more-link">查看更多 ></RouterLink>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="good in likeList" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.member-center {
  padding: 20px;

  .overview-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    padding: 30px;
    color: white;
    margin-bottom: 20px;

    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .avatar-section {
        display: flex;
        align-items: center;
        gap: 20px;

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .user-info {
          h3 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 500;
          }

          .member-level {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .level-badge {
              background: rgba(255, 255, 255, 0.2);
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 14px;
            }

            .member-expire {
              font-size: 12px;
              opacity: 0.9;
            }
          }
        }
      }

      .stats-section {
        display: flex;
        gap: 30px;

        .stat-item {
          text-align: center;

          .stat-value {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 4px;
          }

          .stat-label {
            font-size: 14px;
            opacity: 0.9;
          }
        }
      }
    }
  }

  .benefits-section,
  .progress-section,
  .quick-access,
  .recommendation-section {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;

    h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .benefit-card {
      text-align: center;
      padding: 20px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .benefit-icon {
        font-size: 32px;
        margin-bottom: 10px;
      }

      h4 {
        margin: 10px 0;
        font-size: 16px;
        font-weight: 600;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 14px;
      }
    }
  }

  .progress-container {
    .progress-bar {
      width: 100%;
      height: 12px;
      background: #f0f0f0;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 10px;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 6px;
        transition: width 0.3s ease;
      }
    }

    .progress-text {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
    }
  }

  .access-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;

    .access-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 10px;
      text-align: center;
      text-decoration: none;
      color: #333;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        color: $xtxColor;
        border-color: $xtxColor;
      }

      .access-icon {
        font-size: 24px;
        margin-bottom: 8px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .recommendation-section {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        margin: 0;
      }

      .more-link {
        color: $xtxColor;
        text-decoration: none;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .goods-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
}

@media (max-width: 768px) {
  .overview-section {
    .user-header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .stats-section {
      width: 100%;
      justify-content: space-around;
    }
  }

  .benefits-grid {
    grid-template-columns: 1fr 1fr;
  }

  .access-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
