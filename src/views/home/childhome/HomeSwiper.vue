<template>
  <van-button type="danger">危险按钮</van-button>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="item.id"
      ><img :src="item.img_url"
    /></van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "",
  props: {
    banners: {
      typle: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  //计算属性
  computed: {},
  //函数
  methods: {},
  //组件
  components: {},
};
</script>

<style scoped>
img{
  height: 300px;
}
</style>
