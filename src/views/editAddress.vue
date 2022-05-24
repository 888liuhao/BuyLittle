<template lang="">
    <div>
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        :address-info="newManuscript"
        @change-default="changDef" 
        @delete="deleteone"
        show-set-default
        @change-area="areaNew"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        />
    </div>
</template>
<script>
import { areaList } from '@vant/area-data';
import { deleteAddress, upAddress } from '../api/personalname.js'
export default {
    name: 'editAddress',
    data() {
        return {
            areaList,
            isDefault: '',    //记录原信息
            areaCode: '',       //记录原信息
            manuscript: JSON.parse(this.$route.params.addressInfo)
        }
    },
    created() {
        this.areaCode = this.manuscript.areaCode
    },
    computed: {
        //回显数据
        newManuscript() {
            let result = JSON.parse(this.$route.params.addressInfo)
            result.isDefault = result.isDefault === 0 ? false : true
            //split炸开对象里的值，取下标2
            result.areaCode = result.areaCode.split('-')[2]
            return result
        }
    },
    methods: {
        //点击保存
        async onSave(item) {
            //改造数据
            let isDefault = this.isDefault ? 1 : 0
            let areaCode = this.areaCode
            console.log(areaCode);
            let country = item.county
            //对象简写在这里要写在后面，因为改造后的数据需要覆盖之前的数据
            let data = { ...item, isDefault, areaCode, country }
            console.log(data);
            const {status,message} = await upAddress(item.id, data)
            if(status === 0){
                this.$toast(message)
                this.$router.back()
            }
        },
        //默认地址触发
        changDef(bool) {
            this.isDefault = bool
        },
        //修改地址触发
        areaNew(data) {
            this.areaCode = data.map(item => item.code).join('-')
        },
        //删除
        async deleteone(item) {
            let { id } = item
            const { status, message } = await deleteAddress(id)
            if (status === 0) {
                this.$toast(message)
                this.$router.back()
            }
        },

    }
}
</script>
<style lang="scss" scoped>
</style>