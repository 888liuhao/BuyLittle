import reqest from './reqest.js'

//提交商品订单
export function SubmitCar(orderData){
    return reqest.post('/api/commitorder',orderData)
}

//获取用户商品订单
export function getOrderInfo(user_id){
    return reqest.post(`/api/userorder/${user_id}`)
}

//获取用户订单信息
export function getOrder_id(order_id){
    return reqest.post(`/api/getorder/${order_id}`)
}

//模拟用户支付
export function moNiPayment(order_id){
    return reqest.post(`/api/payorder/${order_id}`)
}

//获取订单物流信息
export function logistics(){
    return reqest.get('/api/kuaidi100')
}