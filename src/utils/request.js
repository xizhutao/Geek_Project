/**
 * 此模块用于封装axios，以及请求拦截器、响应拦截器
 */
import axios from 'axios'
import store from '@/store'
import { message } from 'antd';
import { customHistory } from '@/utils/history'
import { logout } from '@/store/Actions'
export const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})
/**
 * 请求拦截器为需要权限的请求添加token数据
 */

request.interceptors.request.use(function (config) {
    // 在发送请求之前添加token
    const { userlogin: token } = store.getState()
    if (!config.url.startsWith('/authorizations')) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});
// 响应拦截器
request.interceptors.response.use(undefined, function (error) {
    // if (!error.response) {
    //     message.error('网络超时，请稍后再试')
    //     return Promise.reject(error)
    // }
    if (error.response.status === 401) {
        message.error('登录超时请重新登录', 1.5, () => {
            customHistory.replace('/login', {
                from: customHistory.location.pathname
            })
        })
        // 分发退出action清除token和用户信息值
        store.dispatch(logout())
    }
    // 返回一个错误的promise对象
    return Promise.reject(error)
})