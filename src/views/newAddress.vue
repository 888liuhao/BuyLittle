<template lang="">
    <div>
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        @change-area="areaNew"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        />
    </div>
</template>
<script>
import { addNewress } from '../api/personalname.js'
import { areaList } from '@vant/area-data';
export default {
  data() {
    return {
      areaList,
      newarea:''
    };
  },
  methods: {
      //添加地址
    async onSave(save) {
        const user_id = this.$store.state.userInfo.id
        save.isDefault = save.isDefault ? 1 : 0
        save.areaCode = this.newarea
        save.country = save.county
        let data = {...save}
        const {message,status} =  await addNewress(user_id,data)
        if(status === 0){
            this.$toast(message)
            this.$router.back('/MyOrder')
        }
    },
    areaNew(val){
        this.newarea = val.map(item => item.code).join('-')
    }
  },
};
</script>
<style lang="">
    
</style>