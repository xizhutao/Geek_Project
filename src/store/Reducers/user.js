/**
 * 获取、清除用户信息
 */
const initState = {}
const getUserInfo = (preState = initState, action) => {
    switch (action.type) {
        case 'geek/getUserInfo':
            return action.payload
        case 'user/clearInfo':
            return initState
        default:
            return preState
    }
}
export default getUserInfo