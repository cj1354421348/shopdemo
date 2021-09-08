import axios from "axios";
export function request(config){
    const instance = axios.create({
        baseURL: "https://api.shop.eduwork.cn/", // 根路径，网关统一入口路径
        timeout: 5000, // 请求超时时间，请求达到5秒，不让请求
      });
    //请求拦截
    instance.interceptors.request.use((config)=>{
        //设置认证
    
    return config
    },err=>{
    })
    instance.interceptors.response.use(res=>{
        return res
    },err=>{
        //错误处理
        //授权处理
    })
    return instance(config);
}