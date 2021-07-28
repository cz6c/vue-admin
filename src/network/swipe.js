import { request } from './request'

//获取轮播列表
export function getSwipe() {
    return request({
        url: '/api/admin/slides'
    })
}
//新增轮播
export function addSwipe(data) {
    return request({
        url: '/api/admin/slides',
        method: 'POST',
        data
    })
}
//修改轮播
export function editSwipe(id, data) {
    return request({
        url: '/api/admin/slides/' + id,
        method: 'PUT',
        data
    })
}
//删除轮播
export function deleteSwipe(id) {
    return request({
        url: '/api/admin/slides/' + id,
        method: 'DELETE',
    })
}
//轮播排序
export function seqSwipe(id, data) {
    return request({
        url: '/api/admin/slides/' + id + '/seq',
        method: 'PATCH',
        data
    })
}
//轮播禁用和启用
export function isSwipe(id) {
    return request({
        url: '/api/admin/slides/' + id + '/status',
        method: 'PATCH'
    })
}