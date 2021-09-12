<template>
<navbar>
<template v-slot:default>商品详情{{id}}</template>
</navbar>
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar.vue';
import { useRoute } from 'vue-router';
import { ref } from '@vue/reactivity';
export default {
  name:'',
  setup(){
    const route = useRoute();
    let id =ref(0);
    id.value = route.query.id;
    return {
    id
   } 
  }
,
  data(){
   
  },
//计算属性
computed:{ 



    },
//函数
methods:{



},
//组件
  components: {
    Navbar


  },
}
</script>

<style scoped>

</style>
