<template>
  <div class="order-detail-box">
    <Navbar class="nav-bar">
      <template v-slot:default> 订单详情 </template>
    </Navbar>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ statusString }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.order_no }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.created_at }}</span>
      </div>

      <van-button
        v-if="detail.status == 1"
        @click="showPayFn"
        style="margin-bottom: 10px"
        color="#1baeae"
        block
        >去支付</van-button
      >
      <van-button v-if="detail.status == 1" @click="handleConfirmOrder" block
        >确认收货</van-button
      >
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ total + ".00" }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>

    <van-card
      v-for="item in detail.orderDetails.data"
      :key="item.id"
      :num="item.num"
      :price="item.price + '.00'"
      desc="全场包邮"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
    />

    <div style="width: 100%; height: 50px"></div>

    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    >
      <div
        style="
          width: 100%;
          height: 50px;
          margin-left: '200px';
          text-align: center;
          display: flex;
          justify-content: center;
        "
      >
        <van-grid :border="false" :column-num="2">
          <van-grid-item text="支付宝">
            <p>支付宝二维码</p>
            <van-image width="150" height="150" :src="aliyun" />
          </van-grid-item>
          <van-grid-item text="微信支付">
            <p>微信二维码</p>
            <van-image width="150" height="150" :src="wechat" />
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Dialog, Toast } from "vant";
import {
  getOrderPreview,
  createOrder,
  payOrder,
  payOrderStatus,
  getOrderDetail,
  confirmOrder,
} from "../../network/oredr.js";
import { reactive, onMounted, toRefs, computed, ref } from "vue";
import Navbar from "../../components/common/navbar/Navbar.vue";
export default {
  name: "",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      orderNo: "", // 订单ID
      detail: {
        // 订单详情
        orderDetails: {
          data: [],
        },
        status: 0, // 初始状态为0
      },
      showPay: false,
      aliyun: "",
      wechat: "",
    });
    const init = () => {
      const { id } = route.query;
      state.orderNo = id;
      getOrderDetail(id).then((res) => {
        state.detail = res.data;
      });
    };
    onMounted(() => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      init();
      Toast.clear();
    });
    const statusString = computed(() => {
      let status = ["", "已下单", "已支付", "等待发货", "确认收货", "已过期"];
      return status[state.detail.status];
    });
    const total = computed(() => {
      let sum = 0;
      state.detail.orderDetails.data.forEach((item) => {
        sum += item.num * item.price;
      });

      return sum;
    });
    const showPayFn = () => {
      state.showPay = true;
      payOrder(state.orderNo, { type: "aliyun" }).then((res) => {
        console.log(res);
        state.aliyun = "https://api.shop.eduwork.cn" + res.data.qr_code_url;
        state.wechat = "https://api.shop.eduwork.cn" + res.data.qr_code_url;
      });
      const timer = setInterval(() => {
        payOrderStatus(state.orderNo).then((res) => {
          console.log(res);
          if (res.data == "1") {
            clearInterval(timer);
            state.showPay = false;
            router.push({
              path: "/orderdetail",
              query: { status: 2, id: state.orderNo },
            });
          }
        });
      }, 10000);
    };
    const handleConfirmOrder = () => {
      Dialog.confirm({
        title: "是否确认收货",
      }).then(()=>{
        confirmOrder(state.orderNo).then((res)=>{
        console.log(res);
        })
      })
    };
    const close1 = () => {
      Dialog.close();
    };
    return {
      ...toRefs(state),
      statusString,
      total,
      showPayFn,
      handleConfirmOrder,
      close1,
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

<style lang="scss" scoped>
.order-detail-box {
  text-align: left;
  background: #f7f7f7;
  .order-status {
    background: #fff;
    margin-top: 44px;
    padding: 20px;
    font-size: 15px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 15px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .van-card {
    margin-top: 0;
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

