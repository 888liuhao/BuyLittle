import reqest from './reqest.js'

//提交商品订单
export function SubmitCar(orderData){
    return reqest.post('/api/commitorder',orderData)
}

//获取用户商品订单
export function getOrderInfo(user_id){
    return reqest.post(`/api/userorder/${user_id}`)
}