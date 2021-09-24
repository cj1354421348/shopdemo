import store from './index';
const getter = {
    lockgett() {
        if (window.localStorage.getItem("token")==null) {
            console.log("已执行");
            store.state.user.isLogin=false
        }else{
            console.log("未执行");
            store.state.user.isLogin=true
        }
    }
}
export default getter;