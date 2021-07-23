//导入axios
import axios from 'axios'
//导入router,用做登录跳转
import router from '../router'

import { ElMessage } from 'element-plus';


//封装网络请求模块
export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    //axios拦截器

    //请求拦截
    instance.interceptors.request.use(config => {
        //某些网络请求（比如登录（token）），必须携带一些特殊信息
        //通过window.localStorage.getItem拿到登录后存在本地的token
        //以某种方式加到请求头上，每次请求的时候携带到服务器验证
        const token = window.localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = 'Bearer' + token
        }
        return config //处理完后要把拦截下来的config返回出去
    }, err => {
        //请求拦截失败
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        //一般在这里过滤，返回res.data,后面就直接拿到了data数据
        return res.data ? res.data : res

    }, err => {
        //有需要授权才可以访问的接口，统一跳转到login页面去登录授权
        if (err.response.status == 401) {
            router.push('/login')
                // Toast.fail('请先登录')
        }

        //拿到所有错误提示对象里的所有key的第一个key的第一个错误信息对用户进行轻提示
        // Toast.fail(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
    })

    //发送真正的网络请求，相当于返回出去了一个promise函数
    return instance(config)
}