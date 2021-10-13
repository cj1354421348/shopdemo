<template>
  <div>
    <navbar>
      <template v-slot:default>购物车</template>
    </navbar>

    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group
          ref="checkboxGroup"
          v-model="result"
          @change="groupChange"
        >
          <van-swipe-cell
            :right-width="50"
            :key="index"
            v-for="(item, index) in list"
          >
            <div class="good-item">
              <!--选中购物车中商品的ID-->
              <van-checkbox :name="item.id" />
              <div class="good-img">
                <img :src="item.goods.cover_url" />
              </div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <span>仅剩:{{ item.goods.stock }}</span>
                </div>
                <div class="good-btn">
                  <div class="price">
                    <small>￥</small>{{ item.goods.price + ".00" }}
                  </div>
                  <van-stepper
                    integer
                    :min="1"
                    :max="item.goods.stock"
                    :model-value="item.num"
                    :name="item.id"
                    async-change
                    @change="onChange"
                  />
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="deleteGood(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar
        class="submit-all"
        :price="total * 100"
        @submit="onSubmit"
        button-text="结算"
      >
        <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img
          class="empty-cart"
          src="../../assets/images/empty-car.png"
          alt="空购物车"
        />
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goTo"
          >前往选购</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import store from "../../store";
import {
  deleCart,
  getCart,
  checkedcart,
  modifyCart,
  addCart,
} from "../../network/cart";
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
  toRef,
} from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
import router from "../../router";

export default {
  name: "",
  setup() {
    const router1 = useRouter();
    const store = useStore();
    //数据模型
    const state = reactive({
      list: [],
      result: [], //id
      checkAll: false,
    });
    onMounted(() => {
      init();
    });

    const total = computed(() => {
      let sum1 = 0;
      state.list
        .filter((item) => state.result.includes(item.id))
        .forEach((item) => {
          sum1 += item.num * item.goods.price;
        });
      return sum1;
    });
    const init = () => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      getCart("include=goods").then((res) => {
        state.list = res.data.data;
        state.result = res.data.data
          .filter((n) => n.is_checked == 1)
          .map((item) => item.id);
        Toast.clear();
      });
    };
    const onChange = (value, detail) => {

      modifyCart(detail.name, { num: value }).then((res) => {
        //改变list的数量
        Toast.loading({ message: "请稍后...", forbidClick: true });

        state.list.forEach((ilte) => {
          if (ilte.id == detail.name) {
            ilte.num = value;
          }
        });
      });
    };
    const allCheck = () => {
      if (!state.checkAll) {
        state.result = [];

      } else {
        state.result = state.list.map((list) => list.id);

      }
    };
    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result;
      checkedcart({ cart_ids: result });
    };
    const goTo = () => {
      router1.go(-1);
    };
    const deleteGood = (id) => {
      deleCart(id).then((res) => {
        init(); //初始化
        store.dispatch("updateCart");
      });
    };
    const onSubmit = () => {
      if (state.result.length == 0) {
        Toast.fail("请选择商品");
        return;
      } else {
        router.push({ path: "/CreateOrder" });
      }
    };
    return {
      ...toRefs(state),
      goTo,
      onChange,
      groupChange,
      allCheck,
      deleteGood,
      total,
      onSubmit,
    };
  },
  data() {},
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
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          width: 100px;
          height: auto;
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
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 0px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: red;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: red;
    border-color: red;
  }
}
</style>
