import axios from "axios";
import router from "../router/index.js";
import store from "../store/index.js"

const reqest = axios.create({
    baseURL:'http://api.w0824.com',
    timeout:10000
})

//请求拦截器
reqest.interceptors.request.use(function(config){
    config.headers['If-Modified-Since'] = 0;  //告诉服务器，不要走缓存，请返回最新的资源
    console.log('请求拦截器');
    //请求的时候把token传给服务器进行校验
    if(store.state.token){
        config.headers['token'] = store.state.token
    }
    //设置请求超时时间
    config.tineout = 10000;
    return config
},function(error){
    console.log('请求错误');
    return Promise.reject(error)
}
)

//响应拦截器
reqest.interceptors.response.use(function(response){
    console.log('响应拦截器');
    let {status} = response.data
    if(status === 40001){
        //清除仓库的用户信息
        store.commit('clearInfo')
        router.push('/login')
        return
    }
    //开启响应加载进度条
    return response.data   //data 即要求响应后返回的数据
},function(error){
    console.log('响应错误');
    return Promise.reject(error)
}
)

export default reqest
