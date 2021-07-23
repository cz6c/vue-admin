import { request } from './request'

//获取菜单列表
export function getMenus() {
    return request({
        url: '/api/admin/menus',
    })
}