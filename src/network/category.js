import { request } from './request'



//获取全部分类列表
export function getCategory() {
    return request({
        url: '/api/admin/category?type=all',
    })
}
//获取非禁用分类列表
export function Category() {
    return request({
        url: '/api/admin/category',
    })
}

//是否启用分类
export function isStatus(id) {
    return request({
        url: '/api/admin/category/' + id + '/status',
        method: 'PATCH',
    })
}

//修改分类名称
export function editCategory(id, data) {
    return request({
        url: '/api/admin/category/' + id,
        method: 'PUT',
        data
    })
}

//创建分类
export function addCategory(data) {
    return request({
        url: '/api/admin/category',
        method: 'POST',
        data
    })
}