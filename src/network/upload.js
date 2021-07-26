import { request } from './request'



//获取oss token 
export function ossToken() {
    return request({
        url: '/api/auth/oss/token',
    })
}