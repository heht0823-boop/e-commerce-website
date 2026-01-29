<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  getAddressList,
  addAddress,
  updateAddress,
  deleteAddressApi,
  setDefaultAddress,
} from "@/apis/mock/user";
import type { AddressItem, AddressFormData } from "@/types/mock/user";

const dialogVisible = ref(false);
const addressForm = ref<AddressFormData>({
  receiver: "",
  contact: "",
  province: "",
  city: "",
  county: "",
  address: "",
  isDefault: false,
  postalCode: "",
});

const addressList = ref<AddressItem[]>([]);
const editingId = ref<string | null>(null);

// 省市区数据
const provinces = ["北京市", "上海市", "广东省", "浙江省", "江苏省", "四川省", "湖北省", "陕西省"];
const cities: Record<string, string[]> = {
  北京市: ["北京市"],
  上海市: ["上海市"],
  广东省: ["广州市", "深圳市", "东莞市", "佛山市"],
  浙江省: ["杭州市", "宁波市", "温州市", "嘉兴市"],
  江苏省: ["南京市", "苏州市", "无锡市", "常州市"],
  四川省: ["成都市", "绵阳市", "德阳市", "乐山市"],
  湖北省: ["武汉市", "宜昌市", "襄阳市", "十堰市"],
  陕西省: ["西安市", "宝鸡市", "咸阳市", "渭南市"],
};

const counties: Record<string, string[]> = {
  北京市: ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区"],
  上海市: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区"],
  广州市: ["越秀区", "荔湾区", "海珠区", "天河区", "白云区", "黄埔区"],
  深圳市: ["罗湖区", "福田区", "南山区", "宝安区", "龙岗区", "盐田区"],
  杭州市: ["上城区", "拱墅区", "西湖区", "滨江区", "萧山区", "余杭区"],
};

// 获取城市列表
const getCities = computed(() => {
  return addressForm.value.province ? cities[addressForm.value.province] || [] : [];
});

// 获取区县列表
const getCounties = computed(() => {
  if (addressForm.value.province && addressForm.value.city) {
    return counties[addressForm.value.city] || [];
  }
  return [];
});

const loadAddresses = async () => {
  try {
    const res = await getAddressList();
    addressList.value = res?.data?.result || [];
  } catch (error) {
    console.error("获取地址列表失败:", error);
  }
};

const openAddDialog = () => {
  editingId.value = null;
  addressForm.value = {
    receiver: "",
    contact: "",
    province: "",
    city: "",
    county: "",
    address: "",
    isDefault: false,
    postalCode: "",
  };
  dialogVisible.value = true;
};

const openEditDialog = (address: AddressItem) => {
  editingId.value = address.id;
  addressForm.value = { ...address };
  dialogVisible.value = true;
};
const saveAddress = async () => {
  try {
    if (editingId.value) {
      // 更新地址
      await updateAddress(editingId.value, addressForm.value);
      ElMessage.success("地址更新成功");
    } else {
      // 添加地址
      await addAddress(addressForm.value);
      ElMessage.success("地址添加成功");
    }

    dialogVisible.value = false;
    await loadAddresses(); // 重新加载地址列表

    // 如果设为默认地址，更新其他地址的状态
    if (addressForm.value.isDefault && !editingId.value) {
      await loadAddresses();
    }
  } catch (error) {
    ElMessage.error("操作失败");
  }
};

const deleteAddress = async (id: string) => {
  try {
    await ElMessageBox.confirm("确定要删除这个地址吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    await deleteAddressApi(id);
    ElMessage.success("地址删除成功");
    await loadAddresses(); // 重新加载地址列表
  } catch {
    // 用户取消操作
  }
};

const setDefault = async (id: string) => {
  try {
    await setDefaultAddress(id);
    ElMessage.success("默认地址设置成功");
    await loadAddresses(); // 重新加载地址列表
  } catch (error) {
    ElMessage.error("设置失败");
  }
};

onMounted(() => {
  loadAddresses();
});
</script>
<template>
  <div class="address-container">
    <div class="address-header">
      <h3>收货地址管理</h3>
      <el-button type="primary" :icon="Plus" @click="openAddDialog">新增地址</el-button>
    </div>

    <div class="address-list">
      <div
        v-for="address in addressList"
        :key="address.id"
        class="address-item"
        :class="{ 'is-default': address.isDefault }"
      >
        <div class="address-content">
          <div class="address-info">
            <div class="receiver-info">
              <span class="receiver">{{ address.receiver }}</span>
              <span class="contact">{{ address.contact }}</span>
            </div>
            <div class="address-detail">
              <span v-if="address.isDefault" class="default-tag">默认</span>
              {{ address.province }} {{ address.city }} {{ address.county }} {{ address.address }}
            </div>
          </div>
          <div class="address-actions">
            <el-button
              v-if="!address.isDefault"
              type="primary"
              link
              @click="setDefault(address.id)"
            >
              设为默认
            </el-button>
            <el-button type="primary" link @click="openEditDialog(address)">编辑</el-button>
            <el-button type="danger" link @click="deleteAddress(address.id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 地址编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑地址' : '新增地址'" width="600px">
      <el-form :model="addressForm" label-width="100px">
        <el-form-item label="收货人">
          <el-input v-model="addressForm.receiver" placeholder="请输入收货人姓名" />
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="addressForm.contact" placeholder="请输入联系电话" />
        </el-form-item>

        <el-form-item label="所在地区">
          <el-col :span="8">
            <el-select v-model="addressForm.province" placeholder="请选择省份">
              <el-option v-for="prov in provinces" :key="prov" :label="prov" :value="prov" />
            </el-select>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-select
              v-model="addressForm.city"
              placeholder="请选择城市"
              :disabled="!addressForm.province"
            >
              <el-option v-for="city in getCities" :key="city" :label="city" :value="city" />
            </el-select>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-select
              v-model="addressForm.county"
              placeholder="请选择区县"
              :disabled="!addressForm.city"
            >
              <el-option
                v-for="county in getCounties"
                :key="county"
                :label="county"
                :value="county"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="详细地址">
          <el-input v-model="addressForm.address" type="textarea" placeholder="请输入详细地址" />
        </el-form-item>

        <el-form-item label="邮政编码">
          <el-input v-model="addressForm.postalCode" placeholder="请输入邮政编码" />
        </el-form-item>

        <el-form-item label="设为默认">
          <el-switch v-model="addressForm.isDefault" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAddress">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.address-container {
  padding: 20px;

  .address-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .address-list {
    .address-item {
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 15px;

      &.is-default {
        border-color: $xtxColor;
        background-color: #f8fff9;

        .default-tag {
          background-color: $xtxColor;
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          margin-right: 10px;
        }
      }

      .address-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .address-info {
          flex: 1;

          .receiver-info {
            margin-bottom: 8px;

            .receiver {
              font-size: 16px;
              font-weight: 600;
              margin-right: 20px;
            }

            .contact {
              color: #666;
            }
          }

          .address-detail {
            color: #666;
            font-size: 14px;
          }
        }

        .address-actions {
          .el-button + .el-button {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
