import { request } from './request'



//登录
export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}
//获取登录信息
export function getuser() {
    return request({
        url: '/api/admin/user',
    })
}

//登出
export function logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post',
    })
}

//获取用户列表
export function getUsers(params) {
    return request({
        url: '/api/admin/users',
        params
    })
}

//修改用户信息
export function editUsers(user, data) {
    return request({
        url: '/api/admin/users/' + user,
        method: 'put',
        data
    })
}

//禁用和启用
export function isLockUsers(user) {
    return request({
        url: '/api/admin/users/' + user + '/lock',
        method: 'PATCH',
    })
}

//添加用户 
export function addUsers(data) {
    return request({
        url: '/api/admin/users',
        method: 'POST',
        data
    })
}