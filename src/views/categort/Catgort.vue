<template>
  <navbar>
    <template v-slot:default>商品分类</template>
  </navbar>

  <div id="mainbox">
    <div class="ordertab">
      <van-tabs v-model="active" @click="tabClick">
        <van-tab title="销量"></van-tab>
        <van-tab title="价格"></van-tab>
        <van-tab title="评论"></van-tab>
      </van-tabs>
    </div>
    <div class="leftmenu">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item
          v-for="item in caetgorylest"
          :key="item.id"
          :title="item.name"
          :name="item.name"
        >
          <van-sidebar v-model="activeKey" accordion>
            <van-sidebar-item
              v-for="sub in item.children"
              :key="sub.id"
              :title="sub.name"
              @click="GetGoods(sub.id)"
            /> </van-sidebar
        ></van-collapse-item>
      </van-collapse>
    </div>
    <div class="goodslist" id="asd" ref="myRef">
      <div class="content">
        <van-card
          @click="itemClick(item.id)"
          v-for="item in showGoods"
          :key="item.id"
          :num="item.comments_count"
          :price="item.price"
          :desc="item.updata_at"
          :title="item.title"
          :thumb="item.cover_url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { caetgory, caetgorygoods } from "../../network/caetgory";
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from "vue";
import BScroll from "better-scroll";
import { useRouter } from "vue-router";
export default {
  name: "Catgort",
  setup() {
    const myRef = ref(null);
    let activeKey = ref(0);
    const router = useRouter();
    let activeName = ref(1);
    let active = ref(1);
    let bscroll = reactive({}); //  4-2 声明 bscroll 对象
    let caetgorylest = ref([]);
    let currentO = ref("sales");
    let currentCid = ref(0);
    //数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    const showGoods = computed(() => {
      return goods[currentO.value].list;
    });
    onMounted(() => {
      console.dir(myRef.value);
      console.log(document.querySelector("#asd"));
      caetgory().then((res) => {
        caetgorylest.value = res.data.categories;
      });
      init();

      bscroll = new BScroll(myRef.value, {
        // 获取到最外层元素
        probeType: 3, // 0,1,2,3, 3 只要在运行就触发 scroll 事件
        click: true, // 是否允许点击
        pullUpLoad: true, // 上拉加载更多，默认 false
      });
    });
    const tabClick = (index) => {
      let orders = ["sales", "price", "comments_count"];
      currentO.value = orders[index];
      caetgorygoods(currentO.value, currentCid.value).then((res) => {
        goods[currentO.value].list = res.data.goods.data;
      });
    };
    const init = () => {
      caetgorygoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.data.goods.data;
      });
      caetgorygoods("price", currentCid.value).then((res) => {
        goods.price.list = res.data.goods.data;
      });
      caetgorygoods("comments_count", currentCid.value).then((res) => {
        goods.comments_count.list = res.data.goods.data;
      });
    };
    const GetGoods = (id) => {
      currentCid.value = id;
      init();
    };

    return {
      activeKey,
      caetgorylest,
      tabClick,
      activeName,
      active,
      currentO,
      currentCid,
      GetGoods,
      showGoods,
      bscroll,
      myRef,
      itemClick: (id) => {
        router.push({ path: "/detail", query: { id } });
      },
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

<style scoped lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;
  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
  }
  .ordertab {
    flex: 1; // 占一份
    float: right;
    height: 50px;
    z-index: 9;
    position: fixed; // 固定定位
    top: 45px;
    right: 0;
    left: 130px;
  }

  .goodslist {
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left !important;
    overflow: hidden;
  }
  .van-card__thumb {
    width: 68px;
  }
}
</style>
