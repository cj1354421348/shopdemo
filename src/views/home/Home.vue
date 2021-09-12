<template>
<navbar>
<template v-slot:default>图书兄弟</template>
</navbar>
<div class="banners">
<img  src="@/assets/images/1.png" alt="">

</div>
<recommend :recommds="recommds"></recommend>
<tabConControl @tabClick="tabClick" :titles="['畅销','新书','精选']"></tabConControl>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  {{temd}} <br>
  
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar.vue';
import Recommend from './childhome/recommend.vue';
import tabConControl from "@/components/content/tabControl/tabConControl";
import{getHomeAllData} from "@/network/home";
import{onMounted,ref,reactive} from 'vue';
export default {

  name:'Home',
  setup(){
    let temd = ref(0)
    const recommds= ref([])
    onMounted(()=>{
      getHomeAllData().then(res=>{
       recommds.value =res.data.goods.data
      })
    })
   const tabClick = (index)=>{
     temd.value = index;
     //console.log(index)
   }
    return{
      recommds,
      temd,
      tabClick,
    }
  },
  data(){
   return {

   }
  },
//计算属性
computed:{ 



    },
//函数
methods:{



},
//组件
  components: {
    Navbar,
    Recommend,
    tabConControl

  },
}
</script>

<style scoped>
.banners img{
  width: 100%;
  height: auto;
  margin-top: 45px;
}

</style>
 