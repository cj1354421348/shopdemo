<template>
  <div id="home">
    <navbar>
      <template v-slot:default>图书兄弟</template>
    </navbar>
    <tabConControl
      v-show="isTabFixed"
      @tabClick="tabClick"
      :titles="['畅销', '新书', '精选']"
    >
    </tabConControl>
    <div class="weapper">
      <div class="contens">
        <div ref="banref">
          <home-swiper :banners="banners" >
          </home-swiper>
          <recommend :recommds="recommds"></recommend>
        </div>
        <tabConControl @tabClick="tabClick" :titles="['畅销', '新书', '精选']">
        </tabConControl>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <backtop @bTop="bTop" v-show="isTabFixed"> </backtop>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import BetterScroll from "better-scroll";
import Recommend from "./childhome/recommend.vue";
import tabConControl from "@/components/content/tabControl/tabConControl";
import { getHomeAllData, getHomegoods } from "@/network/home";
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from "vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import BScroll from "better-scroll";
import Backtop from "../../components/common/backtop/backtop.vue";
import HomeSwiper from "./childhome/HomeSwiper.vue";
export default {
  name: "Home",
  setup() {
    let banners = ref([]);
    let betterScroll = reactive({});
    let isTabFixed = ref(false);
    let banref = ref(null);
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
    });
    let temd = ref(0);
    const recommds = ref([]);

    watchEffect(() => {
      nextTick(() => {
        // nextTick 方法，当 DOM 渲染完了执行方法
        // 重新计算高度
        betterScroll.finishPullUp();
        betterScroll && betterScroll.refresh();
      });
    });
    
    onMounted(() => {
      getHomeAllData().then((res) => {
        recommds.value = res.data.goods.data;
        banners.value = res.data.slides;
      });
      getHomegoods("sales").then((res) => {
        goods.sales.list = res.data.goods.data;
      });
      getHomegoods("recommend").then((res) => {
        goods.recommend.list = res.data.goods.data;
      });
      getHomegoods("index").then((res) => {
        goods.new.list = res.data.goods.data;
      });
      //
      betterScroll = new BetterScroll(document.querySelector(".weapper"), {
        probeType: 3,
        click: true,
        pullUpLoad: true,
      });
      betterScroll.on("scroll", (position) => {
        //console.log(-(position.y))
        console.log(banref.value.offsetHeight)
        isTabFixed.value = -position.y > banref.value.offsetHeight;
      });
      betterScroll.on("pullingUp", () => {
        const page = goods[currentType.value].page + 1;
        getHomegoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.data.goods.data);
          goods[currentType.value].page += 1;
        });
        //console.log("类型" + currentType.value + "页面" + page);
        betterScroll.finishPullUp();
        betterScroll.refresh();
      });
    });
    //切换列表
    const tabClick = (index) => {
      temd.value = index;
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];
      nextTick(() => {
        // nextTick 方法，当 DOM 渲染完了执行方法
        // 重新计算高度
        betterScroll.finishPullUp();
        betterScroll && betterScroll.refresh();
      });
    };
    const bTop = () => {
      betterScroll.scrollTo(0, 0, 500);
    };

    //显示列表
    let currentType = ref("sales");
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });
    return {
      recommds,
      temd,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      banref,
      bTop,
      banners,
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
    Recommend,
    tabConControl,
    GoodsList,
    Backtop,
    HomeSwiper,
  },
};
</script>

<style scoped>
.banners img {
  width: 100%;
  height: auto;
}
#home {
  height: 100vh;
  position: relative;
}
.weapper {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: hidden;
}
</style>
 