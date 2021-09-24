import { getCart } from "../network/cart";
const actions = {
    updateCart({ commit }) {
        getCart().then(res => {
            // 如果提交成功，   
            commit('addCart', { count: res.data.data.length || 0 })
        })
    }

}
export default actions;