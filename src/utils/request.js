/**
 * 此模块用于封装axios，以及请求拦截器、响应拦截器
 */
import axios from 'axios'
export const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})