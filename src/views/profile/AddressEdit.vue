<template>
  <div class="address-edit-box">
    <navbar>
      <template v-slot:default>{{ title }}</template>
    </navbar>

    <van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import Navbar from "../../components/common/navbar/Navbar.vue";
import {
  addAddress,
  EditAddress,
  DeleteAddress,
  getAddressDetail,
} from "../../network/address";
import { reactive, onMounted, toRefs, computed } from "vue";
import { Toast } from "vant";

import { tdist } from "../../utils/address";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      searchResult: [],
      addressInfo: {},
      type: "add",
      addressId: "",
      title: "",
    });
    const onDelete = () => {
      const { type, addressId } = route.query;
      DeleteAddress(addressId).then((res) => {});
    };
    const onSave = (content) => {
      const params = {
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: content.isDefault ? 1 : 0, // 判断是否为默认地址
      };
      if (state.type == "edit") {
        EditAddress(state.addressId, params).then((res) => {
          if (res.status == "201") {
            Toast("更改成功");
          }
        });
      } else if (state.type == "add") {
        addAddress(params).then((res) => {
          if (res.status == "201") {
            Toast("添加成功");
          }
        });
      }
    };

    onMounted(() => {
      const { type, addressId } = route.query;
      state.type = type;
      state.addressId = addressId;
      if (type == "edit") {
        getAddressDetail(addressId).then((res) => {
          console.log(res);
          const addressDetail = res.data;
          let _areaCode = (state.addressInfo = {
            name: addressDetail.name,
            tel: addressDetail.phone,
            province: addressDetail.province,
            city: addressDetail.city,
            county: addressDetail.county,
            //areaCode: _areaCode, //区域码
            addressDetail: addressDetail.address,
            isDefault: !!addressDetail.is_default,
          });
        });
      }
    });
    const title = computed(() => {
      return state.type == "add" ? "新增地址" : "编辑地址";
    });

    return {
      ...toRefs(state),
      areaList,
      onSave,
      title,
      onDelete,
    };
  },

  data() {
    return {};
  },
  //计算属性
  computed: {},
  //函数
  methods: {},
  //组件
  components: { Navbar },
};
</script>

<style scoped lang="scss">
.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
}
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
    .van-button--danger {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
    .van-switch--on {
      background: var(--color-tint);
    }
  }
}
</style>
