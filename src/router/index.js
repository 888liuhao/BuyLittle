import Vue from 'vue';
import VueRouter from 'vue-router';
import store  from '../store/index.js'
//引入加载进度条js文件
import NProgress from "nprogress"

Vue.use(VueRouter)

//注册路由
const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:"/home/index"
        },
        {
            path:'/home',
            component:() => import ('../views/Index.vue'),
            children:[
                {
                    path:'index',
                    component:() => import ('../views/Home.vue'),
                    meta:{
                        name:"Home",
                        isShownav:true
                    },
                    children:[{
                        path:'search',
                        component:() => import ('../views/search.vue'),
                        meta:{
                        name:"search",
                        isShownav:true
                        },
                    }]
                },
                {
                    path:'shops',
                    component:() => import ('../views/shops.vue'),
                    meta:{
                        name:"shops",
                        title:"购物车",
                        Identity:true,
                        isShownav:false
                    }
                },
                {
                    path:'personalname',
                    component:() => import ('../views/personalname.vue'),
                    meta:{
                        name:"personalname",
                        Identity:true,
                        title:'个人中心',
                        isShownav:true
                    }
                },
            ]
        },
        {
            path:'/supermarket',
            component:() => import ('../views/supermarket.vue'),
            meta:{
                title:'买亿点超市'
            }
        },
        {
            path:'/newslist',
            component:() => import ('../views/Newslist.vue'),
            meta:{
                title:'新闻列表'
            }
        },
        {
            path:'/goodinfo/:id',
            component:() => import ('../views/goodInfo.vue'),
            props:true,
            meta:{
                title:'商品详情'
            }
        },
        {
            path:'/login',
            component:() => import ('../views/login.vue'),
            meta:{
                title:'登录',
                isShownav:true
            }
        },
        {
            path:'/newEnroll',
            component:() => import ('../views/newEnroll.vue'),
            meta:{
                title:'注册',
                isShownav:true
            }
        },
        {
            path:'/MyOrder',
            component:() => import ('../views/MyOrder.vue'),
            meta:{
                title:'收货地址',
                isShownav:false
            }
        },
        {
            path:'/MyAddress',
            component:() => import ('../views/MyAddress.vue'),
            meta:{
                title:'我的订单',
                isShownav:false
            }
        },
        {
            path:'/newAddress',
            component:() => import ('../views/newAddress.vue'),
            meta:{
                title:'新增地址',
                isShownav:false
            }
        },
        {
            path:'/editAddress/:addressInfo',
            component:() => import ('../views/editAddress.vue'),
            meta:{
                title:'编辑地址',
                isShownav:false
            }
        },
        {
            path:'/orderDetailsPage/:order_id',
            component:() => import ('../views/orderDetailsPage.vue'),
            meta:{
                title:'订单详情',
                isShownav:false
            }
        },
        {
            path:'/seResult/:seValue',
            component:() => import ('../views/seResult.vue'),
            meta:{
                title:'搜索详情',
                isShownav:true
            }
        },
    ]
})

//关闭进度条右边小圆圈
NProgress.configure({
    showSpinner: false,
});

//全局前守卫
router.beforeEach((to, from, next) => {
    // 开启网页加载进度条
    NProgress.start()
    //判断跳转的页面是否需要权限 - Identity
    if(to.meta.Identity){
        //如果需要权限则从vuex取出token进行效验
        if(store.state.token){
            next();
        }else{
            //没登录（无token）则跳转到登录页面进行登录
            next({path:'/login?redirect='+to.fullPath})
        }
    }
    next();
})
//全局后守卫
router.afterEach((to, from) => {
    NProgress.done()
    // 关闭网页加载进度条
})

export default router