<template>
  <div class="create-order">
    <navbar>
      <template v-slot:default>订单预览</template>
    </navbar>

    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>{{ address.name }}</span>
        <span>{{ address.phone }}</span>
      </div>
      <div class="address">
        {{ address.province }} {{ address.city }} {{ address.county }}
        {{ address.address }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img"><img :src="item.goods.cover_url" alt="" /></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goods.title }}</span>
            <span>x{{ item.num }}</span>
          </div>
          <div class="good-btn">
            <div class="price">
              <small>¥</small> {{ item.goods.price + ".00" }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar
      class="submit-all"
      :price="total * 100"
      button-text="生成订单"
      @submit="handleCreateOrder"
    >
      商品金额
    </van-submit-bar>

    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    >
      <van-grid :border="false" :column-num="2">
        <van-grid-item>
          <p>支付宝二维码</p>
          <van-image width="150" height="150" :src="aliyun" />
        </van-grid-item>
        <van-grid-item>
          <p>微信二维码</p>
          <van-image width="150" height="150" :src="wechat" />
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import {
  getOrderPreview,
  createOrder,
  payOrder,
  payOrderStatus,
} from "../../network/oredr.js";
import { reactive, onMounted, toRefs, computed, ref } from "vue";
import Navbar from "../../components/common/navbar/Navbar.vue";
export default {
  name: "",
  setup() {
    let aacartList = ref();
    const router = useRouter(); // 跳转的路由
    const route = useRoute(); // 接收参数的路由
    const store = useStore();
    const state = reactive({
      // 生成一个订单号
      cartList: [],
      address: {},
      showPay: false,
      orderNo: "",
      aliyun: "",
      wechat: "",
    });
    const init = () => {
      // 轻提示
      Toast.loading({ message: "加载中...", forbidClick: true });

      getOrderPreview().then((res) => {
        let address = res.data.address.filter((n) => n.is_default == "1");

        if (address.length == 0) {
          state.address = {
            address: "还没有设置默认地址，请选择或填写地址信息",
          };
        } else {
          state.address = address[0];
        }

        state.cartList = res.data.carts;
        // 清除轻提示
        Toast.clear();
      });
    };

    onMounted(() => {
      init();
    });
    const goTo = () => {
      router.push({ path: "/address" });
    };
    const total = computed(() => {
      let sum1 = 0;
      state.cartList.forEach((item) => {
        sum1 += item.num * item.goods.price;
      });
      return sum1;
    });
    const handleCreateOrder = () => {
      const params = {
        address_id: state.address.id,
      };
      createOrder(params).then((res) => {
        store.dispatch("updateCart");
        state.showPay = true;
        state.orderNo = res.data.id;
        payOrder(state.orderNo, { type: "aliyun" }).then((res) => {
          console.log(res);
          state.aliyun = "https://api.shop.eduwork.cn" + res.data.qr_code_url;
          state.wechat = "https://api.shop.eduwork.cn" + res.data.qr_code_url;
        });
        //轮训查看
        const timer = setInterval(() => {
          payOrderStatus(state.orderNo).then((res) => {
            console.log(res);
            if (res.data == "1") {
              clearInterval(timer);
              router.push({
                path: "/orderdetail",
                query: { status: 2, id: state.orderNo },
              });
            }
          });
        }, 10000);
      });
    };
    const close = () => {
      router.push({ path: "/orderdetail", query: { id: state.orderNo } });
    };
    return {
      ...toRefs(state),
      goTo,
      aacartList,
      total,
      handleCreateOrder,
      close,
    };
  },
  data() {},
  //计算属性
  computed: {},
  //函数
  methods: {},
  //组件
  components: { Navbar },
};
</script>

<style lang="scss" scoped>
.create-order {
  background: #f9f9f9;
  .address-wrap {
    text-align: left;
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        width: 100px;
        height: 100px;
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
.submit-all {
  margin-bottom: 50px;
  z-index: 9 !important;
}
</style>