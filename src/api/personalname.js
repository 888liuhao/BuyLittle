import reqest from './reqest.js'

export function userAvatar(userInfo){
    return reqest({
        url:'/api/upload',
        method:'post',
        data:userInfo,
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
}

//获取用户地址
export function getAddress(user_id){
    return reqest.get(`/api/getaddress/${user_id}`)
}

//新增地址
export function addNewress(user_id,data){
    return reqest.post(`/api/addaddress/${user_id}`,data)
}

//删除地址
export function deleteAddress(address_id){
    return reqest.post(`/api/deladdress/${address_id}`)
}

//编辑地址
export function upAddress(address_id,data){
    return reqest.post(`/api/updateaddress/${address_id}`,data)
}