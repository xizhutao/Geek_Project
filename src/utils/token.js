/**
 * 此模块封装了token的获取、设置、清除、根据token判断是否登录
 */

const GEEK_TOKEN = 'geek_token'
/**
 * 获取token
 * @returns 
 */
export const getToken = () => {
    return localStorage.getItem(GEEK_TOKEN)
}
/**
 * 设置token
 * @param {string} token 
 * @returns 
 */
export const setToken = (token) => {
    return localStorage.setItem(GEEK_TOKEN, token)
}
/**
 * 清除token
 * @returns 
 */
export const clearToken = () => {
    return localStorage.removeItem(GEEK_TOKEN)
}
/**
 * 根据token值转成的字符串判断是否登录
 * @returns 
 */
export const isAut = () => {
    return !!getToken()
}