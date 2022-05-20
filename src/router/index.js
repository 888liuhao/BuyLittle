import Vue from 'vue';
import VueRouter from 'vue-router';
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
                    }
                },
                {
                    path:'shops',
                    component:() => import ('../views/shops.vue'),
                    meta:{
                        name:"shops",
                        title:"购物车",
                        isShownav:false
                    }
                },
                {
                    path:'personalname',
                    component:() => import ('../views/personalname.vue'),
                    meta:{
                        name:"personalname",
                        isShownav:false
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
        }
        
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
    next();
})
//全局后守卫
router.afterEach((to, from) => {
    NProgress.done()
    // 关闭网页加载进度条
})

export default router