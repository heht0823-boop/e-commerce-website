<!-- src/views/CartList/index.vue -->
<script setup>
import { useCartStore } from "@/stores/cartStore";
import { watch } from "vue";
import { useBreakpoint } from "@/composables/useBreakpoint";

const cartStore = useCartStore();
const { isMobile, isPc } = useBreakpoint();

//单选回调
const singleCheck = (selected, i) => {
  cartStore.singleCheck(i.skuId, selected);
};

const allCheck = (selected) => {
  cartStore.allCheck(selected);
};

//删除购物车
const delCart = async (item) => {
  await cartStore.delCart(item.skuId);
};

// 监听购物车状态变化，如果商品数量为0，则自动取消选中
watch(
  () => cartStore.cartList,
  () => {
    cartStore.cartList.forEach((item) => {
      if (item.count <= 0) {
        cartStore.singleCheck(item.skuId, false);
      }
    });
  },
  { deep: true },
);
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table :class="{ 'mobile-table': isMobile, 'pc-table': isPc }">
          <thead v-if="isPc">
            <tr>
              <th width="120">
                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品列表 -->
          <tbody>
            <tr v-for="i in cartStore.effectiveCartList" :key="i.id">
              <td>
                <!-- 单选框 -->
                <el-checkbox
                  :model-value="i.selected"
                  @change="(selected) => singleCheck(selected, i)"
                  :disabled="i.isEffective === false"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="i.count" :min="1" @change="() => {}" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="delCart(i)"
                  >
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>

            <!-- 无效商品列表 -->
            <tr v-if="cartStore.invalidCartList.length > 0">
              <td colspan="6" style="padding: 10px">
                <div style="background-color: #f5f5f5; padding: 10px; margin-top: 10px">
                  <h4 style="color: #e4393c">没有库存</h4>
                </div>
              </td>
            </tr>

            <tr v-for="i in cartStore.invalidCartList" :key="i.id">
              <td>
                <span style="color: #999">×</span>
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="i.picture" alt="" style="opacity: 0.5"
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis" style="color: #999">{{ i.name }} (已失效)</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p style="color: #999">&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <p style="color: #999">{{ i.count }}</p>
              </td>
              <td class="tc">
                <p class="f16 red" style="color: #999">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <a href="javascript:;" @click="delCart(i)" style="color: #999">删除</a>
                </p>
              </td>
            </tr>

            <tr
              v-if="
                cartStore.effectiveCartList.length === 0 && cartStore.invalidCartList.length === 0
              "
            >
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }}件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }}</span>
        </div>
        <div class="total">
          <el-button
            size="large"
            type="primary"
            @click="$router.push('/checkout')"
            :disabled="cartStore.selectedCount === 0"
          >
            去结算
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: auto;
    align-items: stretch;
    flex-direction: column; // 手机端默认纵向排列
  }
}

// 手机端样式（＜768px）
@include mobile {
  .xtx-cart-page {
    .cart {
      table.mobile-table {
        display: block;

        thead,
        tbody,
        tr {
          display: block;
        }

        tr {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #f5f5f5;
          margin-bottom: 10px;

          td,
          th {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: none;

            &:first-child {
              padding-left: 15px;
            }
          }
        }
      }
    }

    .action {
      .batch {
        padding: 15px;
        border-bottom: 1px solid #f5f5f5;
      }

      .total {
        padding: 15px;
      }
    }
  }
}

// PC 端样式（≥768px）
@include pc {
  .xtx-cart-page {
    .cart {
      table.pc-table {
        thead,
        tbody,
        tr,
        th,
        td {
          display: table-cell;
        }

        th,
        td {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;

          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }
      }
    }

    .action {
      flex-direction: row; // PC 端横向排列
      height: 80px;
      align-items: center;

      .batch {
        border-bottom: none;
        padding: 0;
      }

      .total {
        padding: 0 30px;
        margin-left: auto;
      }
    }
  }
}
</style>
