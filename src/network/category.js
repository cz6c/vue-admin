import { request } from './request'



//获取分类列表
export function getCategory() {
    return request({
        url: '/api/admin/category',

    })
}