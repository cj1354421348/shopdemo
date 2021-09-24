import { createStore } from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getter from "./getter"


const state = {
  user: {
    isLogin: window.localStorage.getItem("token") ? true : false,

  },
  cartCount: 0, // 购物车数量
}
export default createStore({
  state,
  mutations,
  actions,
  getter,
  modules: {
  }
})
