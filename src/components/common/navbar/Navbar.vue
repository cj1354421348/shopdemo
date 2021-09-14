<template>
<div class="nav-bar">
<div class="left" @click="goback" ><slot name="left"><img src="@/assets/css/arrow-left.png"></slot></div>
<div class="center"><slot ></slot></div>
<div class="right"><slot name="right"></slot></div>


</div>

</template>

<script>
import { useRouter } from "vue-router";
export default {
  name:'Navbar',
  setup(){
    const router = useRouter();
    const goback =()=>{
      router.go(-1);
    }
    return{goback}
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



  },
}
</script>

<style scoped>
.nav-bar {
  z-index: 10;
  display: flex;
  background-color: var(--color-tint);
  color: rgb(255, 255, 255);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: 45px;
  line-height: 45px;
  text-align: center;

}
.left, .right{
  width: 60px; 
}
.center{ 
  flex: 1;
}

</style>
