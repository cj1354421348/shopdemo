<template>

</template>

<script>
import{onMounted} from 'vue';
import{getHomeAllData} from "../network/home"
export default {
  name:'Home',
  setup(){
    onMounted(()=>{
      getHomeAllData().then(res=>{
        console.log(res);
      }).catch(err=>{
        
      })
    });
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

</style>
