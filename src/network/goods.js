import { request } from './request'



//获取商品列表
export function getGoods(params) {
    return request({
        url: '/api/admin/goods',
        //params必须是一个对象，key带的值会被拼接在?号后面，不带值的key不拼接，不会影响结果
        params
    })
}

//是否上架
export function GoodsIsOn(id) {
    return request({
        url: '/api/admin/goods/' + id + '/on',
        method: 'PATCH'
    })
}
//是否推荐
export function GoodsIsRecommend(id) {
    return request({
        url: '/api/admin/goods/' + id + '/recommend',
        method: 'PATCH'
    })
}

//修改商品
export function editGoods(id, data) {
    return request({
        url: '/api/admin/goods/' + id,
        method: 'put',
        data
    })
}

//添加商品
export function addGoods(data) {
    return request({
        url: '/api/admin/goods',
        method: 'post',
        data
    })
}

//商品详情
export function GoodsDetails(id, params) {
    return request({
        url: '/api/admin/goods/' + id,
        params
    })
}