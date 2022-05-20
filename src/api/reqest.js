import axios from "axios";

const reqest = axios.create({
    baseURL:'http://api.w0824.com',
    timeout:10000
})

//请求拦截器
reqest.interceptors.request.use(function(config){
    console.log('请求拦截器');
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
    //开启响应加载进度条
    return response.data   //data 即要求响应后返回的数据
},function(error){
    console.log('响应错误');
    return Promise.reject(error)
}
)

export default reqest
