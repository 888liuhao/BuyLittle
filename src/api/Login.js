import reqest from './reqest.js'

export function postlogin(valInfo){
    return reqest.post('/api/login',valInfo)
}

export function addNewEnroll(valInfo){
    return reqest.post('/api/register',valInfo)
}