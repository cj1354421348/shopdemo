<template>
  <navbar>
    <template v-slot:default>图书兄弟</template>
  </navbar>
  <div class="banners">
    <img src="@/assets/images/1.png" alt="" />
  </div>
  <recommend :recommds="recommds"></recommend>
  <tabConControl
    @tabClick="tabClick"
    :titles="['畅销', '新书', '精选']"
  ></tabConControl>
  <goods-list :goods="showGoods"></goods-list>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import Recommend from "./childhome/recommend.vue";
import tabConControl from "@/components/content/tabControl/tabConControl";
import { getHomeAllData, getHomegoods } from "@/network/home";
import { onMounted, ref, reactive, computed } from "vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
export default {
  name: "Home",
  setup() {
    //
    const goods = reactive({
      sales: { page: 0, list: [] },
      new: { page: 0, list: [] },
      recommend: { page: 0, list: [] },
    });
    let temd = ref(0);
    const recommds = ref([]);
    onMounted(() => {
      getHomeAllData().then((res) => {
        recommds.value = res.data.goods.data;
      });
    });
    //切换列表
    const tabClick = (index) => {
      temd.value = index;
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];
    };
    getHomegoods("sales").then((res) => {

      goods.sales.list = res.data.goods.data;
    });
    getHomegoods("recommend").then((res) => {
      goods.recommend.list = res.data.goods.data;
    });
    getHomegoods("index").then((res) => {
      goods.new.list = res.data.goods.data;
    });
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
  },
};
</script>

<style scoped>
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}
</style>
 