<template lang="">
    <div>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        />
        <van-empty v-if="list.length === 0" description="去添加个地址吧" />
    </div>
</template>
<script>
import { getAddress } from '../api/personalname.js'
export default {
  data() {
    return {
      chosenAddressId: '0',
      list: [
                // {
                //   id: '1',
                //   name: '张三',
                //   tel: '13000000000',
                //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                //   isDefault: true,
                // }, 
      ],
    };
  },
  created(){
    this._getAddress()
  },
  methods: {
    //获取地址
    async _getAddress(){
      let user_id = this.$store.state.userInfo.id
      const result = await getAddress(user_id)
      if(result.length === 0){
        return
      }

      if(result.length === 1){
        this.chosenAddressId = result[0].id
        let {province,city,country,addressDetail} = result[0]
        result[0].isDefault ? this.chosenAddressId = result[0].id : ''
        result[0].address = `${province}${city}${country}${addressDetail}`
        return  this.list = result
        
      }
      //改造数据
      result.map(item =>{
        let {province,city,country,addressDetail} = item
        item.isDefault ? this.chosenAddressId = item.id : ''
        return item.address = `${province}${city}${country}${addressDetail}`
      })
      this.list = result
    },
    //新增地址
    onAdd() {
        this.$router.push('/newAddress')
    },
    //编辑地址
    onEdit(item, index) {
        this.$router.push('/editAddress/'+ JSON.stringify(item))
    },

  },
};
</script>
<style lang="">
    
</style>