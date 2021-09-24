const mutations = {
    setislongin(state, payload) {
        state.user.isLogin = payload;
    },
    addCart(state, payload) {
        // 传递一个数量count
        state.cartCount = payload.count
    }
}
export default mutations;