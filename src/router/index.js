import Vue from 'vue';
import VueRouter from 'vue-router';

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
                        isShownav:true
                    }
                },
                {
                    path:'personalname',
                    component:() => import ('../views/personalname.vue'),
                    meta:{
                        name:"personalname",
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
        }
        
    ]
})

export default router