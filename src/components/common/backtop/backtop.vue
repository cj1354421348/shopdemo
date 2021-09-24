<template>
<div class="backtop" @click="backtop">

</div>

</template>

<script>
export default {
  name:'',
    setup(props,{emit}){
        return{
            backtop:()=>{
                emit('bTop')
            }
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



  },
}
</script>

<style scoped>
.backtop{
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 80px;
    right: 10px;
    background:url("../../../assets/images/UP.png") no-repeat center center;
}

</style>
