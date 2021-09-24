import axios from "axios";
import router from '../router'
import { Notify, Toast } from "vant";
export function request(config){
    const instance = axios.create({
        baseURL: "https://api.shop.eduwork.cn/", // 根路径，网关统一入口路径
        timeout: 5000, // 请求超时时间，请求达到5秒，不让请求
      });
    //请求拦截
    instance.interceptors.request.use((config)=>{
        //设置认证
    const token = window.localStorage.getItem('token');
    if(token){
        config.headers.Authorization = 'Bearer ' + token;

    }
    return config
    },err=>{
    })
    instance.interceptors.response.use(res=>{
        return res
    },err=>{

       if(err.response.status=='401'){
            Toast.fail('先登录')
            router.push({path:'/login'})
        }
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
        //错误处理
        //授权处理
    })
    return instance(config);
}