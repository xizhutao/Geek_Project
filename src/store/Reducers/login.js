import { getToken } from '@/utils/token'
/**
 * 处理用户登录和退出的action
 * @param {string} preState 
 * @param {object} action 
 * @returns 
 */
const initState = getToken() || ''
const userlogin = (preState = initState, action) => {
    switch (action.type) {
        case 'login/setToken':
            return action.payload
        case 'user/logout':
            return ''
        default:
            return preState
    }
}
export default userlogin

