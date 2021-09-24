<template>
  <div>
    <navbar>
      <template v-slot:default>商品详情{{ id }}</template>
    </navbar>
    <van-image width="100%" :src="detail.cover_url" />

    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="handeladdcart">加入购物车</van-button>
        <van-button size="mini" @click="gotocart">立即购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model="active">
      <van-tab title="概述">
        <div id="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div v-for="(item, index) in book.detail.comments" :key="index">
          {{ item.content }}
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"> </goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { getDetailAllData } from "../../network/detail";
import { reactive, toRefs } from "vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import { addCart } from "../../network/cart";
import { useStore } from "vuex";

export default {
  name: "",
  setup() {
    let active = ref(1);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let id = ref(0);
    let book = reactive({
      detail: {},
      like_goods: [],
      comments: [],
    });

    onMounted(() => {
      id.value = route.query.id;
      getDetailAllData(id.value).then((res) => {
        book.detail = res.data.goods;
        book.like_goods = res.data.like_goods;
        console.log(book.detail.comments);
      });
    });
    //添加购物车
    const handeladdcart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status == "204" || res.status == "201") {
          store.dispatch("updateCart");
        }
      });
    };
    const gotocart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status == "204" || res.status == "201") {
          store.dispatch("updateCart");
          router.push({ path: "/shopcart" });
        }
      });
    };

    return {
      id,
      book,
      active,
      ...toRefs(book),
      handeladdcart,
      gotocart,
      addCart,
    };
  },
  //组件
  components: {
    Navbar,
    GoodsList,
  },
};
</script>

<style lang="scss">
#content {
  padding: 10px;
  img {
    max-width: 100%;
  }
}
</style>
