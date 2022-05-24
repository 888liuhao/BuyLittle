import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

 const store = new Vuex.Store({
    strict:true,
    state:{
        goodPlenty:[],
        allselected:false,
        token:'',
        userInfo:{}
    },
    mutations:{
        //设置头像
        uptoux(state,src){
            state.userInfo.avatar = src
        },
        //设置用户信息和token
        userLogin(state,{token,userInfo}){
            state.token = token
            state.userInfo = userInfo
        },
        //用户退出的时候就清除用户信息和token
        clearInfo(state){
            state.token = ''
            state.userInfo = ''
            state.goodPlenty = []
        },
        //判断加入商品是否重复
        addGoodsCat(state,data){
            const index = state.goodPlenty.findIndex(item => item.id == data.id)
            if(index !== -1){
                state.goodPlenty[index].number += data.number
            }else{
                state.goodPlenty.push(data)
            }
        },
        //购物车内加减数量
        quantity(state,{val,id}){
           state.goodPlenty = state.goodPlenty.map(item => {
                if(item.id == id){
                    item.number = val
                }
                return item
            });
        },
        //删除
        delet(state,id){
            const index = state.goodPlenty.findIndex(item =>{
                if(item.id == id){
                    return true
                }
            })
            state.goodPlenty.splice(index,1)
        },
        //单选
        onchecke(state,{sls,index}){
            state.goodPlenty[index].selected = sls
        },
        //全选
        allselected(state,e){
            state.goodPlenty.forEach(item =>{
                item.selected = !e
            })
        }
    },
    getters:{
        //总件数
        totalNumber(state){
            let num = 0;
            state.goodPlenty.forEach(item =>{
                if(item.selected){
                    num += item.number
                }
            })
            return num
        },
        //总价格
        totalpirce(state){
            let pirces = 0
            state.goodPlenty.forEach(item =>{
                if(item.selected){
                    pirces += item.number * item.pirce
                }
            })
            return pirces * 100
        },
        //构造商品状态数据
        onchecke(state){
            let objMap = []
            state.goodPlenty.forEach(item =>{
                objMap[item.id] = item.selected
            })
            return objMap
        },
        allselected(state){
            let objMap = false
            if(state.goodPlenty.length > 0){
                objMap = state.goodPlenty.every(item =>{
                return item.selected === true
            })
            return objMap
            }
        },
        //构造商品数据id
        ids(state){
            let objMap = []
            state.goodPlenty.forEach((item,index) =>{
                objMap[index] =  item.id
            })
            return objMap
        },
    },

    plugins:[createPersistedState()]
})
export default store