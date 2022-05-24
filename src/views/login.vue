<template lang="">
    <div class="box">
        <div class="box1">
            <img :src="img" alt="">
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请输入用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请输入密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
        <div class="zhuce" @click="$router.push('/newEnroll')">
            <span>还没有账号？赶紧去注册一个吧</span>
            
        </div>
    </div>
</template>
<script>
import { postlogin } from '../api/Login.js'
import img from '../assets/imgs/logo.png'
export default {
    name:'login',
    data(){
        return {
            img,
            username:'',
            password:'',
        }
    },
    methods:{
        async onSubmit(valInfo) {
            const {status,token,userInfo,message} = await postlogin(valInfo)
            if(status === 0){
                this.$toast(message)
                this.$store.commit({
                    type:'userLogin',token,userInfo
                })
                //拿到请求路径上的参数
                let result = this.$route.query.redirect
                if(result){
                    //如果有参数则返回参数的页面，反之↓
                    this.$router.push(result)
                }else{
                    this.$router.push('/home/index')
                }

            }else{
                this.$toast(message)
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .box{
        margin-top: 20px;
        .box1{
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 100px;
            }
        }
        .zhuce{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 30px;
            color: #c9cacd;
        }
    }
</style>