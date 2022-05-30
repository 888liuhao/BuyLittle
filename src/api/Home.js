import reqest from './reqest.js'
import qs from 'qs'  //引入qs转换

export function foreachHome(){
    return reqest.get('/api/getlunbo')
}

export function foreachGoods(page=1,limit=14){
    return reqest.get(`/api/recommend?page=${page}&limit=${limit}`)
}

export function foreachsupermarket(page=1,pagesize=10){
    return reqest.get(`/api/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}

export function foreachgoodInfo(id){
    return reqest.get(`/api/getthumbimages/${id}`)
}

export function foreachgoodInfoo(id){
    return reqest.get(`/api/getgoodsinfo/${id}`)
}

//搜索商品
export function gitSearchValue(data){
    // let searchValue = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    let searchValue = qs.stringify(data)
    return reqest.get(`/api/search?${searchValue}`)
}
