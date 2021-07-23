import { request } from './request'



//登录
export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
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
export function getUserList() {
    return request({
        url: '/api/admin/users'
    })
}

//跳转分页
export function getUser(page) {
    return request({
        url: '/api/admin/users/?current=' + page
    })
}

//修改用户信息
export function upUser(users, data) {
    return request({
        url: '/api/admin/users/' + users,
        method: 'put',
        data
    })
}