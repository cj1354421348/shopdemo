<template>
  <div>
    <navbar>
      <template v-slot:default>地址管理</template>
    </navbar>
    <div
      v-show="list.length == 0"
      style="margin-top: 200px; text-align: center"
    >
      还没有地址信息，去添加吧！
    </div>
    <div class="address-item" style="margin-top: 45px;">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import Navbar from "../../components/common/navbar/Navbar.vue";
import { getAddressList } from "../../network/address";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      chosenAddressId: "1",
      list: [],
    });


    onMounted(()=>{
        getAddressList().then(res=>{
          if(res.data.data.length==0){
              state.list=[]
              return
          }
          state.list=res.data.data.map(item=>{
          return {
            // 过滤数据
            id: item.id,
            name: item.name,
            tel: item.phone,
            // 省市县地址信息保存到一个变量address中
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            // 判断是否为默认地址
            isDefault: !!item.is_default,
          };

          })
        })
    })
    const onAdd = () => {
      router.push({ path: "/addressedit", query: { type: "add" } });
    };

    const onEdit = (item) => {
      router.push({
        path: "/addressedit",
        query: { type: "edit", addressId: item.id },
      });
    };
    return {
      ...toRefs(state),
      onAdd,
      onEdit,

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
  components: {
    Navbar,
  },
};
</script>


<style lang="scss" >
.address-box {
  height: 300px;
  .van-radio__icon {
    display: none;
  }
  .address-item {
    margin-top: 45px;

  }
}
.van-address-list__bottom {
  bottom: 100px !important;
}
</style>
