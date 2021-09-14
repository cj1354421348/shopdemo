<template lang="">
    <div class="good-ltem"> 
    <img :src ='product.cover_url' >
    <div class='good-info'>
        <p>{{product.title}}</p>
        <span class="price"><small>￥</small>{{product.price}}</span>
        <span class="collect">{{product.collects_count}}</span>
    </div>
    </div>
</template>
<script>
export default {
    name:"",
    props:{
        product:{
            typle:Object,
            default(){
                return{}
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .good-ltem{
        z-index: 6;
        width: 46%;
        padding-bottom: 40px;
        position: relative;
        img{
            width: 100%;
            border-radius: 5px;
        }
        .good-info{
            font-size: 12px;
            position:absolute;
            left: 0;
            right: 0;
            p{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: onwrap;

            }
            .price{
                color: red;
                margin-right: 20px;

            }
            .collect{
                position: relative;
            }
            .collect::before{
                content: '';
                position: absolute;
                left: -15px;
                width: 14px;
                height: 14px;
                background:url('../../../assets/images/收藏.png') 0 0/14px 14px;
            }
        }
    }
</style>