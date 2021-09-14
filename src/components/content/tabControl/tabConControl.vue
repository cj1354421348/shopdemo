<template>
<div class="tab-control">
    <div class="tab-control-item " @click="intemClick(index)" :class="{active:index==currentIndex}" v-for="(tile,index) in titles" :key="index" >
        <span>{{tile}}</span>
    </div>
</div>                      
</template>

<script>
import { ref } from '@vue/reactivity';

export default {
  name:'',
  setup(props,{emit}){
      let currentIndex = ref(0);
    const intemClick = (index)=>{
        currentIndex.value=index;
        emit('tabClick',index);
    };
    return{
            currentIndex,
            intemClick
        }
  },
    props:{
        titles:{
            type:Array,
            default(){
                return[];
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

<style scoped lang="scss">
    .tab-control{
        z-index: 10;
        display: flex;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        background-color: rgba($color: #eeeeee, $alpha: 1);;
        width: 100%;


        position: sticky;
        top: 44px;
        .tab-control-item{
            flex: 1;

        }
        .active{
            color: var(--color-tint);
            span{
            border-bottom: 3px;
        }
        }
        
    }
</style>
