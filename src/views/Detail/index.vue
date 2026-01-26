<!-- src/views/Detail/index.vue -->
<script setup lang="ts">
import { getDetail } from "@/apis/detail";
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useCartStore } from "@/stores/cartStore";
import type { GoodsResponse } from "@/types/detail";
import type { CartItem } from "@/types/cart";
import { useBreakpoint } from "@/composables/useBreakpoint";

//懒加载DetailHot组件
const DetailHot = defineAsyncComponent(() => import("@/views/Detail/components/DetailHot.vue"));
const cartStore = useCartStore();
const goods = ref<GoodsResponse>();
const { isMobile, isPc } = useBreakpoint();

const getGoods = async () => {
  const route = useRoute();
  const res = await getDetail(route.params.id as string);
  goods.value = res.data.result;
};

onMounted(() => {
  getGoods();
});

interface SkuObjData {
  inventory: number;
  oldPrice: string;
  price: string;
  skuId: string;
  specsText: string;
}

let skuObj: SkuObjData;
//sku规格被操作时
const skuChange = (sku: SkuObjData) => {
  skuObj = sku;
};

//count
const count = ref(1);
const countChange = (count: number) => {
  console.log(count);
};
// 转换函数：把商品详情(GoodsResponse) 转成购物车项(CartItem)
const convertGoodsToCartItem = (
  goods: GoodsResponse,
  skuId: string,
  specsText: string,
  count: number,
): CartItem => {
  return {
    // 1. 从 goods 直接映射的字段
    id: goods.id,
    name: goods.name,
    price: goods.price,
    discount: goods.discount,
    isCollect: goods.isCollect,
    stock: goods.inventory,
    picture: goods.mainPictures && goods.mainPictures.length > 0 ? goods.mainPictures[0] : "", // 取第一张主图，空值容错

    // 2. 购物车特有字段，从 goods 加工得到
    nowPrice: goods.price, // 当前售价默认和商品售价一致
    nowOriginalPrice: goods.oldPrice, // 原价对应商品的 oldPrice

    // 3. 从函数参数传入的字段（购物车需要的规格信息）
    skuId: skuId,
    attrsText: specsText,
    count: count,

    // 4. 购车状态字段，给合理默认值
    selected: true, // 加入购物车默认选中
    isEffective: goods.inventory > 0, // 有库存则有效
    postFee: 0, // 默认包邮
    specs: [], // 规格数组暂时留空占位
  };
};
//添加购物车
const addCart = (goods: GoodsResponse) => {
  if (skuObj.skuId) {
    // 先转换为 CartItem 类型
    const cartItem = convertGoodsToCartItem(goods, skuObj.skuId, skuObj.specsText, count.value);
    // 此时传入的是完整的 CartItem，不会报错
    cartStore.addCart(cartItem);
  } else {
    ElMessage.warning("请选择商品规格");
  }
};
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods?.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- 渲染时间不对导致goods-开始为{},{}.categoeries->undefined->undifined[1]
          解决办法:
          1.可选链的语法?.
          2.v-if手动控制渲染时机,保证只有数据存在才渲染 -->
          <el-breadcrumb-item :to="{ path: `/category${goods?.categories[1].id}` }">{{
            goods?.categories[1].name
          }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods?.categories[0].id}` }"
            >{{ goods?.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods?.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info" :class="{ 'mobile-layout': isMobile, 'pc-layout': isPc }">
            <div class="media" v-if="goods?.brand">
              <!-- 图片预览区 -->
              <XtxImageView :image-list="goods?.mainPictures" />
              <!-- 统计数量 -->
              <ul class="goods-sales" v-if="isPc">
                <li>
                  <p>销量人气</p>
                  <p>{{ goods?.salesCount }}+</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>{{ goods?.commentCount }}+</p>
                  <p>200+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goods?.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goods?.brand.name }}+</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-desc">{{ goods?.desc }}</p>
              <p class="g-name">{{ goods?.name }}</p>
              <p class="g-price">
                <span>{{ goods?.oldPrice }}</span>
                <span> {{ goods?.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送,App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="goods" @change="skuChange"> </XtxSku>
              <!-- 数据组件 -->
              <el-input-number v-model="count" @change="countChange" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer" :class="{ 'mobile-layout': isMobile, 'pc-layout': isPc }">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" :src="img" :key="img" alt="" />
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside" v-if="isPc">
              <DetailHot :hot-type="1"> </DetailHot>
              <DetailHot :hot-type="2"> </DetailHot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;
    flex-direction: column; // 移动端垂直布局

    @include pc {
      flex-direction: row; // PC端水平布局
    }

    .media {
      width: 100%;
      height: auto;
      padding: 15px; // 移动端内边距

      @include pc {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
      }

      .goods-sales {
        display: flex;
        width: 100%;
        align-items: center;
        text-align: center;
        height: auto; // 移动端自适应高度
        flex-wrap: wrap;

        @include pc {
          width: 400px;
          height: 140px;
          flex-wrap: nowrap;
        }

        li {
          flex: 1 1 50%; // 移动端两列
          position: relative;
          margin-bottom: 10px;

          @include pc {
            flex: 1 0 auto; // PC端平均分布
            margin-bottom: 0;
          }

          ~ li::after {
            display: none; // 移动端去掉分割线

            @include pc {
              position: absolute;
              top: 10px;
              left: 0;
              height: 60px;
              border-left: 1px solid #e4e4e4;
              content: "";
            }
          }

          p {
            &:first-child {
              color: #999;
              font-size: 12px; // 移动端字体更小

              @include pc {
                font-size: inherit;
              }
            }

            &:nth-child(2) {
              color: $priceColor;
              margin-top: 5px; // 移动端间距更小

              @include pc {
                margin-top: 10px;
              }
            }

            &:last-child {
              color: #666;
              margin-top: 5px; // 移动端间距更小

              @include pc {
                margin-top: 10px;
              }

              i {
                color: $xtxColor;
                font-size: 12px; // 移动端图标更小
                margin-right: 2px;

                @include pc {
                  font-size: 14px;
                }

                &:hover {
                  color: $xtxColor;
                  cursor: pointer;
                }
              }

              &:hover {
                color: $xtxColor;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .spec {
      flex: 1;
      padding: 15px; // 移动端内边距

      @include pc {
        padding: 30px 30px 30px 0;
      }
    }
  }

  .goods-footer {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    @include pc {
      flex-direction: row;
    }

    @include desktop {
      margin-top: 30px;
    }

    @include large-screen {
      margin-top: 40px;
    }

    .goods-article {
      width: 100%;
      margin-right: 0;

      @include pc {
        width: 940px;
        margin-right: 20px;
      }

      @include desktop {
        width: 1000px;
        margin-right: 30px;
      }

      @include large-screen {
        width: 1100px;
        margin-right: 40px;
      }
    }

    .goods-aside {
      width: 100%;
      min-height: auto;

      @include pc {
        width: 280px;
        min-height: 1000px;
      }

      @include desktop {
        width: 300px;
      }

      @include large-screen {
        width: 350px;
      }
    }
  }

  .goods-tabs {
    min-height: 300px; // 移动端自适应高度
    background: #fff;

    @include pc {
      min-height: 600px; // PC端固定高度
    }
  }

  .goods-warn {
    min-height: 300px; // 移动端自适应高度
    background: #fff;
    margin-top: 20px;

    @include pc {
      min-height: 600px; // PC端固定高度
    }
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 18px; // 移动端字体更小

    @include pc {
      font-size: 22px; // PC端字体更大
    }
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
    font-size: 14px; // 移动端字体更小
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 18px; // 移动端字体更小

        @include pc {
          font-size: 22px; // PC端字体更大
        }
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 14px; // 移动端字体更小

        @include pc {
          font-size: 16px; // PC端字体更大
        }
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 100%; // 移动端占满宽度
    padding: 15px; // 移动端内边距
    margin-top: 10px;

    @include pc {
      width: 500px; // PC端固定宽度
      padding: 20px 10px 0 10px;
    }

    dl {
      padding-bottom: 15px; // 移动端间距更小
      display: flex;
      flex-direction: column; // 移动端垂直布局
      align-items: flex-start; // 左对齐

      @include pc {
        padding-bottom: 20px; // PC端间距更大
        flex-direction: row; // PC端水平布局
        align-items: center; // 垂直居中
      }

      dt {
        width: auto; // 移动端自适应宽度
        color: #999;
        margin-bottom: 5px; // 移动端下边距

        @include pc {
          width: 50px; // PC端固定宽度
          margin-bottom: 0; // PC端无下边距
        }
      }

      dd {
        color: #666;

        &:last-child {
          span {
            display: block; // 移动端块级显示
            margin-right: 0; // 移动端无右边距
            margin-bottom: 5px; // 移动端下边距

            @include pc {
              display: inline; // PC端行内显示
              margin-right: 10px; // PC端右边距
              margin-bottom: 0; // PC端无下边距
            }

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 300px; // 移动端自适应高度
  background: #fff;

  nav {
    height: auto; // 移动端自适应高度
    line-height: 40px; // 移动端行高
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    overflow-x: auto; // 移动端允许水平滚动

    @include pc {
      height: 70px; // PC端固定高度
      line-height: 70px; // PC端行高
    }

    a {
      padding: 0 20px; // 移动端内边距更小

      @include pc {
        padding: 0 40px; // PC端内边距更大
      }

      font-size: 16px; // 移动端字体更小

      @include pc {
        font-size: 18px; // PC端字体更大
      }

      position: relative;

      > span {
        color: $priceColor;
        font-size: 14px; // 移动端字体更小
        margin-left: 5px; // 移动端间距更小

        @include pc {
          font-size: 16px; // PC端字体更大
          margin-left: 10px; // PC端间距更大
        }
      }
    }
  }
}

.goods-detail {
  padding: 20px; // 移动端内边距更小

  @include pc {
    padding: 40px; // PC端内边距更大
  }

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px; // 移动端间距更小

    @include pc {
      margin-bottom: 30px; // PC端间距更大
    }

    li {
      display: flex;
      margin-bottom: 10px; // 移动端间距更小
      width: 100%; // 移动端占满宽度

      @include pc {
        margin-bottom: 10px;
        width: 50%; // PC端两列
      }

      .dt {
        width: 80px; // 移动端宽度更小
        color: #999;

        @include pc {
          width: 100px; // PC端宽度更大
        }
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
  width: 100%; // 移动端占满宽度

  @include pc {
    width: auto; // PC端自适应宽度
  }
}

.bread-container {
  padding: 15px 0; // 移动端内边距更小

  @include pc {
    padding: 25px 0; // PC端内边距更大
  }
}
</style>
