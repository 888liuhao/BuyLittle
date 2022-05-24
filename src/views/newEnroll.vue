<template lang="">
    <div class="box">
        <div class="box1">
            <img :src="img" alt="">
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="注册"
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
                <van-button round block type="info" native-type="submit">注册</van-button>
            </div>
        </van-form>

        <div class="zhuce" @click="$router.back()">
            <span>已有账号，前去登录！</span>
            
        </div>
    </div>
</template>
<script>
import img from '../assets/imgs/logo.png'
import {addNewEnroll} from '../api/Login.js'
export default {
    name:'newEnroll',
    data(){
        return {
            img,
            username:'',
            password:'',
        }
    },
    methods:{
        async onSubmit(val){
           const {status,message} =  await addNewEnroll(val)
           if(status === 0){
               this.$toast(message)
               this.$router.back()
           }
        }
    } 
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