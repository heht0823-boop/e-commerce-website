<template>
  <div class="search-bar">
    <input
      v-model="keyword"
      @input="onInput"
      @focus="showPanel = true"
      @blur="onBlur"
      @keydown.enter="handleEnter(keyword)"
      placeholder="搜索商品名称/分类"
      class="search-input"
    />
    <ul v-if="showPanel && keyword && searchResults.length" class="search-suggest">
      <li
        v-for="item in searchResults"
        :key="item.id"
        v-html="highlight(item.name)"
        @mousedown.prevent="selectKeyword(item.name)"
      ></li>
    </ul>
    <div v-if="showPanel && !keyword && searchHistory.length" class="search-history">
      <div class="history-title">
        搜索历史
        <span class="clear" @mousedown.prevent="clearHistory">清空</span>
      </div>
      <ul>
        <li v-for="h in searchHistory" :key="h" @mousedown.prevent="selectKeyword(h)">
          {{ h }}
          <span class="delete" @mousedown.prevent.stop="removeHistory(h)">×</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getGoodsAPI } from "@/apis/home";
import { useRouter } from "vue-router";
import { debounce } from "@/composables/debounce/debounce";
import { getDetail } from "@/apis/detail";
import { ElMessage } from "element-plus";
import type { HomeGoodsResponse, NewResponse } from "@/types/home";
interface SearchHistory {
  id: string;
  name: string;
  other: string;
  type: string;
}
const keyword = ref<string>("");
const allGoods = ref<HomeGoodsResponse>([]);
const searchResults = ref<SearchHistory[]>([]);
const searchHistory = ref<string[]>([]);
const showPanel = ref(false);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await getGoodsAPI();
    allGoods.value = res.data.result || [];
    searchHistory.value = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  } catch (err) {
    ElMessage.error("初始化搜索功能失败");
  }
});

const onInput = debounce(() => {
  if (!keyword.value) {
    searchResults.value = [];
    return;
  }
  handleSearch();
}, 300);

function handleSearch() {
  const kw = keyword.value.trim();
  if (!kw) {
    searchResults.value = [];
    return;
  }
  //分三层处理allGoods.value,allGoods.value->childrens/goods
  allGoods.value.forEach((item) => {
    if (item.name.includes(kw) || item.saleInfo.includes(kw)) {
      searchResults.value.push({
        id: item.id,
        name: item.name,
        other: item.saleInfo,
        type: "category",
      });
    }
  });
  if (searchResults.value.length === 0) {
    allGoods.value.forEach((item) => {
      item.children.forEach((item) => {
        if (item.name.includes(kw)) {
          searchResults.value.push({
            id: item.id,
            name: item.name,
            other: "",
            type: "children",
          });
        }
      });
    });
  }
  if (searchResults.value.length === 0) {
    allGoods.value.forEach((item) => {
      item.goods.forEach((item) => {
        if (item.name.includes(kw) || item.desc.includes(kw)) {
          searchResults.value.push({
            id: item.id,
            name: item.name,
            other: item.desc,
            type: "goods",
          });
        }
      });
    });
  }
  addHistory(kw);
}

function addHistory(kw: string) {
  if (!kw) return;
  const idx = searchHistory.value.indexOf(kw);
  if (idx !== -1) searchHistory.value.splice(idx, 1);
  searchHistory.value.unshift(kw);
  if (searchHistory.value.length > 10) searchHistory.value.pop();
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
}
function handleEnter(kw: string) {
  keyword.value = kw;
  handleSearch();
  searchResults.value.forEach(async (item) => {
    if (item.name.includes(kw) || item.other.includes(kw)) {
      try {
        const res = await getDetail(item.id);
        if (res.data) {
          router.push({
            name: "Detail",
            params: {
              id: item.id,
            },
          });
        } else {
          ElMessage.error("暂时没有该商品详情");
        }
      } catch (err) {
        ElMessage.error("获取商品详情失败");
      }
    }
  });
}
function selectKeyword(kw: string) {
  keyword.value = kw;
  handleSearch();
  showPanel.value = false;
}

function removeHistory(kw: string) {
  const idx = searchHistory.value.indexOf(kw);
  if (idx !== -1) searchHistory.value.splice(idx, 1);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
}

function clearHistory() {
  searchHistory.value = [];
  localStorage.removeItem("searchHistory");
}

function highlight(str: string) {
  if (!keyword.value) return str;
  return str.replace(
    new RegExp(keyword.value, "gi"),
    (match) => `<span style="color:red">${match}</span>`,
  );
}

function onBlur() {
  // 延迟隐藏，避免点击建议/历史时丢失焦点
  setTimeout(() => (showPanel.value = false), 200);
}
console.log(searchResults.value);
</script>

<style scoped>
.search-bar {
  position: relative;
  width: 260px;
  margin-left: 20px;
}
.search-input {
  width: 100%;
  height: 36px;
  border: 1px solid #eee;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  outline: none;
}
.search-suggest,
.search-history ul {
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  border-top: none;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0;
  padding: 0;
  list-style: none;
}
.search-suggest li,
.search-history ul li {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}
.search-suggest li:hover,
.search-history ul li:hover {
  background: #f5f5f5;
}
.search-history {
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  border-top: none;
  z-index: 10;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.history-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 0 16px;
  font-size: 13px;
  color: #888;
}
.clear {
  color: #f56c6c;
  cursor: pointer;
  font-size: 12px;
}
.delete {
  float: right;
  color: #bbb;
  margin-left: 8px;
  cursor: pointer;
}
</style>
