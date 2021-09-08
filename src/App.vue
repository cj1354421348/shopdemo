<template>
  <div id="nav">
    <router-link class="tab-bar-item" to="/">
    <div class="icon"><i class="iconfont icon-shouye"></i></div>
    <div>首页</div>
    </router-link> 
    <router-link class="tab-bar-item" to="/categort">
    <div class="icon"><i class="iconfont icon-fenlei"></i></div>
    <div>分类</div>
    </router-link> 
    <router-link class="tab-bar-item" to="/shopcart">
    <div class="icon"><i class="iconfont icon-gouwuchekong"></i></div>
    <div>购物车</div>
    </router-link> 
    <router-link class="tab-bar-item" to="/profile">
    <div class="icon"><i class="iconfont icon-wode"></i></div>
    <div>我的</div>
    </router-link> 
  </div>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/css/base.css";
@import "./assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
background-color: #e0e0e0;
display: flex;
position: fixed;
left: 0;
right: 0;
bottom: 0;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--flont-size);
  }
  .tab-bar-item .icon{
    width: 24px;
    height: 24px ;
    margin: 3px;
    vertical-align: middle;
    display: inline-block;
  }

}
</style>
