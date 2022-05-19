import reqest from './reqest.js'

export function foreachHome(){
    return reqest.get('/api/getlunbo')
}

export function foreachGoods(page=1,limit=10){
    return reqest.get(`/api/recommend?page=${page}&limit=${limit}`)
}

export function foreachsupermarket(page=1,pagesize=10){
    return reqest.get(`/api/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}