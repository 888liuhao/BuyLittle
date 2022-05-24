<template lang="">
    <div>
        <!-- 头部 -->
        <van-nav-bar title="个人中心" @click-right="onClickRight">
            <template #right>
                <van-icon name="setting-o" size="26" />
            </template>
        </van-nav-bar>
        <!-- 设置按钮 -->
        <van-action-sheet v-model="show" cancel-text="取消" close-on-click-action :actions="actions" @select="onSelect" />
        <!-- 内容 -->
        <div class="box">
            <div class="box2">
                <van-image width="100"  height="100" radius="10px" :src="'http://api.w0824.com/'+ $store.state.userInfo.avatar" />
                <div class="box3">{{$store.state.userInfo.username}}</div>
            </div>

            <div>
                <div class="info">
                    <van-cell-group>
                        <van-cell title="我的订单" value="全部订单" @click="$router.push('/MyAddress')" is-link />
                        <van-cell title="收货地址" @click="$router.push('/MyOrder')" is-link />
                        <van-cell title="ViP买亿点会员" is-link />
                        <van-cell title="关于买亿点" value="v1.0.0" />
                        <van-button type="danger" block  @click="dropOut" >退出登录 </van-button>
                    </van-cell-group>
                </div>
            </div>
            <!-- 文件上传 -->
            <van-uploader :after-read="afterRead" ref="upimg" v-show="isShow" />
        </div>
    </div>
</template>
<script>
import {userAvatar} from '../api/personalname.js'
export default {
    name:'personalname',
    data(){
        return {
            show:false,
            isShow:false,
            actions: [{ name: '更换头像' }, { name: '选项二' }, { name: '选项三' }],
        }
    },
    methods:{
        //退出
        dropOut(){
        this.$dialog.confirm({
                title: '要离开了吗',
                message: '再逛会吧',
                })
                .then(() => {
                    this.$store.commit('clearInfo')
                    this.$router.push('/login')
                })
                .catch(() => {
                    // on cancel
                });
        },
        onClickRight(){
            this.show = !this.show
        },
        onSelect(item){
            if(item.name === '更换头像'){
                this.$refs.upimg.$refs.input.click()
            }
        },
        //头像
        async afterRead(file){
            let user_id = this.$store.state.userInfo.id
            const result =  await userAvatar({
                user_id,
                file:file.file
            })
            const { src,status } = result
            if(status === 0){
                this.$store.commit('uptoux',src)
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .box{
        margin-top: 30px;
        .box2{
            display: flex;
            align-items: center;
            flex-direction:column;

            .box3{
                margin: 20px 0;
                font-size: 24px;
            }
        }

    }
</style>