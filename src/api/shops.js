import reqest from './reqest.js'

export function gettingGoodCat(ids=''){
    return reqest.get(`/api/getshopcarlist/${ids}`)
}