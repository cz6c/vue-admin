import { request } from './request'



//获取商品列表
export function getComments(params) {
    return request({
        url: '/api/admin/comments',
        params
    })
}


//回复评论
export function reply(id, data) {
    return request({
        url: '/api/admin/comments/' + id + '/reply',
        method: 'PATCH',
        data
    })
}