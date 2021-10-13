<template>
<div class="recommend">
<div class="recommd-item" v-for="item in recommds.slice(0,4) " :key="item.id">
    <a href="" @click.prevent="goD(item.id)">
        <img :src="item.cover_url" alt="">
        <div>{{item.title}}</div>
    </a>
</div>

</div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name:'',
  setup(){
      const router = useRouter();
      const goD = (id)=>{
          router.push({path:"/detail",query:{id}});
      };
      return{
          goD
      }
  },
  props:{
      recommds:{
          tpye:Array,
          default(){
              return [];
          }
      },

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

<style scoped lang="scss">
.recommend{
    display: flex;
    width: 100%;
    padding: 15px 0 30px;
    border-bottom:  8px solid #eee;
    font-size: 12px;

}
.recommd-item{
    flex: 1;
    img{
        width:70px ;
        height: 70px;
        margin-bottom: 8px;
    }
}
</style>
