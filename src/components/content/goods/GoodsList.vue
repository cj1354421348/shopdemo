<template lang="">
    <div class="goods">
        <GoodListitem v-for="item in goods" :product= 'item' :key="item.id"></GoodListitem>
    </div>
</template>
<script>
import { onUpdated } from 'vue';
import GoodListitem from "./GoodListitem";
export default {
    setup(props){
        onUpdated(()=>{
             //console.log(props.goods)
        });
    },
    props:{
        goods:{
            type:Array,
            default(){
                return[]
            }
        }
    },
  components: {
    GoodListitem,
  },
};
</script>
<style lang="scss" scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    z-index: 5;
}
</style>