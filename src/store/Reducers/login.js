import { getToken } from '@/utils/token'
const initState = getToken() || ''
/**
 * 处理用户的action
 * @param {string} preState 
 * @param {object} action 
 * @returns 
 */
const userlogin = (preState = initState, action) => {
    switch (action.type) {
        case 'login/setToken':
            return action.payload
        default:
            return preState
    }
}
export default userlogin

