import { request } from './request'

//获取订单列表
export function getOrder(params) {
    return request({
        url: '/api/admin/orders',
        params
    })
}

//订单发货
export function ship(id, data) {
    return request({
        url: '/api/admin/orders/' + id + '/post',
        method: 'PATCH',
        data
    })
}