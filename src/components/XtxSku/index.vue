<script setup lang="ts">
import { ref, watchEffect } from "vue";
import getPowerSet from "./power-set";
import type {
  GoodsResponse,
  GoodsSkus,
  GoodsSkusSpecs,
  GoodsSpecs,
  GoodsSpecsValues,
} from "@/types/detail";

// 定义 Props
interface Props {
  goods: GoodsResponse;
}

const props = defineProps<Props>();

interface Emits {
  (e: "change", data: Partial<GoodsSkus> | {}): void;
}

const emit = defineEmits<Emits>();

// 常量
const spliter = "★";

// 响应式数据：1. 存储当前选中的规格（后端无selected字段，自己维护） 2. 路径字典
const selectedSpecs = ref<Record<string, string>>({});
const pathMap = ref<Record<string, (string | number)[]>>({});

// 根据skus数据得到路径字典对象（适配修正后接口：skus为GoodsSkus[]数组）
const getPathMap = (skus: GoodsResponse["skus"]): Record<string, (string | number)[]> => {
  const map: Record<string, (string | number)[]> = {};
  // 判空：适配修正后接口的skus数组类型
  if (!Array.isArray(skus)) return map;

  skus.forEach((sku) => {
    // 仅处理库存>0的sku，避免无库存规格被选中
    if (sku.inventory <= 0) return;
    // 提取sku的规格值（从GoodsSkusSpecs中取valueName，显式指定类型避免报错）
    const specs = sku.specs.map((spec: GoodsSkusSpecs) => spec.valueName);
    const powerSet = getPowerSet(specs) as string[][];

    // 填充路径字典：存储sku.id，避免重复存入
    powerSet.forEach((set) => {
      const key = set.join(spliter);
      if (!map[key]) map[key] = [];
      if (!map[key].includes(sku.id)) map[key].push(sku.id);
    });
  });

  return map;
};

// 初始化禁用状态（适配修正后接口：specs为GoodsSpecs[]数组、GoodsSpecsValues属性为disabled）
const initDisabledStatus = (
  specs: GoodsResponse["specs"],
  pathMap: Record<string, (string | number)[]>,
) => {
  // 判空：适配修正后接口的specs数组类型
  if (!Array.isArray(specs)) return;

  specs.forEach((spec: GoodsSpecs) => {
    // 遍历规格值，显式指定GoodsSpecsValues类型，使用修正后接口的disabled属性
    spec.values.forEach((val: GoodsSpecsValues) => {
      val.disabled = !pathMap[val.name];
    });
  });
};

// 得到当前选中的规格集合（基于自己维护的selectedSpecs，适配修正后接口的specs数组）
const getSelectedArr = (specs: GoodsResponse["specs"]): string[] => {
  if (!Array.isArray(specs)) return [];
  // 遍历修正后接口的specs数组，提取已选中的规格值
  return specs.map((spec) => selectedSpecs.value[spec.name] || "").filter(Boolean);
};

// 更新按钮的禁用状态（完全适配修正后接口，无类型报错）
const updateDisabledStatus = (
  specs: GoodsResponse["specs"],
  pathMap: Record<string, (string | number)[]>,
) => {
  if (!Array.isArray(specs)) return;

  specs.forEach((item: GoodsSpecs, i) => {
    const selectedArr = getSelectedArr(specs);
    // 遍历规格值，使用修正后接口的disabled属性
    item.values.forEach((val: GoodsSpecsValues) => {
      // 复制临时选中数组，避免修改原数组产生副作用
      const tempSelectedArr = [...selectedArr];
      tempSelectedArr[i] = val.name;
      // 生成key判断禁用状态，依赖路径字典
      const key = tempSelectedArr.filter(Boolean).join(spliter);
      val.disabled = !pathMap[key];
    });
  });
};

// 点击规格处理函数（适配修正后接口，维护选中状态并传递sku信息）
const clickSpecs = (specName: string, val: GoodsSpecsValues) => {
  // 禁用状态直接返回，使用修正后接口的disabled属性
  if (val.disabled) return;

  // 维护选中状态：同规格下只能选一个，再次点击取消选中
  selectedSpecs.value[specName] = selectedSpecs.value[specName] === val.name ? "" : val.name;

  // 更新禁用状态，同步最新选中逻辑
  updateDisabledStatus(props.goods.specs, pathMap.value);

  // 传递选中的sku信息给父组件，适配修正后接口的skus数组
  const selectedArr = getSelectedArr(props.goods.specs);
  const specsLength = Array.isArray(props.goods.specs) ? props.goods.specs.length : 0;

  if (selectedArr.length === specsLength) {
    const key = selectedArr.join(spliter);
    const skuId = pathMap.value[key]?.[0];
    // 判空+遍历skus数组，查找对应sku（适配修正后接口的GoodsSkus[]类型）
    if (Array.isArray(props.goods.skus) && skuId) {
      const sku = props.goods.skus.find((sku) => sku.id === String(skuId));
      sku &&
        emit("change", {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, "").trim(),
        });
    }
  } else {
    emit("change", {});
  }
};

// 监听goods变化初始化（适配修正后接口，重置状态并初始化数据）
watchEffect(() => {
  if (!props.goods) return;
  // 重置选中状态，避免缓存影响
  selectedSpecs.value = {};
  // 初始化路径字典（传入修正后接口的skus数组）
  pathMap.value = getPathMap(props.goods.skus);
  // 初始化禁用状态（传入修正后接口的specs数组）
  initDisabledStatus(props.goods.specs, pathMap.value);
});
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 选中状态：基于自己维护的selectedSpecs，禁用状态：使用修正后接口的disabled -->
          <img
            :class="{
              selected: selectedSpecs[item.name] === val.name,
              disabled: val.disabled,
            }"
            @click="clickSpecs(item.name, val)"
            v-if="val.picture"
            :src="val.picture"
            :alt="val.name"
          />
          <span
            :class="{
              selected: selectedSpecs[item.name] === val.name,
              disabled: val.disabled,
            }"
            @click="clickSpecs(item.name, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
$xtxColor: #ff6700;

@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
